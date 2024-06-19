import { ref } from 'vue';
import cfg from '../../../config.js'

const addComment = (commentData) => {
    const error = ref(null)
    const status = ref(null)
    let comment = {
        id: commentData.id,/*generate id*/
        postId: commentData.postId,//post.title,
        body: commentData.body,//post.body,
        createdAt: commentData.createdAt,
        createdBy: commentData.createdBy
    }

    const saveComment = async () => {
        try {
          let data = await fetch(cfg.databaseIp + '/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            })
          if (data.ok) {
            comment.value = await data.json();
            status.value = data.ok;
          } else {
            throw Error("Couldn't save comment")
          }        
        } catch (err) {
          error.value = err.message
        }
      }

      return {status: "ok", error, saveComment}
}
export default addComment