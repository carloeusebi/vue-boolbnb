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

		});

	}
};
</script>

<template>
	<div class="container mx-auto p-0 pb-5">

		<h1 class="text-center fw-bold mt-4">temporary page</h1>
		<hr>
		<div class="d-flex justify-content-center align-items-center">
			<RouterLink :to="{ name: 'apartments.create' }">Create Apartment</RouterLink>
		</div>
		<hr>


		<!-- CARDS: -->
		<div class="container bg-light rounded-1 pb-5 p-0 m-0">

			<h2 class="text-center text-secondary  pt-3 pb-3">Apartments:</h2>

			<div class="cards_deck row justify-content-center gap-5 m-0 p-0">
				<div class="card_container" v-for="apartment in notSponsorApartments" :key="apartment.id">
					<div class="col-12 col-md-10 col-lg-8">
						<div style="width: max-content;" class="card">
							<img :src="`http://localhost:8000/storage/${apartment.thumbnail}`" class="image-fluid"
								:alt="apartment.name">
							<div class="card-body">
								<h5 class="card-title">{{ apartment.name }}</h5>
								<div class="d-flex justify-content-between align-items-center">
									<RouterLink :to="{ name: 'apartment-detail', params: { slug: apartment.slug } }">
										View...</RouterLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>


	</div>
</template>

<style scoped>
.cards_deck {
	max-width: 1200px;
}

.cards_deck .card_container {
	width: fit-content;
	max-width: 300px;
}

.cards_deck img {
	border-radius: 5px;
}
</style>
