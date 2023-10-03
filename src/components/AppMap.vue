<script setup>
import { onMounted, reactive, ref } from 'vue';
const key = import.meta.env.VITE_TOM_TOM_KEY;

const props = defineProps({ apartments: Array })
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const mapRef = ref(null);
const locations = props.apartments;

const state = reactive({ locations })

const insertLocs = map => {
    const tomtom = window.tt;

    state.locations.forEach(location => {

        const img = `<a href="apartments/${location.slug}">
                        <img width="50" src=${backendUrl}/storage/${location.thumbnail}>
                        <div>${location.name}</div>
                    </a>`

        const marker = new tomtom.Marker().setLngLat(location).addTo(map);
        const popup = new tt.Popup({ anchor: 'top' }).setHTML(img)
        marker.setPopup(popup).togglePopup();
    })
}

onMounted(() => {
    const tt = window.tt;
    const focus = { lat: 41.89193, lng: 12.51133 }

    const map = tt.map({
        key,
        container: mapRef.value,
        center: focus,
        zoom: 4.5,
    })

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    insertLocs(map);

    window.map = map;
})

</script>

<template>
    <div class="d-flex justify-content-center">
        <div id="map" ref="mapRef"></div>
    </div>
</template>

<style scoped>
#map {
    height: 500px;
    width: 600px;
}
</style>