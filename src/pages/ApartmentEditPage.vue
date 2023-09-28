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
    methods: {
        createApartment(apartment) {
            console.log(apartment);
            const headers = { headers: { 'Content-Type': 'multipart/form-data' } };

            axiosInstance.put(`api/apartments/${this.$route.params.slug}`, apartment, headers)
                .then(res => {
                    console.log('Chiamata andata a buon fine')
                })
                .catch(err => {
                    const { errors } = err.response.data
                    const errorMessage = {}
                    for (let field in errors) errorMessage[field] = errors[field][0];
                    this.errors = errorMessage
                })
                .then(() => {
                    console.log('Chiamata effettuata')
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
    <ApartmentForm @form-submit="createApartment" :errors=errors :apartment=apartment />
</template>

<style scoped></style>
