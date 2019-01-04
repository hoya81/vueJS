<template>
  <div id="app" v-wheel="onWheel">
    <Navigation />    
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vuewheel from 'vuewheel'
import Navigation from '@/components/Navigation'
Vue.use(vuewheel)

export default {
  data(){
    return {
      routes: this.$router.options.routes
    };
  },
  components: {Navigation},
  methods: {
    onWheel(e){
      if(this.$store.state.isMovePage)return;
      let num, currentRoute, nextRoute;
      currentRoute = this.$router.currentRoute.name ? this.$router.currentRoute.name :'main';
      for(let i = 0; i < this.routes.length - 1; i++){
        if(this.routes[i].name===currentRoute)
        {
          num = i;     
          break;
        }
      }
      if(e.deltaY > 0) num++;
      if(e.deltaY <= 0) num--;
      if(num < 0 || num >= this.routes.length-1)return;
      nextRoute = this.routes[num].name;
      if(nextRoute == 'main')nextRoute = '/';
      this.$router.push(nextRoute);
    }
  }
}
</script>


<style lang="scss">
@import "@/assets/scss/_variables.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
