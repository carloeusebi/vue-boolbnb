<script>
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments/';

export default {
	name: 'HomePage',

	data() {
		return {
			notSponsorApartments: [

			],
		};
	},
	created() {
		axios.get(endpoint).then(res => {

			const apartments = res.data;

			this.notSponsorApartments = apartments.filter(apartment => !apartment.sponsored);

			console.log(this.notSponsorApartments);

		});
	}
};
</script>

<template>
	temporary page
	<div>
		<RouterLink :to="{ name: 'apartments.create' }">Create Apartment</RouterLink>
	</div>
</template>
