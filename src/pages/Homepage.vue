<script>
import axios from "axios";
import { store } from "../store";

export default {
    components: {
},
    data() {
        return {
            title: 'Home',
            store,
            restaurants: [],
        }
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/restaurants')
                .then((response) => {
                    this.restaurants = response.data;
                })
        },
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<template>
    <section class="d-flex justify-content-center">
        <h1 class="mt-5 mb-3">Ristoranti</h1>
    </section>
    <div class="container">
        <div class="row">
            <div class="col-4 d-flex justify-content-center" v-for="restaurant in restaurants">
        <div class="card mb-3"  style="width: 18rem;">
            <img class="card-img-top" :src="restaurant.photo" :alt="restaurant.name">
            <div class="card-body">
                <h5 class="card-title">{{ restaurant.name }}</h5>
                <p class="card-text">Indirizzo: {{ restaurant.address }}</p>
                <p class="card-text">Tipologie:
                    <span class="badge text-bg-primary me-1" v-for="typology in restaurant.typologies">{{ typology.name }}</span>
                </p>
                <div class="d-flex justify-content-center">
                <router-link class="btn btn-info" :to="{name: 'show', params: {id: restaurant.id}}">Mostra menu</router-link>
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
    color:white;
}

.btn-info {
    background-color: #D94141;
    border-color: #D94141;
    color:white;
}
</style>