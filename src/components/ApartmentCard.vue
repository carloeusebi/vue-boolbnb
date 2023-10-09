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
            return this.apartment.distance || this.apartment.distance === 0 ? 'Distanza: ' + this.apartment.distance.toFixed(2) + 'km' : '';
        }
    }
}

</script>

<template>
    <div class="col-12 col-md-10 col-lg-8">

        <RouterLink :to="{ name: 'apartment-detail', params: { slug: apartment.slug } }">

            <div class="card">
                <img :src="scrUrl" class="img-fluid" :alt="apartment.name">
            </div>
        </RouterLink>

        <div class="card_bio">
            <div v-if="apartment.sponsored" class="sponsorship">In Evidenza</div>
            <h3 class="card-title">{{ apartment.name }}</h3>
            <p>{{ apartment.address }}</p>
            <div>{{ distance }}</div>
        </div>


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

<style scoped lang="scss">
@use '@/assets/Scss/vars' as *;

.card {
    box-shadow: 0px 0px 25px 5px #bbbbbb;
    min-width: 380px;
    max-height: 285px;
    cursor: pointer;
}

.card img {
    height: 285px;
    border-radius: 5px;
}

.card_bio {
    margin-top: 1.5rem;
}

.card_bio h3 {
    font-weight: 700;
    font-size: 20px;
}

.card_bio p {
    font-weight: 500;
    font-size: 15px;

}

.card img:hover {
    box-shadow: 0px 0px 25px 5px #939393;
    transition: box-shadow 0.5s;
}

.card img:active {
    box-shadow: 0px 0px 25px 5px #5e5e5e;
}

.sponsorship {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 20px;
    font-weight: bold;
    background-color: $second-bg-color;
    color: $main-color;
}
</style>