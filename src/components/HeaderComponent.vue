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

<template>
    <h2>Header</h2>
<router-link :to="{ name: 'home' }">
    <h6 ><span>home </span></h6>
</router-link>
<router-link :to="{ name: 'search' }">
    <h6 ><span>go to search </span></h6>
</router-link>
<router-link :to="{ name: 'show' }">
    <h6 ><span>go to show </span></h6>
</router-link>
 


</template>


<style lang="scss" scoped>
</style>