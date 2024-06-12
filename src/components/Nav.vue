<template>
 <div class="navContainer" :class="{navFixed: scrollPosition > 80}">

  <div :class="{navMedium:size=='medium',navSmaller:size=='small',navLarge:size=='large'}">

      <div v-if="size != 'large'" class="navCategoryMenuContainter navButton" @click="toggleSidebar">
        <fa-icon icon="bars" /> <span v-if="size != 'small'">{{ $t('home.categoryMenuText') }}</span>
        <ModalView v-if="showSidebar" type="sidebar" :size="size"/>
      </div>

      <nav>
        <router-link :to="{name: 'home'}"><fa-icon icon="house" /> <span v-if="size != 'small'">{{ $t('home.homeText') }}</span></router-link>
        <router-link :to="{name: 'about'}"><fa-icon icon="circle-info" /> <span v-if="size != 'small'">{{ $t('home.aboutText') }}</span></router-link>
      </nav>

      <div class="navTopRight">

        <div class="navLogoutContainer navButton" @click="handleLogout">
          <fa-icon icon="arrow-right-from-bracket" /> <span v-if="size == 'large'">{{ $t('home.logout') }}</span>
        </div>

        <div class="navCreateContainer navButton" @click="toggleModal">
          <fa-icon icon="plus" />  <span v-if="size != 'small'">{{ $t('home.createText') }}</span>
          <teleport to=".modal" v-if="showModal">
            <ModalView @closeModal="toggleModal" type="create" :size="size"/>
          </teleport>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ModalView from '../views/ModalView.vue'
import {ref, mounted, beforeUnmount} from 'vue'

export default {//On click of menu, show category sidebar
  props: ['size'],
  emits: ['loggedIn'],
  components: { ModalView },
  setup() {
    const showModal = ref(false);
    const showSidebar = ref(false);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    }
    const toggleSidebar = () => {
      showSidebar.value = !showSidebar.value;
    }
    return {showModal, toggleModal, showSidebar, toggleSidebar}
  },
  data() {
    return {
      scrollPosition: 0
    }
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    handleLogout() {
      this.$emit('loggedIn', false);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.updateScroll);
  }
}
</script>

<style>
.navContainer {
  position: relative;
    border: 1px solid #e5e5e5;
    float: left;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: #3ca5763d 5px 5px 5px;
    border-radius: 5px;
    background-color: white;
}
.navFixed {
position: fixed;
    top: 0px;
    left:0px;
    z-index: 3;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid lightgray;
    box-shadow: lightgray 5px 5px 5px;
    padding-left:4px;
    border-radius: 0px;
}
.navFixed .navCreateContainer {
  margin-right:15px;
}
.navFixed .navMedium .navCreateContainer {
  margin-right:10px;
}
.navCategoryMenuContainter {
    position: relative;
    float: left;
    width: 105px;
    height:22px;
    padding-top:30px;
    padding-bottom:30px;
    text-align: left;
}
.navSmaller nav, .navMedium nav, .navLarge nav {
    position: relative;
    float: left;
}
.navSmaller nav {
  width: calc(100% - 200px);
}
.navMedium nav {
  width: calc(100% - 426px);
}
.navLarge nav {
  width: calc(100% - 370px);
  text-align:left;
}
.navLarge .navTopRight {
  float: left;
  width: 300px;
  padding-right: 10px;
}
.navSmaller .navCategoryMenuContainter {
  text-align:left;
  width:35px;
  left: 5px;
}
.navSmaller .navCreateContainer {
  width:35px;
}
.navSmaller {/* svg */
  font-size:34px;
}
.navSmaller .fa-house {
    padding-right: 0px !important;
}
.navMedium {/* svg */
  font-size:26px;
}
.navMedium .navCategoryMenuContainter {
  width:170px;
  margin-left: 5px;
} 
.navMedium .navCreateContainer {
  width:135px;
} 
.navFixed .navSmaller .navCreateContainer {
  right:10px;
}
.navFixed .navSmaller .navCategoryMenuContainter {
  left:10px;
}
.navFixed .navMedium .navCreateContainer {
  right:10px;
}
.navFixed .navLarge .navCreateContainer {
  right:10px;
}
.navFixed .navLogoutContainer {
  margin-right:15px;
}
.navCreateContainer {
    position: relative;
    float: left;
    width: 80px;
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: right;
    margin-right: 25px;
}
.navLogoutContainer {
    position: relative;
    float: right;
    /*width: 115px;*/
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: right;
}
.navLarge .navCreateContainer {
  width:100px;
  float:right
}
.navLarge .navlogoutContainer {
    float:right;
}
.navCategoryMenuContainter svg, .navCreateContainer svg, .navLogoutContainer svg {
  margin-right:5px;
}

.navButton {
  user-select: none; 
  cursor: pointer;
}
.navButton:hover {
  transition:100ms;
  color:#42b983;
}
.navButton:active {
  transition:100ms;
  color:#3ca576;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  margin-right: 4px;
  margin-left: 4px;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
  border-radius: 5px;
  padding: 8px 8px 8px 8px;
  background-color: whitesmoke;
}
</style>