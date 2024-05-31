import { ref } from 'vue';

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async (callback, eventEl) => {
      try {
        let data = await fetch('http://localhost:3000/posts')
        if (data.ok) {
          posts.value = await data.json();
          console.log("in load()");
          console.log(posts.value);
          callback(eventEl, posts.value);
        } else {
          throw Error('No posts found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {posts, error, load}
}

export default getPosts