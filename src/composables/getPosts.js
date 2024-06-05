import { ref } from 'vue';
import cfg from '../../config.js'

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async (callback, eventEl) => {
      try {
        let data = await fetch(cfg.databaseIp + '/posts')
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