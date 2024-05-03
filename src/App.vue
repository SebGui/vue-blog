<template>
  {{ $t('user.data.mail') }}
  <!--<Nav />
  <div class="small">
    <router-view/>
  </div>-->

  <MqResponsive :target="['xs', 'sm']">
    <Nav />
    <div class="small">
      <router-view/>
    </div>
    <div>This will only show on x-small or small screens</div>
  </MqResponsive>
  <MqResponsive :target="['md', 'lg']">
    <Nav />
    <div class="medium">
      <router-view/>
    </div>
    <div>This will only show on medium or large screens</div>
  </MqResponsive>
  <MqResponsive :target="['xl', 'xxl']">
    <Nav />
    <div class="large">
      <router-view/>
    </div>
    <div>This will only show on x-large or xx-large screens</div>
  </MqResponsive>

  <!-- XS & SM // MD & LG // XL & XXL
    <MqResponsive target="xs">
      <div>This is an XS Screen</div>
    </MqResponsive>
    <MqResponsive target="sm">
      <div>This is an SM Screen</div>
    </MqResponsive>
    <MqResponsive target="md">
      <div>This is an MD Screen</div>
    </MqResponsive>
    <MqResponsive target="lg">
      <div>This is an LG Screen</div>
    </MqResponsive>
    <MqResponsive target="xl">
      <div>This is an XL Screen</div>
    </MqResponsive>
    <MqResponsive target="xxl">
      <div>This is an XXL Screen</div>
    </MqResponsive>

    <MqResponsive :target="['xs', 'sm']">
      <div>This will only show on x-small or small screens</div>
    </MqResponsive>
    <MqResponsive :target="['md', 'lg']">
      <div>This will only show on medium or large screens</div>
    </MqResponsive>
    <MqResponsive :target="['xl', 'xxl']">
      <div>This will only show on x-large or xx-large screens</div>
    </MqResponsive>
  -->
</template>

<script>
import Nav  from './components/Nav.vue'
//import { useI18n } from 'vue-i18n'

export default {
  components: { Nav }/*,
  setup() {
      const { t } = useI18n()
      console.log(t);
      return { t }
    }*/
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
