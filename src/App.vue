<template>

  <MqResponsive :target="['xs', 'sm']">
    <LoginView v-if="isLoggedIn == false" :size="smallScreenValue" @loggedIn='setLoggedIn'/>
    <div v-if="isLoggedIn == true">
      <Nav :size="smallScreenValue" @loggedIn='setLoggedIn'/>
      <div :class="smallScreenValue">
        <router-view :size="smallScreenValue"/>
        <div class="modal"></div>
      </div>
      <Footer :size="smallScreenValue"/>
    </div>
  </MqResponsive>

  <MqResponsive :target="['md', 'lg']">
    <LoginView v-if="isLoggedIn == false" :size="mediumScreenValue" @loggedIn='setLoggedIn'/>
    <div v-if="isLoggedIn == true">
      <Nav :size="mediumScreenValue" @loggedIn='setLoggedIn'/>
      <div :class="mediumScreenValue">
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
      <div :class="largeScreenValue">
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
      /* These screen values will impact some class names, do not alter */
      const smallScreenValue = ref('small');
      const mediumScreenValue = ref('medium');
      const largeScreenValue = ref('large');
      const $cookies = inject('$cookies');
      let isLoggedIn = ref(null);

      /* Sets login status */
      const setLoggedIn = (logValue) => {
        isLoggedIn.value = logValue;
        if (logValue === false) {
          logout();
        }
      }

      /* Terminates the session */
      const logout = () => {
        $cookies.remove('userId')
        $cookies.remove('token')
      }

      /* Checks wether or not the user should still have access */
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
      //console.log("App updated");
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
select {
  color:#2c3e50;
}
select option {
  color:#2c3e50;
  background-color:#3ca5760c !important;
}
select option:hover {
  color:white;
  background-color:#3ca576 !important;
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
  width:215px;
  height:calc(100vh - 90px);
}
.mediumCategorySidebar {
  display:none !important;
}
.large {
  position:relative;
  float:left;
  width: calc(100vw - 246px);
}
</style>
