import { ref } from 'vue';

const getCategories = () => {
    const categories = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/categories')
        if (data.ok) {
            categories.value = await data.json();
        } else {
          throw Error('No categories found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    console.log(categories);
    return {categories, error, load}
}

export default getCategories