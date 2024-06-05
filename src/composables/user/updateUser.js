import { ref } from 'vue';
import cfg from '../../../config.js'

const updateUser = (updatedUser) => {
    const user = ref(null)
    const error = ref(null)

    const update = async () => {
      try {
        let data = await fetch(cfg.databaseIp + '/users/'+updatedUser.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
        if (data.ok) {
            user.value = await data.json();
        } else {
          throw Error('This post not found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {user, error, update}
}

export default updateUser