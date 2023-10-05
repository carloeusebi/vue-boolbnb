<script>
import { axiosInstance } from '../assets/axios';
import { loader } from '../stores/_loader';
import ApartmentServiceModal from '../components/ApartmentServiceModal.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AppMap from '../components/AppMap.vue';
import ApartmentMessageForm from '../components/ApartmentMessageForm.vue';


const baseUri = '/api/apartments/';
const endpoint = '';
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;



export default {
    name: 'ApartmentDetailPage',
    data() {
        return {
            apartment: {},
            map: null,
            modal: false,
            errors: {},
        }
    },
    components: { ApartmentServiceModal, FontAwesomeIcon, AppMap, ApartmentMessageForm },

    computed: {
        isLoadedApartment() {
            return Object.keys(this.apartment).length > 0;
        },
    },

    methods: {

        // apartment
        getApartment() {
            const endpoint = `api/apartments/${this.$route.params.slug}`;
            loader.setLoader();

            axiosInstance.get(endpoint)
                .then(res => {
                    this.apartment = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
                .then(() => {
                    loader.unsetLoader()
                })
        },
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
                <div class="col-12 col-md-7" v-if="apartment.thumbnail">

                    <!-- image -->
                    <figure>
                        <img :src="`http://localhost:8000/storage/${apartment.thumbnail}`" :alt="`${apartment.name}`"
                            class="rounded img-fluid">
                    </figure>
                </div>
                <div class="col-12 col-md-5">
                    <AppMap v-if="isLoadedApartment" :apartments="[apartment]" :zoom="10"
                        :coordinates="{ lat: apartment.lat, lng: apartment.lon }" />
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
                        <!-- <div class="d-flex align-items-baseline">
                            <p><font-awesome-icon :icon="['fas', 'wifi']" /> Wi-Fi</p>
                        </div> -->
                        <!-- piscina -->
                        <!-- <div class="d-flex align-items-baseline">
                            <p><font-awesome-icon :icon="['fas', 'person-swimming']" /> Piscina</p>
                        </div> -->
                    </div>
                    <ul class="list-unstyled d-flex flex-wrap my-3">
                        <li v-for="service in apartment.services" :key="service.id"
                            class="d-flex justify-content-start align-items-baseline me-3">
                            <FontAwesomeIcon :icon="['fas', service.icon]" />
                            <p class="ms-2">
                                {{ service.name }}
                            </p>
                        </li>
                    </ul>
                    <!-- button che mostra tutti i servizi -->
                    <!-- <button class="btn border rounded border-black service-button mt-3" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">
                            Mostra tutti i servizi
                        </button> -->
                    <!-- <ApartmentServiceModal :apartment="apartment" /> -->
                    <hr>
                </div>
                <div class="col-4 my-5">
                    <ApartmentMessageForm @form-message-submit="sendMessage" :apartment="apartment" :errors="errors" />
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
