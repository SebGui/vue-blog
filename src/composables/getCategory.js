import { ref, reactive } from 'vue';

const getCategory = (id) => {
    const category = ref({})
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/categories/' + id)
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