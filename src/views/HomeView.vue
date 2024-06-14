<template>
  <div v-if="postError">{{ postError }}</div>

  <div v-if="shownPosts.length == 0">
    <PostsList v-if="posts.length > 0" :posts="posts" :size="size"/>
  </div>
  <div v-else-if="shownPosts.length > 0">
    <PostsList v-if="shownPosts.length > 0" :posts="shownPosts" :size="size"/>
  </div>

  <div v-else>Loading data....</div><!-- No post view -->
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

import getPosts from '../composables/post/getPosts'
import PostsList from '../components/PostsList.vue'

export default {
  name: 'HomeView',
  props: ['size'],
  components: { PostsList },
  setup() {
    /* Initializing posts variables */
    const shownPosts = ref([]);
    const posts = ref([]);
    const lastFilterEvent = ref(null);
    const postError = ref(null);

    /* Initiation function onMounted, getPosts and set filter events */
    const init = () => {
      getPostList();

      document.addEventListener('refreshPosts', function(e){
        getPostList();
      }, false);

      document.addEventListener('filterPosts', (id) => filterPosts(id), false);
    }

    /* Get posts */
    const getPostList = () => {
      const {newPosts, error, load} = getPosts();
      postError.value = error.value;
      load((el, val) => filterPosts(el, val), lastFilterEvent.value);
    }

    /* Filter posts, gets category id in event object to filter */
    const filterPosts = (event, newPostList) => {
      if (event == null || undefined) {
        if (/*posts.value.length == 0 && */newPostList.length != 0) {posts.value = newPostList}
        return;
      }
      if (event.data == 0) {shownPosts.value = posts.value;}//Show all
      if (newPostList != undefined) {posts.value = newPostList;}

      lastFilterEvent.value = event;
      const id = event.data
      shownPosts.value = posts.value.filter((item) => {
        if (item.category != undefined) {
          return item.category == id
        } else {
          return false
        }
      });
      window.scrollTo(0,0);
    }

    /* Lifecycle hooks */
    onMounted(() => {
      init();
    })

    onUnmounted(() => {
      window.removeEventListener('refreshPosts', () => {});
      window.removeEventListener('filterPosts', () => {});
    })

    return {shownPosts, posts, postError}
  }
}
</script>

<style></style>
