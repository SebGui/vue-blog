<template>
  <div @click="back" class="backLink">
    <fa-icon icon="chevron-left" /> {{ $t('home.backText') }}
  </div>

  <div v-if="post && post.createdBy == $cookies.get('userId')" class="detailPostActions">
    <div class="updateAction" @click="showUpdate = true">
      <fa-icon icon="pen-to-square"/>
      {{ $t('inputs.updatePost') }}
    </div>

    <teleport to=".modal" v-if="showUpdate">
      <ModalView @closeModal="toggleModal" type="update" :post="post" :size="size"/>
    </teleport>

    <div class="deleteAction" @click="showDelete = true">
      <fa-icon icon="trash"/>
      {{ $t('delete.deletePost') }}
    </div>

    <teleport to=".modal" v-if="showDelete">
      <ModalView @closeModal="toggleModal" type="delete" :post="post"/>
    </teleport>
  </div>

  <div v-if="error">{{ error }}</div>

  <div v-if="post" class="post">
    <h1>{{post.title}}</h1>
    <div class="postImage" :style="{ 'background-image': 'url(' + post.image + ')' }"></div>
    <p class="pre">{{post.body}}</p>
  </div>

  <!-- Comments component -->
  <Comments v-if="post" :postId="post.id"/>
</template>
  
  <script>
  import { ref, onMounted } from 'vue'

  import getPost from '../composables/post/getPost'
  import defaultImg from '../assets/NoImage.png'
  import ModalView from '../views/ModalView.vue'
  import Comments from './Comments.vue'
  
  export default {
      props: ['id', 'size'],
      components: {ModalView, Comments},
      setup(props) {
        /* Get current post from id */
        const {post, error, load} = getPost(props.id);
        load();

        /* Conditional redenring refs */
        const showUpdate = ref(false)
        const showDelete = ref(false)

        const toggleModal = () => {
          showUpdate.value = false;
          showDelete.value = false;
        }

        onMounted(() => {
          window.scrollTo(0,0);
        })

        return { post, error, showUpdate, showDelete, toggleModal }
      },
      methods: {
        back() {
          this.$router.go(-1);
        }
      }
  }
  </script>
  
<style>
  /* General detail CSS */
  .backLink {
    text-align:left;
    margin-left: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  .backLink svg {margin-right:10px;}
  .backLink:hover {color:#3ca576;}
  .post {max-width:1200px;margin: 0 auto;}
  .post p {
    position: relative;
    color: #2c3e50;
    line-height: 1.5em;
    margin-top: 40px;
    float: left;
    width: 100%;
  }
  .post h1 {color: #3ca576;}
  .post .postImage {height: 500px;}
  .small .post .postImage {
    position: relative;
    left: 0px;
    margin-left: 0;
    width: 100%;
  }
  .pre {white-space: pre-wrap;}
  .detailPostActions div {
    color:white;
    border-radius: 5px;
    padding: 10px;
    font-weight:bold;
    border:1px solid white;
    cursor: pointer;
    transition:100ms;
  }
  .detailPostActions svg {margin-right:10px;}
  .updateAction {background-color:#3ca576;}
  .deleteAction {background-color:rgb(248, 87, 87);}
  .updateAction:hover {color:#3ca576;background-color:white;border-color:#3ca576}
  .deleteAction:hover {color:rgb(248, 87, 87);background-color:white;border-color:rgb(248, 87, 87)}

  /* Small CSS */
  .small .detailPostActions {
    position:relative;
    float: left;
    width:100%;
    margin-top:15px;
    margin-bottom:10px;
  }
  .small .detailPostActions div {width: 40%;}
  .small .updateAction {float:left;}
  .small .deleteAction {float:right;}

  /* Medium CSS */
  .medium .detailPostActions div {margin-top: 15px;}

  /* Large CSS */
  .large .detailPostActions div {width:200px;}
  .large .detailPostActions {
    position: relative;
    float: right;
    width: 100%;
    margin-bottom: 20px;
  }
  .large .detailPostActions div {float: right;margin-left: 10px;}
</style>