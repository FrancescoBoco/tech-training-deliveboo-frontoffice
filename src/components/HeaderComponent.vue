<script>


export default {
    name: 'HeaderComponent',
    data() {
        return {
            title: 'HeaderComponent'
            //dati
        }
    },
    methods: {
        //function
    },
}
</script>

<template >
    <div class="navbar-style fixed-top">
        <div class="container">
            <nav class="p-2 d-flex align-items-center justify-content-between shadow">
                
                <router-link :to="{ name: 'home' }"> <img class="logo" src="/images/deliveboo.jpg" alt="deliveboo logo">

                </router-link>
                <router-link :to="{ name: 'home' }">
                    <h6><span class="main-gradient">Home</span></h6>
                </router-link>
                <a href="http://localhost:8000">
                    <h6><span class="main-gradient">Ristoratore</span></h6>
                </a>
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="fa-solid fa-cart-shopping"></i></button>

            </nav>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.logo {
    width: 100px;
    border-radius: 20px;
}

.navbar-style {
    background-color: rgba(0, 0, 0, 0.95);

    a {
        text-decoration: none;

        span {
            font-size: 30px;
        }
    }
}
</style>