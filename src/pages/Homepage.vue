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
                    <h1 class="mb-3">Ristoranti</h1>
                </section>
                <h3 class="text-center">Filtro per categorie</h3>

                <div class="d-flex justify-content-center m-3">
                    <div v-for="typology in typologies" class="btn-group me-1" role="group"
                        aria-label="Basic checkbox toggle button group">
                        <input @click="search(typology.name)" type="checkbox" class="btn-check" :id="typology.name"
                            autocomplete="off">
                        <label class="btn btn-outline-danger" :for="typology.name">{{ typology.name }}</label>

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
                                <router-link class="btn btn-info"
                                    :to="{ name: 'show', params: { id: restaurant.id } }">Mostra
                                    menu</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center p-3" v-else>
                <h5>Nessun ristorante trovato</h5>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
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

.btn-info {
    background-color: rgba(217, 65, 65, 0);
    border-color: #D94141;
    color: white;
    transition: all .5s;

    &:hover {
        background-color: rgba(217, 65, 65, 1);
    }
}

.margin-h1 {
    padding-top: 1rem;
}

.btn-outline-danger {
    --bs-btn-color: green;
    --bs-btn-border-color: #dc3545;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #dc3545;
    --bs-btn-hover-border-color: #dc3545;
    --bs-btn-focus-shadow-rgb: 220, 53, 69;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #dc3545;
    --bs-btn-active-border-color: #dc3545;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #dc3545;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #dc3545;
    --bs-gradient: none;
}
</style>