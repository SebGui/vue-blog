import { ref } from 'vue';
import cfg from '../../../config.js'

const getCategories = () => {
    const categories = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch(cfg.databaseIp + '/categories')
        if (data.ok) {
            categories.value = await data.json();
        } else {
          throw Error('No categories found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {categories, error, load}
}

export default getCategories