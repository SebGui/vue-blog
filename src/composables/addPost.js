import { ref } from 'vue';

const addPost = (postData) => {
    const error = ref(null)
    const status = ref(null)
    let post = {
        id: idGenerator.makeId(),/*generate id*/
        title: postData.title,//post.title,
        body: postData.body,//post.body,
        tags: postData.tags//post.tags,
    }

    console.log(post);

    const savePost = async () => {
        try {
          let data = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            })
          if (data.ok) {
            post.value = await data.json();
            status.value = data.ok;
          } else {
            throw Error("Couldn't save post")
          }        
        } catch (err) {
          error.value = err.message
        }
      }

      return {status: "ok", error, savePost}


    /*const post = ref(null)
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3000/posts/' + id)
        if (data.ok) {
          post.value = await data.json();
        } else {
          throw Error('This post not found')
        }        
      } catch (err) {
        error.value = err.message
      }
    }
    return {post, error, load}*/
}

const idGenerator = {
    makeId : () => {
      let result = "";
      const allowedChars = "ABCDEFGHIJKLMNOPKRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charListLength = allowedChars.length;
      for (let i = 0;i < 6;++i) {
        result += allowedChars.charAt(Math.floor(Math.random() * charListLength))
      }
      return result;
    }
  }

export default addPost