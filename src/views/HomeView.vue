<template>
  <!--<div class="home">
    <p>Ceci est un test</p>
    {{ $t('user.data.mail') }}
  </div>-->

  <!--{{ posts }} make view for post -->
  <div v-if="error">{{ error }}</div>

    <PostsList v-if="posts.length > 0" :posts="posts" :size="size"/>
    <div v-else>Loading data....</div>
</template>

<script>
import getPosts from '../composables/getPosts'
import PostsList from '../components/PostsList.vue'

export default {
  name: 'HomeView',
  props: ['size'],
  components: { PostsList },
  setup() {
    const {posts, error, load} = getPosts()

    load();

    return { posts, error }
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style>
  .responsiveTest {
    display:flex;
    position: relative;
    width: 50%;
    height: 200px;
    margin: auto;
    background-color:red;
  }
  .responsiveTest.small {
    background-color:green;
  }
  .small {
    /*background-color:green;*/
  }
</style>
