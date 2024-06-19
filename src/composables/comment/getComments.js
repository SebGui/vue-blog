import { ref } from 'vue';
import cfg from '../../../config.js'

const getComments = () => {
    const comments = ref([])
    const error = ref(null)

    const load = async (callback) => {
      try {
        let data = await fetch(cfg.databaseIp + '/comments')
        if (data.ok) {
            comments.value = await data.json();
            comments.value = comments.value.reverse()
            callback(comments);
        } else {
          throw Error('No comments found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {comments, error, load}
}

export default getComments