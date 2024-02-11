<template>
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title main-gradient fw-bold fs-3" id="offcanvasRightLabel">Il tuo carrello</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <h4 v-if="store.cart.length < 1">Non hai prodotti nel carrello</h4>
            <div v-else class="row">
                <div v-for="dish in store.cart" class="col-12">
                    <div class="product d-flex align-items-center gap-3">
                        <img class="img-fluid preview" :src="dish.photo" :alt="dish.name" style="max-height: 100px;">
                        <div class="info">
                            <p><span class="main-color">Nome:</span> {{ dish.name }}</p>
                            <p><span class="main-color">Qt: </span> {{ dish.qty }}</p>
                            <p><span class="main-color">Prezzo: </span> {{ (dish.price * dish.qty).toFixed(2) }} <span
                                    class="main-color">&euro;</span>
                            </p>
                        </div>


                    </div>
                </div>
                <div class="extra-info mt-3">
                    <p class="fw-bold"> <span class="main-color">Prezzo totale: </span>{{ totalPrice }} <span
                            class="main-color">&euro;</span></p>
                    <a @click="this.$router.push('/payment')" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                        class="btn btn-danger mt-3 w-100 fw-bold ">Acquista</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store";

export default {
    data() {
        return {
            store,
        }
    },
    computed: {
        totalPrice() {
            const initialPrice = 0;
            const totalPrice = store.cart.reduce((accumulator, dish) => {
                return accumulator + dish.price * dish.qty
            }, initialPrice)
            store.totalPrice = totalPrice.toFixed(2)
            return totalPrice.toFixed(2)
        }
    }

}
</script>

<style lang="scss" scoped>
.preview {
    width: 150px;
}

.btn {
    background-color: #D95D30;
    border-color: #D94141;
    color: white;
}

.main-color {
    color: #D95D30;

}
</style>