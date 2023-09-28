<script>
import axios from 'axios';
import { axiosInstance } from '../assets/axios';
import ApartmentForm from '../components/ApartmentForm.vue';
export default {
    name: 'CreateApartmentPage',
    data() {
        return {
            errors: {},
            apartment: {}
        }
    },
    components: { ApartmentForm },
    computed: {
        isLoadedApartment() {
            return Object.keys(this.apartment).length !== 0
        }
    },
    methods: {
        updateApartment(apartment) {
            const headers = { headers: { 'Content-Type': 'multipart/form-data' } };

            apartment.append('_method', 'PUT');

            axiosInstance.post(`/api/apartments/${this.apartment.id}`, apartment, headers)
                .then(res => {
                    const { slug } = res.data;
                    this.$router.push({ name: 'apartment-detail', params: { slug } })
                })
                .catch(err => {
                    const { errors } = err.response.data
                    const errorMessage = {}
                    for (let field in errors) errorMessage[field] = errors[field][0];
                    this.errors = errorMessage
                })
                .then(() => {
                });
        },
    },
    created() {
        axiosInstance.get(`api/apartments/${this.$route.params.slug}`)
            .then(res => this.apartment = res.data)
            .catch(err => { })
            .then(() => { })
    }
};
</script>

<template>
    <ApartmentForm @form-submit="updateApartment" v-model:errors=errors :apartment=apartment v-if="isLoadedApartment" />
</template>

<style scoped></style>
