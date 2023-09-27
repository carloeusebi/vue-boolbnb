<script>
import axios from 'axios';
import { axiosInstance } from '../assets/axios';
const baseUri = 'http://127.0.0.1:8000/api/apartments/';
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;
const endpoint = '/api/apartments'



export default {
    name: 'ApartmentDetailPage',
    data() {
        return {
            apartment: null,
            map: null,
            modal: false
        }
    },
    methods: {
        // apartment
        getApartment() {
            const endpoint = baseUri + this.$route.params.slug;

            axios.get(endpoint)
                .then(res => {
                    this.apartment = res.data;
                    this.fetchMap();
                })
        },
        // map
        fetchMap() {

            const IMAGE_MAP_ENDPOINT = `http://api.tomtom.com/map/1/staticimage?key=${TOM_TOM_KEY}`;

            axios.get(`${IMAGE_MAP_ENDPOINT}&center=${this.apartment.lat},${this.apartment.lon}&zoom=9&width=800&height=500&format=jpg&layer=basic&style=main&language=it-IT`)
                .then(res => { this.map = res.data })
        },
        toggleModal() {
            this.modal = !this.modal;
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
    <main>
        <header>
            <div class="container text-center mt-4">
                <h2>{{ apartment.name }}</h2>
                <small class="text-secondary">{{ apartment.address }}</small>
                <hr>
            </div>
        </header>
        <div class="container mt-4">
            <!-- buttons -->
            <div class="d-flex justify-content-end align-items-center mb-4">
                <!-- edit -->
                <RouterLink :to="{ name: 'apartments.edit', params: { slug: apartment.slug } }"
                    class="btn btn-secondary mx-4">
                    Modifica</RouterLink>

                <!-- delete -->

                <!-- modal -->
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row row-cols-sm-1 row-cols-md-2">
                <div class="col" v-if="apartment.thumbnail">

                    <!-- image -->
                    <figure>
                        <img :src="`http://localhost:8000/storage/${apartment.thumbnail}`" :alt="`${apartment.name}`"
                            class="rounded img-fluid">
                    </figure>
                </div>
                <div class="col">

                    <!-- apartment' info -->
                    <div>
                        <h4 class="text-secondary text-uppercase">Descrizione appartamento :</h4>
                        <p v-if="apartment.description">{{ apartment.description }}</p>
                        <p v-else> -- </p>

                        <!-- features -->
                        <h4 class="text-secondary text-uppercase pt-3 pb-2">Caratteristiche:</h4>
                        <!-- rooms -->
                        <div class="d-flex align-items-baseline">
                            <span>Stanze : </span>
                            <h6 class="ps-4" v-if="apartment.rooms">{{ apartment.rooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>
                        <!-- bathrooms -->
                        <div class="d-flex align-items-baseline">
                            <span>Bagni : </span>
                            <h6 class="ps-4" v-if="apartment.bathrooms">{{ apartment.bathrooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>
                        <!-- bedrooms -->
                        <div class="d-flex align-items-baseline">
                            <span>Stanze da letto : </span>
                            <h6 class="ps-4" v-if="apartment.bedrooms">{{ apartment.bedrooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>
                        <!-- square_meters -->
                        <div class="d-flex align-items-baseline">
                            <span>Metri Quadri : </span>
                            <h6 class="ps-4" v-if="apartment.square_meters">{{ apartment.square_meters }} m&sup2;</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>

                    </div>

                </div>
                <!-- map -->
                <div id="map">
                    <!-- #######################################
                         ########## AGGIUNGERE MAPPA ###########
                         ######################################-->

                    <img :src="`${map}`" :alt="`${apartment.name}`">
                </div>
            </div>
        </div>
    </main>
</template>

<style use="scss" scoped>
#modal {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>