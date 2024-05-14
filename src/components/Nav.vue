<template>
 <div class="navContainer" :class="{navFixed: scrollPosition > 100}">
    <!-- Small version -->
    <div class="navSmaller" v-if="size == 'small'">
      <div class="navCategoryMenuContainter navButton">
        <fa-icon icon="bars" />
      </div> <!-- teleport here for small/medium -->
      <nav>
        <router-link to="/"><fa-icon icon="house" /></router-link> |
        <router-link to="/about"><fa-icon icon="circle-info" /></router-link>
      </nav>
      <div class="navCreateContainer navButton">
        <fa-icon icon="plus" />
      </div>
    </div>

    <!-- Medium version -->
    <div class="navMedium" v-if="size == 'medium'">
      <div class="navCategoryMenuContainter navButton">
        <fa-icon icon="bars" /> {{ $t('home.categoryMenuText') }}
      </div> <!-- teleport here for small/medium -->
      <nav>
        <router-link to="/"><fa-icon icon="house" /> {{ $t('home.homeText') }}</router-link> |
        <router-link to="/about"><fa-icon icon="circle-info" /> {{ $t('home.aboutText') }}</router-link>
      </nav>
      <div class="navCreateContainer navButton">
        <fa-icon icon="plus" />  {{ $t('home.createText') }}
      </div>
    </div>

    <!-- Large Version -->
    <div class="navLarge" v-if="size == 'large'">
      <nav>
        <router-link to="/"><fa-icon icon="house" /> {{ $t('home.homeText') }}</router-link> |
        <router-link to="/about"><fa-icon icon="circle-info" /> {{ $t('home.aboutText') }}</router-link>
      </nav>
      <div class="navCreateContainer navButton">
        <fa-icon icon="plus" /> {{ $t('home.createText') }}
      </div>
    </div>
  </div>

  <!--<nav v-if="size == 'large'">
    <router-link to="/"><fa-icon icon="house" /> {{ $t('home.homeText') }}</router-link> |
    <router-link to="/about"><fa-icon icon="circle-info" /> {{ $t('home.aboutText') }}</router-link>
  </nav>-->
</template>

<script>
import {mounted, beforeUnmount} from 'vue'

export default {//On click of menu, show category sidebar
  props: ['size'],
  data() {
    return {
      scrollPosition: 0
    }
  },
  methods: {
    updateScroll() {
      //console.log(window.scrollY);
      this.scrollPosition = window.scrollY
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
.navFixed {
position: fixed;
    top: 0px;
    left:0px;
    z-index: 1;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid lightgray;
    box-shadow: lightgray 5px 5px 5px;
    padding-left:4px;
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
  width: calc(100% - 130px);
}
.navMedium nav {
  width: calc(100% - 360px);
}
.navLarge nav {
  width: calc(100% - 160px);
  text-align:left;
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
.navMedium {/* svg */
  font-size:26px;
}
.navMedium .navCategoryMenuContainter {
  width:165px;
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
.navCreateContainer {
    position: relative;
    float: right;
    width: 100px;
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: right;
}
/*.navLarge .navCreateContainer {
    float:left;
}*/
.navCategoryMenuContainter svg, .navCreateContainer svg {
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
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
  background-color:rgb(247, 247, 247);
}
</style>