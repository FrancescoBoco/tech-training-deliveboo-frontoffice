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
                    <input type="text" v-model="user.surname" class="form-control" required>
                </div>
                <div class="mb-3 col-6">
                    <label for="exampleFormControlInput1" class="form-label">Indirizzo</label>
                    <input type="text" v-model="user.address" class="form-control" required>
                </div>
                <div class="mb-3 col-6">
                    <label for="exampleFormControlTextarea1" class="form-label">Telefono</label>
                    <input type="text" v-model="user.phone" class="form-control" required>
                </div>
                <p class="fw-bold fs-3 m-0">Pagherai: {{ this.store.totalPrice }}&euro;</p>
                <div id="dropin-container"></div>
                <form id="payment-form" action="" method="post">

                    <div class="d-flex justify-content-center">
                        <button id="submit-button" :class="{ 'disabled': loadingBrain }"
                            class="btn btn-primary">{{ paymentAdded ? 'Paga' : 'Aggiungi carta' }}</button>
                    </div>
                </form>
            </div>

        </div>
    </div>

    <div v-if="loadingPayment" class="loading">
        <div class='uil-ring-css' style='transform:scale(0.79);'>
            <div>
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
            store,
            loadingPayment: false,
            paymentAdded: null,
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
            this.loadingPayment = true

            const paymentInfo = {
                name: this.user.name,
                last_name: this.user.surname,
                address: this.user.address,
                phone: this.user.phone,
                total_price: this.store.totalPrice,
                products: this.store.cart
            }
            axios.post('http://localhost:8000/api/payment/process', paymentInfo).
                then((res) => {
                    this.loadingPayment = false
                    this.paymentAdded = false
                    console.log('riuscito')
                    this.store.totalPrice = 0
                    this.store.cart = []
                    this.$router.push('/payment/success')
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

*.hidden {
  display: none !important;
}

div.loading{
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(16, 16, 16, 0.5);
}

@-webkit-keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-ms-keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes uil-ring-anim {
  0% {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.uil-ring-css {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 200px;
}
.uil-ring-css > div {
  position: absolute;
  display: block;
  width: 160px;
  height: 160px;
  top: 20px;
  left: 20px;
  border-radius: 80px;
  box-shadow: 0 6px 0 0 #ffffff;
  -ms-animation: uil-ring-anim 1s linear infinite;
  -moz-animation: uil-ring-anim 1s linear infinite;
  -webkit-animation: uil-ring-anim 1s linear infinite;
  -o-animation: uil-ring-anim 1s linear infinite;
  animation: uil-ring-anim 1s linear infinite;
}
</style>