<template>
<MqResponsive :target="['xs', 'sm']">
    <Nav size="small" />
    <div class="small">
      <router-view/>
      <div class="modal"></div>
    </div>
    <!--<div>This will only show on x-small or small screens</div>-->
    <Footer size="small"/>
  </MqResponsive>
  <MqResponsive :target="['md', 'lg']">
    <Nav size="medium" />
    <div class="sideBar mediumCategorySidebar"></div>
    <!--<SideBar size='medium'/>-->
    <div class="medium">
      <router-view/>
      <div class="modal"></div>
    </div>
    <!--<div>This will only show on medium or large screens</div>-->
    <Footer size="medium"/>
  </MqResponsive>
  <MqResponsive :target="['xl', 'xxl']">
    <Nav size="large"/>
    <div class="sideBar largeCategorySidebar">
      <SideBar size='large'/>
    </div>
    <div class="large">
      <router-view/>
      <div class="modal"></div>
    </div>
    <!--<div>This will only show on x-large or xx-large screens</div>-->
    <Footer size="large" />
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
import Footer  from './views/FooterView.vue'
import SideBar from './views/SidebarView.vue'
//import { useI18n } from 'vue-i18n'

export default {//Receive showSideBAr event, and send to SideBar component
  components: { Nav, SideBar, Footer }/*,
  setup() {
      const { t } = useI18n()
      console.log(t);
      return { t }
    }*/
}
</script>


<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app {
  min-height: 100vh;
}
.unselecable {
  user-select: none; 
}
.largeCategorySidebar {
  position:relative;
  float:left;
  width:200px;
  height:calc(100vh - 90px);
}
.mediumCategorySidebar {
  display:none !important;
}
.large {
  position:relative;
  float:left;
  width: calc(100vw - 216px);
}
</style>
