<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import * as turf from '@turf/turf'

const key = import.meta.env.VITE_TOM_TOM_KEY;

const rome = { lat: 41.89193, lng: 12.51133 };
const markers = [];

const props = defineProps({
    apartments: Array,
    circle: Object,
    coordinates: Object,
    radius: {
        default: '20'
    },
    zoom: {
        type: Number,
        default: 4.5
    },
    focus: Array
})
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const mapRef = ref(null);
let timeout = null;

watch(() => props.coordinates,
    newValue => {
        const { lat, lon } = newValue;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            addCircle(map, [lon, lat], props.radius);
        }, 300);
    })

watch(() => props.apartments,
    newValue => {
        insertLocs(map, newValue)
    })

const insertLocs = (map, locations) => {
    const tomtom = window.tt;

    // clear all the previous markers
    markers.forEach(marker => { marker.remove() })

    locations.forEach(location => {

        const img = `<a href="apartments/${location.slug}">
                        <img width="50" src=${backendUrl}/storage/${location.thumbnail}>
                        <div>${location.name}</div>
                    </a>`

        const marker = new tomtom.Marker().setLngLat(location).addTo(map);
        const popup = new tt.Popup({ anchor: 'top' }).setHTML(img)
        marker.setPopup(popup).togglePopup();
        markers.push(marker);
    })

}

const addCircle = (map, coordinates, radius) => {

    if (coordinates[0] === '' && coordinates[1] === '')
        coordinates = [rome.lng, rome.lat];

    const center = turf.point(coordinates)
    const options = { steps: 80, units: 'kilometers' }

    const circle = turf.circle(center, radius, options)


    map.setCenter(coordinates);

    const layer = map.getLayer('circle-fill');
    if (layer) {
        map.removeLayer('circle-fill')
    }
    const source = map.getSource('circleData');
    if (source) {
        map.removeSource('circleData');
    }

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
    let { coordinates } = props;

    if (coordinates.lat === '' && coordinates.lon === '')
        coordinates = { ...rome };

    const tt = window.tt;
    const focus = coordinates

    const map = tt.map({
        key,
        container: mapRef.value,
        center: focus,
        zoom: props.zoom,
    })

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    insertLocs(map, props.apartments);

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