<template>
    <div id="nav" :class="this.type">      
      <router-link to="/">Main</router-link> |
      <router-link to="/about">About</router-link>
    </div>    
</template>

<script>
import {mapState} from "vuex";

export default {
    computed: {
        ...mapState([
            "currentPage"
        ]),
        type(){
            let className;
            if(this.currentPage == "main"){
                className = "left";
            }
            return className;
        }
    }    
}
</script>

<style lang="scss">
    #nav {
        position:absolute;
        width:100%;
        height:50px;
        z-index: 100;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
            color: #42b983;
            }
        }
    }
</style>


