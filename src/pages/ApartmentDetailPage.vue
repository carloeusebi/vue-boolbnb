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
            <div class="row">
                <div class="col">

                    <!-- image -->
                    <figure>
                        <img :src="`http://localhost:8000/storage/${apartment.thumbnail}`" :alt="`${apartment.name}`"
                            class="rounded">
                    </figure>
                </div>
                <div class="col">

                    <!-- apartment' info -->
                    <div>
                        <h4 class="text-secondary text-uppercase">Descrizione appartamento :</h4>
                        <p>{{ apartment.description }}</p>

                        <!-- features -->
                        <h4 class="text-secondary text-uppercase pt-3 pb-2">Caratteristiche:</h4>
                        <!-- rooms -->
                        <div class="d-flex align-items-baseline">
                            <span>Stanze : </span>
                            <h6 class="ps-4">{{ apartment.rooms }}</h6>
                        </div>
                        <!-- bathrooms -->
                        <div class="d-flex align-items-baseline">
                            <span>Bagni : </span>
                            <h6 class="ps-4">{{ apartment.bathrooms }}</h6>
                        </div>
                        <!-- bedrooms -->
                        <div class="d-flex align-items-baseline">
                            <span>Stanze da letto : </span>
                            <h6 class="ps-4">{{ apartment.bedrooms }}</h6>
                        </div>
                        <!-- square_meters -->
                        <div class="d-flex align-items-baseline">
                            <span>Metri Quadri : </span>
                            <h6 class="ps-4">{{ apartment.square_meters }} m&sup2;</h6>
                        </div>

                    </div>

                </div>
                <!-- map -->
                <div id="map">
                    mappa

                    <img :src="`${map}`" :alt="`${apartment.name}`">
                </div>
            </div>
        </div>
    </main>
</template>

<style></style>