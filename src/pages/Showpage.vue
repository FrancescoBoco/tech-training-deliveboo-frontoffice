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
                        dish.showOverlayBody = false;
                        dish.rounded = false;
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
        },
        toggleOverlayBody(dish) {
            dish.showOverlayBody = !dish.showOverlayBody;
            dish.rounded = !dish.rounded;
        },
        increaseQuantity(dish) {
            dish.qty++;
        },
        decreaseQuantity(dish) {
            if (dish.qty > 1) {
                dish.qty--;
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
    <div class="wrap pb-3"
        :style="{ backgroundImage: `url('${selectedRestaurantImage}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }">
        <section class="d-flex justify-content-center">
            <h1 class="mt-5 mb-3 main-gradient glass-form display-5 fw-bold text-capitalize">{{ restaurant.name }}</h1>
        </section>
        <div class="container">
            <div class="row glass-form">
                <div class="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center justify-content-center mb-4 p-2 position-relative overflow-hidden"
                    v-for="dish in restaurant.dish" @click="toggleOverlayBody(dish)">

                    <div class="overlay-content">

                        <h3 class="main-gradient fw-bold text-center text-capitalize">{{ dish.name }}</h3>
                        <div :class="{ 'transitioned': dish.showOverlayBody }" class="overlay-body">
                            <p class=""> <span class="fw-bold">Descrizione: </span>{{ dish.description }}</p>
                            <p class=""> <span class="fw-bold">Ingredienti: </span> {{ dish.ingredients }}</p>
                            <div class="d-flex align-items-center justify-content-between">
                                <div style="color: #D95D30; padding: 5px 30px"><span class="fw-bold">Prezzo: </span>
                                    <span class="text-light fw-bold">{{ dish.price }}</span> <span
                                        class="fw-bold">&euro;</span>
                                </div>
                                <div class="quantity-buttons">
                                    <button @click.stop="decreaseQuantity(dish)" class="btn"><i
                                            class="fa-solid fa-minus"></i></button>
                                    <span class="quantity mx-2 fw-bold text-light">{{ dish.qty }}</span>
                                    <button @click.stop="increaseQuantity(dish)" class="btn"><i
                                            class="fa-solid fa-plus"></i></button>
                                </div>
                                <button @click.stop="addToCart(dish)" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight" class="btn btn-primary me-3"><i
                                        class="fa-solid fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div :class="{ 'rounded': dish.rounded, 'scaled': dish.rounded }" class="overlay-img mt-3">
                        <img class="" :src="dish.photo" :alt="dish.name">
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

.btn {
    background-color: #D95D30;
    border-color: #D94141;
    color: white;
}

.col-4 {
    cursor: pointer;
    overflow: hidden;

    &:hover:not(.rounded) .overlay-img {
        transform: scale(0.75);
    }
}


.overlay-img {
    width: 250px;
    height: 250px;
    overflow: hidden;
    border-radius: 50%;
    transform: scale(0.5);
    transition: all 0.5s;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;

    }
}

.overlay-img.rounded {
    width: 100%;
    max-height: 300px;
    border-radius: 20px;
    transform: scale(1.1) !important;
    z-index: -1;
    padding: 10px 20px;
    filter: brightness(40%);


}



.overlay-content {
    padding: 10px;
    border-radius: 20px;
    position: absolute;
    top: 2px;
    right: 2px;
    left: 2px;
    bottom: 2px;


    h3 {
        position: absolute;
        top: 20px;
        right: 0;
        left: 0;
    }

    .overlay-body {
        position: absolute;
        right: 0;
        left: 0;
        top: 300px;
        transition: all .5s;


        p {

            color: #D95D30;
            padding: 5px 30px
        }
    }

    .transitioned {
        top: 100px;

    }


}
</style>