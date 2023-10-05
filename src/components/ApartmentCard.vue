<script>
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default {
    name: 'ApartmentCard',
    props: { apartment: Object },
    computed: {
        scrUrl() {
            return this.apartment.thumbnail ? `${backendUrl}/storage/${this.apartment.thumbnail}` : 'placeholder.png';
        },
        distance() {
            return this.apartment.distance ? 'Distanza: ' + this.apartment.distance.toFixed(2) + 'km' : '';
        }
    }
}

</script>

<template>
    <div class="col-12 col-md-10 col-lg-8">

        <RouterLink :to="{ name: 'apartment-detail', params: { slug: apartment.slug } }">

            <div class="card">
                <img :src="scrUrl" class="img-fluid" :alt="apartment.name">
                <div class="img_cover text-white">
                    <h2 class="card-title">{{ apartment.name }}</h2>
                    <h5>{{ apartment.address }}</h5>
                    <div class="text-light">{{ distance }}</div>
                </div>
            </div>

        </RouterLink>

    </div>



    <!--
    <div class="col-12 col-md-10 col-lg-8">
        <div style="width: 300px;" class="card">
            <img :src="scrUrl" class="img-fluid" :alt="apartment.name">
            <div class="card-body">

                <h5 class="card-title">{{ apartment.name }}</h5>
                <div>{{ apartment.address }}</div>
                <div class="text-secondary">{{ distance }}</div>

                <div class="d-flex justify-content-between align-items-center">
                    <RouterLink :to="{ name: 'apartment-detail', params: { slug: apartment.slug } }">
                        View...</RouterLink>
                </div>
            </div>
        </div>
    </div>
-->
</template>

<style scoped></style>