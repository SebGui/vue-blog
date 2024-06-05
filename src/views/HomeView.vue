<template>
  <!--{{ posts }} make view for post -->
  <div v-if="error">{{ error }}</div>

    <div v-if="shownPosts.length == 0">
      <PostsList v-if="posts.length > 0" :posts="posts" :size="size"/>
    </div>
    <div v-else-if="shownPosts.length > 0">
      <PostsList v-if="shownPosts.length > 0" :posts="shownPosts" :size="size"/>
    </div>

    <div v-else>Loading data....</div><!-- No post view -->
</template>

<script>
import getPosts from '../composables/getPosts'
import PostsList from '../components/PostsList.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'HomeView',
  props: ['size'],
  components: { PostsList },
  setup() {
    /*let {posts, error, load} = getPosts();
    load();

    document.addEventListener('refreshPosts', function(e){
      console.log("BEFORE GET POST");
      posts = getPosts().posts
      load();
      //shownPosts = ref(posts.value)
       // e.target matches the elem from above
    }, false);*/


    /*let myFilter = (event) => {
      const id = event.data
      shownPosts.value = posts.value.filter((item) => {
        if (item.category != undefined) {
          return item.category == id
        } else {
          return false
        }
      });
    }
    

    document.addEventListener('filterPosts', (id) => myFilter(id), false);*/


    /*onMounted(() => {
      console.log(posts);
      test(posts)
    })

    return { posts, error}*/
  },
  data() {
    return {
      shownPosts: [],
      posts: ref([]),
      lastFilterEvent: null
    }
  },
  methods: {
    getPostList() {
      let {posts, error, load} = getPosts();
      load((el, val) => this.myFilter(el, val), this.lastFilterEvent);
      this.posts = posts;

      console.log("getPostList() :");
      console.log(this.posts);
    },
    init() {
      let that = this;
      this.getPostList();

      document.addEventListener('refreshPosts', function(e){
        console.log("BEFORE GET POST");

        that.getPostList();
      }, false);
      document.addEventListener('filterPosts', (id) => this.myFilter(id), false);
    },
    myFilter(event, newPostList) {
      if (event == null || undefined) {return;}
      if (event.data == 0) {this.shownPosts = this.posts;}//Show all
      if (newPostList != undefined) {this.posts = newPostList;}
      this.lastFilterEvent = event;
      const id = event.data
      this.shownPosts = this.posts.filter((item) => {
        if (item.category != undefined) {
          return item.category == id
        } else {
          return false
        }
      });
      window.scrollTo(0,0);
    }
  },
  mounted() {
    this.init();
  },
  updated() {
    //Check token, emit loggedIn false is not existant
    //Or set interval of ~1 mins to check on token continuously? or based on activity?
    console.log("updated");
  },
  beforeUnmount() {
    document.removeEventListener('postCreated', function(e){
      console.log("Event triggereed");
      load();
       // e.target matches the elem from above
    }, false);
  }
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
