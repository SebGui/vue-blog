import { ref } from 'vue';
import cfg from '../../../config.js'

const updatePost = (updatedPost) => {
    const post = ref(null)
    const error = ref(null)

    const update = async () => {
      try {
        let data = await fetch(cfg.databaseIp + '/posts/'+updatedPost.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost)
        })
        if (data.ok) {
          //post.value = await data.json();
        } else {
          throw Error('This post not found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {post, error, update}
}

export default updatePost