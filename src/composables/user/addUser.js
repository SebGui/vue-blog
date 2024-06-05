import { ref } from 'vue';
import cfg from '../../../config.js'

const addUser = (userData) => {
    const error = ref(null)
    const status = ref(null)
    let user = {
        id: userData.login,
        password: userData.password,
        token: "",
        lastLoggedIn: "",
        createdAt: new Date().getTime()
    }

    const saveUser = async (callback) => {
        try {
          let data = await fetch(cfg.databaseIp + '/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
          if (data.ok) {
            user.value = await data.json();
            status.value = data.ok;
            //callback(user.value);
          } else {
            throw Error("Couldn't save post")
          }        
        } catch (err) {
          error.value = err.message
        }
      }

      return {status: "ok", error, saveUser}
}

export default addUser