<script>
import axios from 'axios';
import { axiosInstance } from '../assets/axios';
import { loader } from '../stores/_loader';
import ApartmentServiceModal from '../components/ApartmentServiceModal.vue';


const baseUri = 'http://127.0.0.1:8000/api/apartments/';
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;
const endpoint = '/api/apartments'



export default {
    name: 'ApartmentDetailPage',
    data() {
        return {
            apartment: {},
            map: null,
            modal: false
        }
    },
    components: { ApartmentServiceModal },

    computed: {
        isLoadedApartment() {
            return Object.keys(this.apartment).length > 0;
        }
    },

    methods: {

        // apartment
        getApartment() {
            const endpoint = baseUri + this.$route.params.slug;
            loader.setLoader();

            axios.get(endpoint)
                .then(res => {
                    this.apartment = res.data;
                    this.fetchMap();
                })
                .then(() => {
                    loader.unsetLoader()
                })
        },
        // map
        fetchMap() {

            const IMAGE_MAP_ENDPOINT = `http://api.tomtom.com/map/1/staticimage?key=${TOM_TOM_KEY}`;

            axios.get(`${IMAGE_MAP_ENDPOINT}&center=${this.apartment.lat},${this.apartment.lon}&zoom=9&width=800&height=500&format=jpg&layer=basic&style=main&language=it-IT`)
                .then(res => { this.map = res.data })
        },
        deleteApartment() {

            axiosInstance.delete(endpoint + '/' + this.apartment.id).then(res => {
                console.log('Appartamento eliminato');
                this.$router.push('/');
            })

        }
    },
    created() {
        this.getApartment();
    }
}
</script>

<template>
    <main v-if="isLoadedApartment">
        <header>
            <div class="container text-center mt-4">
                <h2>{{ apartment.name }}</h2>
                <small class="text-secondary">{{ apartment.address }}</small>
                <hr>
            </div>
        </header>
        <div class="container mt-4">
            <div class="row justify-content-between">
                <div class="col-12" v-if="apartment.thumbnail">

                    <!-- image -->
                    <figure>
                        <img :src="`http://localhost:8000/storage/${apartment.thumbnail}`" :alt="`${apartment.name}`"
                            class="rounded img-fluid">
                    </figure>
                </div>
                <div class="col-6">
                    <!-- apartment' info -->
                    <div class="my-5">
                        <h4 class="text-secondary text-uppercase">Informazioni su questo spazio</h4>
                        <p v-if="apartment.description">{{ apartment.description }}</p>
                        <p v-else> -- </p>
                    </div>
                    <hr>
                    <!-- features -->
                    <h4 class="text-secondary text-uppercase pt-3 pb-2">Cosa troverai</h4>
                    <!-- rooms -->
                    <div class="row row-cols-2">
                        <div class="d-flex align-items-baseline">
                            <span><font-awesome-icon :icon="['fas', 'door-closed']" /> Stanze</span>
                            <h6 class="ps-2 fw-bold" v-if="apartment.rooms">{{ apartment.rooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>
                        <!-- bathrooms -->
                        <div class="d-flex align-items-baseline">
                            <span><font-awesome-icon :icon="['fas', 'shower']" /> Bagni</span>
                            <h6 class="ps-2 fw-bold" v-if="apartment.bathrooms">{{ apartment.bathrooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>
                        <!-- bedrooms -->
                        <div class="d-flex align-items-baseline">
                            <span><font-awesome-icon :icon="['fas', 'bed']" /> Stanze da letto</span>
                            <h6 class="ps-2 fw-bold" v-if="apartment.bedrooms">{{ apartment.bedrooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>
                        <!-- square_meters -->
                        <div class="d-flex align-items-baseline">
                            <span><font-awesome-icon :icon="['fas', 'house']" /> Metri Quadri</span>
                            <h6 class="ps-2 fw-bold" v-if="apartment.square_meters">{{ apartment.square_meters }} m&sup2;
                            </h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>
                        <!-- wi-fi -->
                        <div class="d-flex align-items-baseline">
                            <p><font-awesome-icon :icon="['fas', 'wifi']" /> Wi-Fi</p>
                        </div>
                        <!-- piscina -->
                        <div class="d-flex align-items-baseline">
                            <p><font-awesome-icon :icon="['fas', 'person-swimming']" /> Piscina</p>
                        </div>
                        <!-- button che mostra tutti i servizi -->
                        <button class="btn border rounded border-black service-button mt-3" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Mostra
                            tutti i
                            servizi</button>
                        <ApartmentServiceModal :apartment="apartment" />
                    </div>
                    <hr>
                </div>
                <div class="col-4 my-5">
                    <div class="card border rounded border-secondary-subtle">
                        <div class="card-body d-flex align-items-center flex-column">
                            <h4 class="card-title align-self-start">Contatta il proprietario</h4>
                            <h6 class="card-subtitle mb-2 text-body-secondary py-2 align-self-start">
                                <span class="fw-semibold">{{ apartment.name }}</span>
                                - {{ apartment.address }}
                            </h6>
                            <form action="#" class="row px-3 g-2">
                                <textarea name="" id="" cols="40" rows="4" class="border rounded col"
                                    placeholder="Messaggio*"></textarea>
                                <input type="text" name="" id="" placeholder="Nome*" class="border rounded">
                                <input type="text" name="" id="" placeholder="Email*" class="border rounded">
                                <p class="text-end">*campi obbligatori</p>
                                <div>
                                    <button class="btn btn-primary"><font-awesome-icon :icon="['fas', 'envelope']" />
                                        Invia
                                        Email</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>




            </div>
            <!-- map -->
            <!-- #######################################
                    ########## AGGIUNGERE MAPPA ###########
                    ######################################-->

        </div>

    </main>
</template>
    <!-- <div id="map">
    <img :src="`${map}`" :alt="`${apartment.name}`">
</div> -->


<style scoped lang="scss">
.card {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
}

.service-button {
    width: 185px;
    padding: 12px;
    font-weight: 600;
}



textarea {
    resize: none;
}

form {
    p {
        font-size: 11px;
        color: gray;
    }
}
</style>
