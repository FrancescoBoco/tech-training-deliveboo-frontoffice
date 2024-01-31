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
    <section>
        <h1 class="mt-5 mb-3">Homepage </h1>
    </section>
    <div class="container">
        <div class="card mb-3" v-for="restaurant in restaurants" style="width: 18rem;">
            <img class="card-img-top" :src="restaurant.photo" :alt="restaurant.name">
            <div class="card-body">
                <h5 class="card-title">{{ restaurant.name }}</h5>
                <p class="card-text">Indirizzo: {{ restaurant.address }}</p>
                <p class="card-text">PIVA: {{ restaurant.piva }}</p>
                <p class="card-text">Tipologie:
                    <span class="badge text-bg-primary" v-for="typology in restaurant.typologies">{{ typology.name }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>