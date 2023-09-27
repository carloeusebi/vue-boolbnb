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
			axiosInstance.post(endpoint, apartment)
				.then(res => {
					console.log('Perfetto')
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
};
</script>

<template>
	<ApartmentForm @form-submit="createApartment" :errors=errors />
</template>

<style scoped></style>
