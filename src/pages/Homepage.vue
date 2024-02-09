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
            typologies: [],
            typologiesSearch: [],
            stringTypologies: ''
        }
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/restaurants?typologies=' + this.stringTypologies)
                .then((response) => {
                    this.restaurants = response.data;
                })
            axios.get('http://127.0.0.1:8000/api/typologies')
                .then((response) => {
                    this.typologies = response.data
                })

        },
        search(typology) {
            if (this.typologiesSearch.includes(typology)) {
                const indextoRemove = this.typologiesSearch.indexOf(typology)
                this.typologiesSearch.splice(indextoRemove, 1)
                console.log(this.typologiesSearch.indexOf(typology))
            }
            else {
                this.typologiesSearch.push(typology)
            }

            this.stringTypologies = this.typologiesSearch.toString()
            this.fetchData()

        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<template>
    <div class="wrap">


        <div class="container pt-3">
            <div class="glass-form mb-3 row">
                <section class="d-flex justify-content-center">
                    <h1 class="mb-3 display-5 main-gradient fw-bold">Ristoranti</h1>
                </section>
                <h3 class="text-center display-6 pb-3 main-gradient ">Filtro per categorie</h3>
                <div class="m-3 row d-flex align-items-center justify-content-center">
                    <div v-for="typology in typologies" :key="typology.name"
                        class="custom-checkbox-group m-1 col-4 col-sm-3 col-lg-2 m-lg-0 mb-lg-2 text-center" role="group"
                        aria-label="Basic checkbox toggle button group">
                        <input @click="search(typology.name)" type="checkbox" class="btn-check" :id="typology.name"
                            autocomplete="off">
                        <label :for="typology.name" class="custom-checkbox-label"
                            :class="{ 'active': typologiesSearch.includes(typology.name) }">{{ typology.name }}</label>
                    </div>
                </div>
            </div>
            <div class="glass-form row mb-3" v-if="restaurants.length > 0">
                <div class="col-4 d-flex justify-content-center" v-for="restaurant in restaurants">
                    <div class="card mb-3" style="width: 18rem;">
                        <img class="card-img-top" :src="restaurant.photo" :alt="restaurant.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ restaurant.name }}</h5>
                            <p class="card-text">Indirizzo: {{ restaurant.address }}</p>
                            <p class="card-text">Tipologie:
                                <span class="badge text-bg-primary me-1" v-for="typology in restaurant.typologies">{{
                                    typology.name }}</span>
                            </p>
                            <div class="d-flex justify-content-center">
                                <router-link class="btn btn-outline-danger"
                                    :to="{ name: 'show', params: { id: restaurant.id } }">Mostra
                                    menu</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center p-3 " v-else>
                <h5 class="display-5 main-gradient fw-bold glass-form">Nessun ristorante trovato</h5>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;

.wrap {
    background-image: url(../../public/images/background-1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.card-body {
    background-color: #D95D30;
    color: white;
}

.custom-checkbox-group {
    display: inline-block;
}

.custom-checkbox-group input[type="checkbox"] {
    display: block;
}

.custom-checkbox-label {
    display: inline-block;
    padding: 0.5rem;
    color: #ec8232;
    background-color: transparent;
    border: 1px solid;
    min-width: 105px;
    border-radius: 15px;
    margin: 0 5px;
    cursor: pointer;

    transition: all .25s;
}

.custom-checkbox-label.active {
    color: #fff;
    background-image: linear-gradient(325deg, #ec8232, #d03448);
}
</style>