<script>
import axios from 'axios';
import { axiosInstance } from '../assets/axios';
import ApartmentForm from '../components/ApartmentForm.vue';
const endpoint = '/api/apartments'

export default {
	name: 'CreateApartmentPage',
	data() {
		return {
			errors: {}
		}
	},
	components: { ApartmentForm },
	methods: {
		createApartment(apartment) {
			const headers = { headers: { 'Content-Type': 'multipart/form-data' } };

			axiosInstance.post(endpoint, apartment, headers)
				.then(res => { })
				.catch(err => {
					const { errors } = err.response.data
					const errorMessage = {}
					for (let field in errors) errorMessage[field] = errors[field][0];
					this.errors = errorMessage
				})
				.then(() => { });
		},
	},
};
</script>

<template>
	<ApartmentForm @form-submit="createApartment" :errors=errors />
</template>

<style scoped></style>
