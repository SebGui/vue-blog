<template>

  <MqResponsive :target="['xs', 'sm']">
    <LoginView v-if="isLoggedIn == false" :size="smallScreenValue" @loggedIn='setLoggedIn'/>
    <div v-if="isLoggedIn == true">
      <Nav :size="smallScreenValue" />
      <div class="small">
        <router-view :size="smallScreenValue"/>
        <div class="modal"></div>
      </div>
      <Footer :size="smallScreenValue"/>
    </div>
  </MqResponsive>

  <MqResponsive :target="['md', 'lg']">
    <LoginView v-if="isLoggedIn == false" :size="mediumScreenValue" @loggedIn='setLoggedIn'/>
    <div v-if="isLoggedIn == true">
      <Nav :size="mediumScreenValue" />
      <div class="medium">
        <router-view/>
        <div class="modal"></div>
      </div>
      <Footer :size="mediumScreenValue"/>
    </div>
  </MqResponsive>

  <MqResponsive :target="['xl', 'xxl']">
    <LoginView v-if="isLoggedIn == false" :size="largeScreenValue" @loggedIn='setLoggedIn'/>
    <div v-if="isLoggedIn == true">
      <Nav :size="largeScreenValue" @loggedIn='setLoggedIn'/>
      <div class="sideBar largeCategorySidebar">
        <SideBar :size="largeScreenValue"/>
      </div>
      <div class="large">
        <router-view/>
        <div class="modal"></div>
      </div>
      <Footer :size="largeScreenValue" />
    </div>
  </MqResponsive>

</template>

<script>
import LoginView from './views/LoginView.vue'
import Nav  from './components/Nav.vue'
import Footer  from './views/FooterView.vue'
import SideBar from './views/SidebarView.vue'
import getUser from './composables/user/getUser'
import { ref, onMounted, inject } from 'vue'

export default {
  components: { Nav, SideBar, Footer, LoginView },
  setup() {
      const smallScreenValue = ref('small');
      const mediumScreenValue = ref('medium');
      const largeScreenValue = ref('large');
      const $cookies = inject('$cookies');
      let isLoggedIn = ref(null);

      const setLoggedIn = (logValue) => {
        isLoggedIn.value = logValue;
        if (logValue === false) {
          logout();
        }
      }
      const logout = () => {
        $cookies.remove('userId')
        $cookies.remove('token')
      }
      const checkLoginStatus = () => {
        if ($cookies.get('userId') !== null && $cookies.get('token') !== null) {
          const {user, error, load} = getUser($cookies.get('userId'));
          load((user) => validateLoggedInStatus(user));
        } else {
          setLoggedIn(false);
        }
      }
      const validateLoggedInStatus = (user) => {
        if ($cookies.get('userId') === user.id && $cookies.get('token') === user.token) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      }



      onMounted(() => {
        checkLoginStatus();
      })

      return { smallScreenValue, mediumScreenValue, largeScreenValue, isLoggedIn, setLoggedIn }
    },
    update() {
      console.log("App updated");
    }
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
html {
  min-width:330px;
}
#app {
  min-height: 97vh;
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
  width: calc(100vw - 231px);
}
</style>
