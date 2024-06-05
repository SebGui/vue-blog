import { ref } from 'vue';
import cfg from '../../../config.js'

const getUser = (id) => {
    const user = ref(null)
    const error = ref(null)

    const load = async (callback, type) => {
      try {
        let data = await fetch(cfg.databaseIp + '/users/' + id)//'http://localhost:3000/users/'
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