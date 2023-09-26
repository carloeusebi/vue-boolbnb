<script>
import axios from 'axios';

const SEARCH_ENDPOINT = 'https://api.tomtom.com/search/2/search';
const GEOCODE_ENDPOINT = 'https://api.tomtom.com/search/2/geocode';
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;

const params = { key: TOM_TOM_KEY, language: 'it-IT', countrySet: 'IT' };

const emptyForm = {
	address: '',
	lat: '',
	lon: '',
};

export default {
	name: 'ApartmentForm',
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

	emits: ['form-submit'],

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

				axios.get(`${SEARCH_ENDPOINT}/${this.form.address}.json`, { params }).then(res => {
					this.suggestedAddresses = [];
					const addresses = res.data.results;

					addresses.forEach(address => {
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
				.then(res => {
					if (res.data.results.length === 0) {
						//TODO Implement proper error handling
						console.error('INDIRIZZO NON VALIDO');
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
			//todo checks if there are not errors
			this.$emit('form-submit', this.form);
		},
	},
};
</script>

<template>
	<form @submit.prevent="handleFormSubmit">
		<input
			@input="handleAddressInput"
			@focusout="getCoordinates"
			type="text"
			v-model.trim="form.address"
			list="addresses"
		/>
		<datalist id="addresses">
			<option
				v-for="address in suggestedAddresses"
				:key="address"
				:value="address"
			></option>
		</datalist>
		<button>Submit</button>
	</form>
</template>

<style scoped>
input[type='text'] {
	width: 1000px;
}
</style>
