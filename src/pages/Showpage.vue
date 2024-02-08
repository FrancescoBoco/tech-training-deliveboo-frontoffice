<script>
import axios from "axios";
export default {
    components: {
    },
    data() {
        return {
            title: 'Showpage',
            restaurant: [],
            restaurantId: null,
            selectedRestaurantImage: null
        }
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/restaurant/' + this.restaurantId)
                .then((response) => {
                    this.restaurant = response.data;
                    this.selectedRestaurantImage = response.data.photo;
                })
        },
    },
    mounted() {
        this.fetchData();
    },
    created() {
        this.restaurantId = this.$route.params.id;
    }
}
</script>

<template>
    <div class="wrap"
        :style="{ backgroundImage: `url('${selectedRestaurantImage}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }">



        <section class="d-flex justify-content-center">

            <h1 class="mt-5 mb-3 main main-gradient">{{ restaurant.name }}</h1>
        </section>
        <div class="container">
            <div class="row">
                <div class="col-4 d-flex justify-content-center" v-for="dish in restaurant.dish">
                    <div class="card mb-3" style="width: 18rem;">
                        <img class="card-img-top" :src="dish.photo" :alt="dish.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ dish.name }}</h5>
                            <p class="card-text">Descrizione: {{ dish.description }}</p>
                            <p class="card-text">Ingredienti: {{ dish.ingredients }}</p>
                            <p class="card-text">Prezzo:
                                <span class="badge text-bg-primary">{{ dish.price }} &euro;</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-body {
    background-color: #D95D30;
    color: white;
}

.btn-info {
    background-color: #D94141;
    border-color: #D94141;
    color: white;
}
</style>