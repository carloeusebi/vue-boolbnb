<script>
import axios, { isAxiosError } from 'axios';

const SEARCH_ENDPOINT = 'https://api.tomtom.com/search/2/search';
const GEOCODE_ENDPOINT = 'https://api.tomtom.com/search/2/geoddcode';
const TOM_TOM_KEY = import.meta.env.VITE_TOM_TOM_KEY;

const params = { key: TOM_TOM_KEY, language: 'it-IT', countrySet: 'IT' };

const emptyForm = {
	address: '',
	lat: '',
	lon: '',
};

export default {
	name: 'CreateApartmentPage',
	data() {
		return {
			form: { ...emptyForm },
			addressTimeout: null,
			suggestedAddresses: [],
			fetchingCoordinates: false,
		};
	},
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
			axios
				.get(`${GEOCODE_ENDPOINT}/${this.form.address}.json`, { params })
				.then(res => {
					if (res.data.results.length === 0) {
						//TODO Implement proper erro handling
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
	},
};
</script>

<template>
	<input
		@input="handleAddressInput"
		@focusout="getCoordinates"
		type="text"
		v-model="form.address"
		list="addresses"
	/>
	<datalist id="addresses">
		<option
			v-for="address in suggestedAddresses"
			:key="address"
			:value="address"
		></option>
	</datalist>
</template>

<style scoped></style>
