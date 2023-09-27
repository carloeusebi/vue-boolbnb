<script>
import axios from 'axios';
const baseUri = 'http://127.0.0.1:8000/api/apartments/';
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;



export default {
    name: 'ApartmentDetailPage',
    data() {
        return {
            apartment: null,
            map: null
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

<style></style>