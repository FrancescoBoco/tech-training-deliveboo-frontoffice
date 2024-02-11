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


        <div class="container py-3">
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
            <div class="glass-form row p-3" v-if="restaurants.length > 0">
                <router-link :to="{ name: 'show', params: { id: restaurant.id } }"
                    class="col-4 d-flex justify-content-center rounded-2 mb-3" v-for="restaurant in restaurants">
                    <div class="overlay">
                        <div class="img-container">
                            <img class="img-fluid" :src="restaurant.photo" :alt="restaurant.name"
                                style="min-height: 270px;">
                        </div>
                        <div class="overlay-content text-center">
                            <h5 class="fw-bold pt-2 fs-3 main-gradient ">
                                {{ restaurant.name }}
                            </h5>

                            <div class="mb-2"> <span class="fw-bold me-1">Indirizzo:</span> {{ restaurant.address }}</div>
                            <div class="mb-2"> <span class="fw-bold me-1">Tipologie:</span>
                                <span class="me-1" v-for="typology in restaurant.typologies">{{
                                    typology.name }}</span>
                            </div>
                        </div>
                    </div>
                </router-link>
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

.img-container {
    overflow: hidden;

    img {
        border-radius: 5px;
        transition: all .5s;

    }
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

.overlay {
    position: relative;
    transition: all 0.5s;

    &-content {
        position: absolute;
        top: 225px;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 5px;
        background-color: rgba($color: #000000, $alpha: 0.9);
        opacity: 1;
        transition: all .5s;
        transition-delay: .25s;
        color: #ec8232;
        overflow: hidden;
    }

    &:hover {
        img {
            transform: scale(1.2);
            filter: grayscale(60%);

        }

        .overlay-content {
            top: 50%;
        }
    }
}
</style>