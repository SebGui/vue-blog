import { ref } from 'vue';
import cfg from '../../../config.js'

const deletePost = (id) => {
    const post = ref(null)
    const error = ref(null)

    const doDelete = async () => {
      try {
        let data = await await fetch(cfg.databaseIp + '/posts/'+id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }/*,
            body: JSON.stringify(updatedPost)*/
        })
        if (data.ok) {
          //post.value = await data.json();
        } else {
          throw Error('This post is not found')
        }
      } catch (err) {
        error.value = err.message
      }
    }
    return {post, error, doDelete}
}

export default deletePost