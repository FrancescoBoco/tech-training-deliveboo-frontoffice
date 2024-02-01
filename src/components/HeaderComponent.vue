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
    <div class="navbar-style">
        <div class="container">
            <nav class="p-2 d-flex align-items-center justify-content-between">
                <router-link :to="{ name: 'home' }"> <img class="logo" src="/images/deliveboo.jpg" alt="deliveboo logo">

                </router-link>
                <router-link :to="{ name: 'home' }">
                    <h6><span>Home</span></h6>
                </router-link>
                <router-link :to="{ name: 'search' }">
                    <h6><span>Ristoratore</span></h6>
                </router-link>
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
    background-color: rgba(0, 0, 0, 0.937);

    a {
        color: #D95D30;
        text-decoration: none;

        span {
            font-size: 30px;
        }
    }
}
</style>