<template>
    <div class="wrap pt-3">
        <div class="container">
            <div class="row">
                <div class="mb-3 col-6">
                    <label for="exampleFormControlInput1" class="form-label">Nome</label>
                    <input type="text" v-model="user.name" class="form-control" required>
                </div>
                <div class="mb-3 col-6">
                    <label for="exampleFormControlTextarea1" class="form-label">Cognome</label>
                    <input type="text"  v-model="user.surname" class="form-control" required>
                </div>
                <div class="mb-3 col-6">
                    <label for="exampleFormControlInput1" class="form-label">Indirizzo</label>
                    <input type="text" v-model="user.address" class="form-control" required>
                </div>
                <div class="mb-3 col-6">
                    <label for="exampleFormControlTextarea1" class="form-label">Telefono</label>
                    <input type="text" v-model="user.phone" class="form-control" required>
                </div>
                
                <div id="dropin-container"></div>
                <form id="payment-form" action="" method="post">

                <div class="d-flex justify-content-center">
                    <button id="submit-button" :class="{'disabled': loadingBrain}" class="btn btn-primary">Acquista</button>
                </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";

export default {
    data() {
        return {
            token: null,
            loadingBrain: true,
            user: {},
            store
        }
    },
    methods: {
        initializePayment(token) {
            const form = document.querySelector('#payment-form')
            braintree.dropin.create({
                authorization: token,
                container: '#dropin-container',
                locale: 'it_IT',

            }, (error, dropinInstance) => {
                if (error) console.error(error);

                this.loadingBrain = false


                form.addEventListener('submit', event => {
                    event.preventDefault();


                    dropinInstance.requestPaymentMethod((error, payload) => {
                        if (error) console.error(error);

                        if (this.paymentAdded) {
                            this.pay()

                        }
                        else {

                            // Step four: when the user is ready to complete their
                            //   transaction, use the dropinInstance to get a payment
                            //   method nonce for the user's selected payment method, then add
                            //   it a the hidden field before submitting the complete form to
                            //   a server-side integration
                            this.nonce = payload.nonce;
                            this.paymentAdded = true;
                            this.addedCard = true;

                        }

                    });
                });
            });
        },
        getToken() {
            axios.get('http://localhost:8000/api/payment/initialize')
                .then((res) => {
                    this.token = res.data.token
                    this.initializePayment(this.token)
                })
        },
        pay() {
            const paymentInfo = {
                name: this.user.name,
                last_name: this.user.surname,
                address: this.user.address,
                phone: this.user.phone,
              //  total_price: this.totalPrice,
                products: this.store.cart.products
            }
            axios.post('http://localhost:8000/api/payment/process', paymentInfo).
            then((res) => {
                console.log('riuscito')
            })
        }

    },
    mounted() {
        this.getToken()
        console.log('we')
    },
    computed: {
       
    }

}
</script>

<style lang="scss" scoped>
.row {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
}
</style>