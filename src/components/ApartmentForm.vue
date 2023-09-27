<script>
import axios from "axios";
import { RouterLink } from "vue-router";

const baseURL = import.meta.env.VITE_BACKEND_URL

const SEARCH_ENDPOINT = "https://api.tomtom.com/search/2/search";
const GEOCODE_ENDPOINT = "https://api.tomtom.com/search/2/geocode";
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;

const params = { key: TOM_TOM_KEY, language: "it-IT", countrySet: "IT" };

const emptyForm = {
	// TO CHANGE
	user_id: 1,
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
		errors: {},
	},
	data() {
		return {
			form: { ...this.apartment },
			addressTimeout: null,
			suggestedAddresses: [],
			fetchingCoordinates: false,
			thumbnail: null,
		};
	},
	computed: {
		isFetchingCoordinates() {
			return this.fetchingCoordinates;
		},

		isBackValid() {
			return window.history.state.back
		},
	},
	emits: ["form-submit"],
	methods: {
		goBack() {
			window.history.back()
		},

		loadPicture(event) {
			this.thumbnail = event.target.files[0];
		},
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
				if (!this.form.address)
					return;
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
			if (!this.form.address)
				return;
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
			const formData = new FormData();
			formData.append('thumbnail', this.thumbnail);

			for (let key in this.form) {
				formData.append(key, this.form[key])
			}

			this.$emit("form-submit", formData);
		},
	},
	components: { RouterLink }
};
</script>

<template>
	<div class="container mt-5">
		<form @submit.prevent="handleFormSubmit" class="row g-3">


			<!-- Name -->
			<div class="col-lg-6 col-sm-12">
				<label for="name" class="form-label">Titolo</label>
				<input type="text" :class="[{ 'is-invalid': errors.name && !form.name }, 'form-control']" id="name" name="name"
					v-model.trim="form.name">
				<div :class="[{ 'd-block': errors.name && !form.name }, 'invalid-feedback']">
					{{ errors.name }}
				</div>
			</div>

			<!-- Slug -->
			<!-- <div class="col-6">
				<label for="slug" class="form-label">Slug</label>
				<input type="text" class="form-control" id="slug" disabled :value="form.slug">
			</div> -->

			<!-- Address -->
			<div class="col-lg-6 col-sm-12">
				<label for="address" class="form-label">Indirizzo</label>
				<input @input="handleAddressInput" @focusout="getCoordinates" type="text" v-model.trim="form.address"
					list="addresses" :class="[{ 'is-invalid': errors.address && !form.address }, 'form-control']" id="address" />
				<div :class="[{ 'd-block': errors.address && !form.address }, 'invalid-feedback']">
					{{ errors.address }}
				</div>
				<datalist id="addresses">
					<option v-for=" address  in  suggestedAddresses " :key="address" :value="address"></option>
				</datalist>
			</div>

			<!-- Description -->
			<div class="col-12">
				<label for="description" class="form-label">Descrizione</label>
				<textarea :class="[{ 'is-invalid': errors.description && !form.description }, 'form-control']" id="description"
					name="description" rows="7" v-model.trim="form.description"></textarea>
				<div :class="[{ 'd-block': errors.description && !form.description }, 'invalid-feedback']">
					{{ errors.description }}
				</div>
			</div>

			<!-- Thumbnail -->
			<div class="col-12">
				<label for="thumbnail">Immagine</label>
				<input type="file" name="thumbnail" id="thumbnail" @input="loadPicture"
					:class="[{ 'is-invalid': errors.image && !form.image }, 'form-control']">
				<div :class="[{ 'd-block': errors.image && !form.image }, 'invalid-feedback']">
					{{ errors.image }}
				</div>
			</div>

			<!-- Bedrooms -->
			<div class="col-lg-3 col-sm-6">
				<label for="bedrooms" class="form-label">Stanze da letto</label>
				<input type="number" name="bedrooms" id="bedrooms"
					:class="[{ 'is-invalid': errors.bedrooms && !form.bedrooms }, 'form-control']" v-model.trim="form.bedrooms">
				<div :class="[{ 'd-block': errors.bedrooms && !form.bedrooms }, 'invalid-feedback']">
					{{ errors.bedrooms }}
				</div>
			</div>

			<!-- Rooms -->
			<div class="col-lg-3 col-sm-6">
				<label for="rooms" class="form-label">Stanze</label>
				<input type="number" name="rooms" id="rooms"
					:class="[{ 'is-invalid': errors.rooms && !form.rooms }, 'form-control']" v-model.trim="form.rooms">
				<div :class="[{ 'd-block': errors.rooms && !form.rooms }, 'invalid-feedback']">
					{{ errors.rooms }}
				</div>
			</div>

			<!-- Bathrooms -->
			<div class="col-lg-3 col-sm-6">
				<label for="bathrooms" class="form-label">Bagni</label>
				<input type="number" name="bathrooms" id="bathrooms"
					:class="[{ 'is-invalid': errors.bathrooms && !form.bathrooms }, 'form-control']" v-model.trim="form.bathrooms">
				<div :class="[{ 'd-block': errors.bathrooms && !form.bathrooms }, 'invalid-feedback']">
					{{ errors.bathrooms }}
				</div>
			</div>

			<!-- Square_meters -->
			<div class="col-lg-3 col-sm-6">
				<label for="square_meters" class="form-label">Metri quadrati</label>
				<input type="number" name="square_meters" id="square_meters"
					:class="[{ 'is-invalid': errors.square_meters && !form.square_meters }, 'form-control']"
					v-model.trim="form.square_meters">
				<div :class="[{ 'd-block': errors.square_meters && !form.square_meters }, 'invalid-feedback']">
					{{ errors.square_meters }}
				</div>
			</div>

			<!-- Visible -->
			<div class="col-12">
				<div class="form-check form-switch">
					<label v-if="!form.visible" class="form-check-label" for="visible">Rendi visibile</label>
					<label v-else class="form-check-label" for="visible">Rendi invisibile</label>
					<input class="form-check-input" type="checkbox" id="visible" name="visible" v-model.trim="form.visible">
				</div>
			</div>
			<div v-if="!apartment.slug" class="col-12 mt-4 text-sm-center text-md-start">
				<button type="submit" class="btn btn-primary">Crea appartamento</button>
				<button v-if="isBackValid" type="button" class="btn btn-secondary mx-2" @click="goBack()">Torna
					indietro</button>
				<RouterLink v-else :to="{ name: 'home' }" class="btn btn-secondary mx-2">Torna indietro</RouterLink>
			</div>
			<div v-else class="col-12 mt-4 text-sm-center text-md-start">
				<button type="submit" class="btn btn-warning">Modifica appartamento</button>
				<button v-if="isBackValid" type="button" class="btn btn-secondary mx-2" @click="goBack()">Torna
					indietro</button>
				<RouterLink v-else :to="{ name: 'home' }" class="btn btn-secondary mx-2">Torna indietro</RouterLink>
			</div>
		</form>
	</div>
</template>

<style></style>
