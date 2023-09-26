<script>
import axios from "axios";

const SEARCH_ENDPOINT = "https://api.tomtom.com/search/2/search";
const GEOCODE_ENDPOINT = "https://api.tomtom.com/search/2/geocode";
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;

const params = { key: TOM_TOM_KEY, language: "it-IT", countrySet: "IT" };

const emptyForm = {
	name: "",
	slug: "",
	description: "",
	thumbnail: "",
	address: "",
	lat: "",
	lon: "",
	rooms: "",
	bedrooms: "",
	bathrooms: "",
	square_meters: "",
	visible: false,
};

export default {
	name: "ApartmentForm",
	props: {
		apartment: {
			type: Object,
			default() {
				return emptyForm;
			},
		},
	},
	data() {
		return {
			form: { ...this.apartment },
			addressTimeout: null,
			suggestedAddresses: [],
			fetchingCoordinates: false,
		};
	},

	computed: {
		isFetchingCoordinates() {
			return this.fetchingCoordinates;
		},
	},

	emits: ["form-submit"],

	methods: {
		/**
		 * After every keypress, if half a second after last keypress has passed, search for similar addresses and provide autocompletion.
		 */
		handleAddressInput() {
			const timeoutDuration = 500;

			// deletes previous timeout
			clearTimeout(this.addressTimeout);

			// sets a new timeout
			this.addressTimeout = setTimeout(() => {
				// if address is empty, skip
				if (!this.form.address) return;

				axios
					.get(`${SEARCH_ENDPOINT}/${this.form.address}.json`, { params })
					.then((res) => {
						this.suggestedAddresses = [];
						const addresses = res.data.results;

						addresses.forEach((address) => {
							this.suggestedAddresses.push(address.address.freeformAddress);
						});
					});
			}, timeoutDuration);
		},

		/**
		 * Get Coordinates using TomTom's api.
		 */
		getCoordinates() {
			this.fetchingCoordinates = true;

			// if address is empty, skip
			if (!this.form.address) return;

			axios
				.get(`${GEOCODE_ENDPOINT}/${this.form.address}.json`, { params })
				.then((res) => {
					if (res.data.results.length === 0) {
						//TODO Implement proper error handling
						console.error("INDIRIZZO NON VALIDO");
						return;
					}
					const { position } = res.data.results[0];
					this.form.lat = position.lat;
					this.form.lon = position.lon;
				})
				.then(() => {
					this.fetchingCoordinates = false;
				});
		},

		/**
		 * Handles the form submission
		 */
		handleFormSubmit() {
			// 	//todo checks if there are not errors
			this.$emit("form-submit", this.form);
		},
	},
};
</script>

<template>
	<div class="container mt-5">
		<form @submit.prevent="handleFormSubmit" class="row g-3">
			<div class="col-6">
				<label for="name" class="form-label">Titolo</label>
				<input type="text" class="form-control" id="name" name="name" v-model="form.name">
			</div>
			<div class="col-6">
				<label for="slug" class="form-label">Slug</label>
				<input type="text" class="form-control" id="slug" disabled>
			</div>
			<div class="col-12">
				<label for="address" class="form-label">Indirizzo</label>
				<input @input="handleAddressInput" @focusout="getCoordinates" type="text" v-model.trim="form.address"
					list="addresses" class="form-control" id="address" />
				<datalist id="addresses">
					<option v-for="address in suggestedAddresses" :key="address" :value="address"></option>
				</datalist>
			</div>
			<div class="col-12">
				<label for="description" class="form-label">Descrizione</label>
				<textarea class="form-control" id="description" name="description" rows="7" v-model="form.description"></textarea>
			</div>
			<div class="col-3">
				<label for="bedrooms" class="form-label">Stanze da letto</label>
				<input type="number" name="bedrooms" id="bedrooms" class="form-control" v-model="form.bedrooms">
			</div>
			<div class="col-3">
				<label for="rooms" class="form-label">Stanze</label>
				<input type="number" name="rooms" id="rooms" class="form-control" v-model="form.rooms">
			</div>
			<div class="col-3">
				<label for="bathrooms" class="form-label">Bagni</label>
				<input type="number" name="bathrooms" id="bathrooms" class="form-control" v-model="form.bathrooms">
			</div>
			<div class="col-3">
				<label for="square_meters" class="form-label">Metri quadrati</label>
				<input type="number" name="square_meters" id="square_meters" class="form-control" v-model="form.squrare_meters">
			</div>
			<div class="col-12">
				<div class="form-check form-switch">
					<label class="form-check-label" for="visible">Rendi visibile</label>
					<input class="form-check-input" type="checkbox" id="visible" name="visible" v-model="form.visible">
				</div>
			</div>
			<div class="col-12">
				<button type="submit" class="btn btn-primary">Crea appartamento</button>
			</div>
		</form>
	</div>
</template>

<style></style>
