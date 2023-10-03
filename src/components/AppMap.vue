<script setup>
import { onMounted, reactive, ref } from 'vue';
import * as turf from '@turf/turf'

const key = import.meta.env.VITE_TOM_TOM_KEY;

const props = defineProps({
    apartments: Array,
    circle: Object
})
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

const addCircle = map => {

    const center = turf.point([12.51133, 41.89193])
    const radius = 150
    const options = { steps: 80, units: 'kilometers' }

    const circle = turf.circle(center, radius, options)

    map.addSource('circleData', {
        type: 'geojson', data: circle
    })

    map.addLayer({
        id: 'circle-fill',
        type: 'fill',
        source: 'circleData',
        paint: {
            "fill-color": "blue",
            "fill-opacity": 0.1,
        },
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

    if (props.circle) {
        setTimeout(() => {
            addCircle(map);
        }, 1000)
    }


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