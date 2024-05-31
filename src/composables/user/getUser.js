import { ref } from 'vue';

const getUser = (id) => {
    const user = ref(null)
    const error = ref(null)

    const load = async (callback, type) => {
      try {
        let data = await fetch('http://localhost:3000/users/' + id)
        if (data.ok) {
          user.value = await data.json();
            callback(user.value);
        } else {
            callback();
          //throw Error('This user was not found')
        }        
      } catch (err) {
        if (type === "create") {
            callback();
        }
        error.value = err.message
      }
    }
    return {user, error, load}
}

export default getUser