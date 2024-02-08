<template>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Il tuo carrello</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <h4 v-if="store.cart.length < 1">Non hai prodotti nel carrello</h4>
    <div v-else class="row">
        <div v-for="dish in store.cart" class="col-12">
            <div class="product d-flex align-items-center gap-3">
                <img class="img-fluid preview" :src="dish.photo" alt="">
                <div class="info">
                <p>Nome: {{ dish.name }}</p>
                <p>Qt: {{ dish.qty }}</p>
                <p>Prezzo: {{ (dish.price*dish.qty).toFixed(2) }}&euro;</p>
            </div>
            
                
            </div>
        </div>
        <div class="extra-info mt-3">
                <p class="fw-bold">Prezzo totale: {{ totalPrice }}&euro;</p>
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
                  return accumulator+dish.price*dish.qty
                }, initialPrice)
                return totalPrice.toFixed(2)
            }
        }
        
    }
</script>

<style lang="scss" scoped>
.preview {
    width: 150px;
}
</style>