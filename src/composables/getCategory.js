import { ref, reactive } from 'vue';
import cfg from '../../config.js'

const getCategory = (id) => {
    const category = ref({})
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch(cfg.databaseIp + '/categories/' + id)
        if (data.ok) {
            category.value = await data.json();
        } else {
          throw Error('This post not found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {category, error, load}
}

export default getCategory