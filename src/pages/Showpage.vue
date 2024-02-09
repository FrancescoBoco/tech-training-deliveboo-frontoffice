<script>
import axios from "axios";
import { store } from "../store";

export default {
    components: {
    },
    data() {
        return {
            title: 'Showpage',
            restaurant: [],
            restaurantId: null,
            selectedRestaurantImage: null,
            store
        }
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/restaurant/' + this.restaurantId)
                .then((response) => {
                    this.restaurant = response.data;
                    this.selectedRestaurantImage = response.data.photo;
                    this.restaurant.dish.map((dish) => {
                        dish.qty = 1
                    })
                })


        },
        addToCart(dish) {
            let alreadyAdded = false

            store.cart.forEach((currentDish) => {

                if (dish.id == currentDish.id) {
                    currentDish.qty = currentDish.qty + dish.qty
                    alreadyAdded = true
                }

            })

            if (!alreadyAdded) {
                store.cart.push({ ...dish })
            }

        }
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

            <h1 class="mt-5 mb-3 main main-gradient glass-form display-5 fw-bold">{{ restaurant.name }}</h1>
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
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Quantità:</span>
                                <input v-model="dish.qty" type="number" class="form-control"
                                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                                <button @click="addToCart(dish)" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight" class="btn btn-primary"><i
                                        class="fa-solid fa-cart-plus"></i></button>

                            </div>

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