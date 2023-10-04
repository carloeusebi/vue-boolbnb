<script>
export default {
    props: {
        apartment: {}
    },
}   
</script>   




<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h4>Cosa troverai</h4>
                    <div class="row row-cols-2">

                        <!-- Stanze -->
                        <div class="d-flex align-items-baseline">
                            <div class="d-flex align-items-baseline">
                                <span><font-awesome-icon :icon="['fas', 'door-closed']" /> Stanze</span>
                                <h6 class="ps-2 fw-bold" v-if="apartment.rooms">{{ apartment.rooms }}</h6>
                                <span class="ps-4" v-else> -- </span>
                            </div>
                        </div>

                        <!-- Bagni -->
                        <div class="d-flex align-items-baseline">
                            <span><font-awesome-icon :icon="['fas', 'shower']" /> Bagni</span>
                            <h6 class="ps-2 fw-bold" v-if="apartment.bathrooms">{{ apartment.bathrooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>

                        <!-- Stanze da letto -->
                        <div class="d-flex align-items-baseline">
                            <span><font-awesome-icon :icon="['fas', 'bed']" /> Stanze da letto</span>
                            <h6 class="ps-2 fw-bold" v-if="apartment.bedrooms">{{ apartment.bedrooms }}</h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>

                        <!-- Metri quadrati -->
                        <div class="d-flex align-items-baseline">
                            <span><font-awesome-icon :icon="['fas', 'house']" /> Metri Quadri</span>
                            <h6 class="ps-2 fw-bold" v-if="apartment.square_meters">{{ apartment.square_meters }} m&sup2;
                            </h6>
                            <span class="ps-4" v-else> -- </span>
                        </div>


                        <!-- Wi-fi -->
                        <div class="d-flex align-items-baseline">
                            <p><font-awesome-icon :icon="['fas', 'wifi']" /> Wi-Fi</p>
                        </div>

                        <!-- Piscina -->
                        <div class="d-flex align-items-baseline">
                            <p><font-awesome-icon :icon="['fas', 'person-swimming']" /> Piscina</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div>
            </div>
        </div>
    </div>
</template>







<style scoped lang="scss">
h4 {
    font-weight: 600;
}

h6 {
    font-size: 16px;
    font-weight: 500;

}
</style>