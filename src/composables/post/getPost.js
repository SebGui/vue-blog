import { ref } from 'vue';
import cfg from '../../../config.js'

const getPost = (id) => {
    const post = ref(null)
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch(cfg.databaseIp + '/posts/' + id)
        if (data.ok) {
          post.value = await data.json();
        } else {
          throw Error('This post not found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {post, error, load}
}

export default getPost