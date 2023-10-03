<script>
import { loader } from '../stores/_loader';
import { axiosInstance } from '../assets/axios'
import ApartmentCard from '../components/ApartmentCard.vue';
import AppMap from '../components/AppMap.vue'

const apartmentEndpoint = '/api/apartments/';

export default {
	name: 'HomePage',

	data() {
		return {
			nonSponsoredApartments: [],
			apartments: [],
		};
	},
	components: { ApartmentCard, AppMap },

	created() {
		loader.setLoader();
		axiosInstance.get(apartmentEndpoint)
			.then(res => {
				const apartments = res.data;
				this.apartments = apartments;
				this.nonSponsoredApartments = apartments.filter(apartment => !apartment.sponsored);
			})
			.then(() => {
				loader.unsetLoader();
			})

	}
};
</script>

<template>
	<div class="container mx-auto p-0 pb-5">

		<h1 class="text-center fw-bold mt-4">temporary page</h1>
		<hr>

		<h2 class="text-center text-secondary  pt-3 pb-3">Apartments:</h2>

		<!-- CARDS: -->

		<AppMap v-if="apartments.length > 0" :apartments="apartments" />

		<div class="d-flex justify-content-center rounded-1 pt-4 pb-5 p-0 m-0">

			<div class="cards_deck row justify-content-center gap-5 m-0 p-0">
				<div class="card_container p-0" v-for="apartment in nonSponsoredApartments" :key="apartment.id">

					<ApartmentCard :apartment="apartment" />
				</div>
			</div>

		</div>
	</div>
</template>

<style scoped>
.cards_deck {
	max-width: 1005px;
}

.cards_deck .card_container {
	max-width: 300px;
}

.cards_deck .card_container .card {
	box-shadow: 0px 0px 25px 5px #bbbbbb;
}

.cards_deck img {
	border-radius: 5px;
}

.card img {
	object-fit: fill;
	height: 200px;
}
</style>
