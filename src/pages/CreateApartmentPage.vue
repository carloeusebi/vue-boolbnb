<script>
import ApartmentForm from '../components/ApartmentForm.vue';

export default {
	name: 'CreateApartmentPage',
	components: { ApartmentForm },
	methods: {
		createApartment(apartment) {
			console.log(apartment);
		},
	},
};
</script>

<template>
	<ApartmentForm @form-submit="createApartment" />
</template>

<style scoped></style>
