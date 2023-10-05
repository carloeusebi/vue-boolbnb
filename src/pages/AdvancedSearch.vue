<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { axiosInstance } from '../assets/axios';
import ApartmentCard from '../components/ApartmentCard.vue';
import AppMap from '../components/AppMap.vue';

const SEARCH_ENDPOINT = "https://api.tomtom.com/search/2/search";
const GEOCODE_ENDPOINT = "https://api.tomtom.com/search/2/geocode";
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;

const params = { key: TOM_TOM_KEY, language: "it-IT", countrySet: "IT", limit: 15 };


export default {
    name: 'AdvancedSearch',
    components: { ApartmentCard, AppMap, FontAwesomeIcon },
    data() {
        return {
            form: {
                address: '',
                distance: 20,
                selectedServices: [],
                lat: '',
                lon: '',
                rooms: 1,
                bedrooms: 1
            },
            services: [],
            apartments: [],
            addressTimeout: null,
            suggestedAddresses: [],
            errors: {}
        }
    },
    methods: {
        /**
         * After every keypress, if half a second after last keypress has passed, search for similar addresses and provide autocompletion.
         */
        handleAddressInput() {
            const timeoutDuration = 500;
            // deletes previous timeout
            clearTimeout(this.addressTimeout);
            // sets a new timeout
            this.addressTimeout = setTimeout(() => {
                // if address is empty, skip
                if (!this.form.address)
                    return;
                axiosInstance
                    .get(`${SEARCH_ENDPOINT}/${this.form.address}.json`, { params })
                    .then((res) => {
                        this.suggestedAddresses = [];
                        const addresses = res.data.results;
                        addresses.forEach((address) => {
                            this.suggestedAddresses.push(address.address.freeformAddress);
                        });
                    });
            }, timeoutDuration);
        },

        /**
 * Get Coordinates using TomTom's api.
 */
        async getCoordinates() {
            // reset lat and lon
            this.form.lat = this.form.lon = '';

            // if address is empty, skip			
            if (!this.form.address)
                return;

            try {
                this.fetchingCoordinates = true;
                const res = await axiosInstance.get(`${GEOCODE_ENDPOINT}/${this.form.address}.json`, { params });
                // reset address errors
                this.errors.address = ''
                this.$emit('update:errors', { ...this.errors })

                // if there are no results for the given address add an address error
                if (res.data.results.length === 0) {
                    this.$emit('update:errors', { ...this.errors, address: 'Indirizzo non valido.' });
                    return;
                }

                // update lat and lon
                const { position } = res.data.results[0];
                this.form.lat = position.lat;
                this.form.lon = position.lon;
            } catch (err) {
                console.error(err);
            } finally {
                this.fetchingCoordinates = false;
                return
            }
        },

        async handleFormSubmission() {
            await this.getCoordinates();
            this.fetchApartments();
        },

        fetchApartments() {
            const params = { ...this.form }
            this.apartments = []
            axiosInstance.get('api/apartments', { params }).then(res => { this.apartments = [...res.data] });
        }
    },
    mounted() {
        axiosInstance.get('api/services').then(res => { this.services = res.data })
    }
}
</script>

<template>
    <div class="container my-5">
        <div class="row">
            <!-- FORM -->
            <form @submit.prevent="handleFormSubmission" class="col-12 col-md-8">
                <div class="mb-3 row">
                    <div class="col-12 col-md-9">
                        <label for="address">Località</label>
                        <input @keyup="handleAddressInput" id="address" class="form-control" v-model="form.address"
                            list="addresses" />
                        <datalist id="addresses">
                            <option v-for="address in suggestedAddresses">{{ address }}</option>
                        </datalist>
                    </div>
                    <div class="col-12 col-md-3">
                        <label for="distance">Distanza massima in km</label>
                        <input type="number" id="distance" class="form-control" v-model="form.distance" />
                    </div>
                </div>
                <!-- ROOMS AND BEDROOMS -->
                <div class="d-flex mb-3 gap-3">
                    <div>
                        <label for="rooms">Stanze</label>
                        <input id="rooms" class="form-control" v-model="form.rooms" />
                    </div>
                    <div>
                        <label for="bedrooms">Camere da letto</label>
                        <input id="bedrooms" class="form-control" v-model="form.bedrooms" />
                    </div>
                </div>
                <!-- SERVICES -->
                <div>
                    <ul v-if="services.length > 0" class="list-unstyled d-flex">
                        <li v-for="service, i in services" :key="service.id" class="me-3">
                            <label :for="`service-${service.id}`">
                                <FontAwesomeIcon :icon="['fas', service.icon]" />
                                {{ service.name }}
                            </label>
                            <input :id="`service-${service.id}`" type="checkbox" class="ms-2" :value="service.id"
                                v-model="form.selectedServices" />
                        </li>
                    </ul>

                </div>
                <div>
                    <button class="btn btn-primary">Cerca</button>
                </div>
            </form>

            <div class="col-12 col-md-4">
                <AppMap :apartments="apartments" :coordinates="{ lat: form.lat, lon: form.lon }" :radius="form.distance" />
            </div>

        </div>

        <hr class="my-5">

        <!-- LIST -->
        <div v-if="apartments.length > 0" class="d-flex justify-content-center rounded-1 pt-4 pb-5 p-0 m-0">

            <div class="cards_deck row justify-content-center gap-5 m-0 p-0">
                <div class="card_container p-0" v-for="apartment in apartments" :key="apartment.id">

                    <ApartmentCard :apartment="apartment" />
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.cards_deck {
    max-width: 1005px;
}

.cards_deck .card_container {
    max-width: 300px;
}

.cards_deck .card_container .card {
    box-shadow: 0px 0px 25px 5px #bbbbbb;
}

.cards_deck img {
    border-radius: 5px;
}

.card img {
    object-fit: fill;
    height: 200px;
}
</style>
