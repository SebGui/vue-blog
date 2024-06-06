<template>
    <div @click="back" class="backLink">
      <fa-icon icon="chevron-left" /> {{ $t('home.backText') }}
    </div>
  
    <!-- Make edit buttons -->
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
      <div class="postImage" :style="{ 'background-image': 'url(' + image + ')' }"></div>
      <p class="pre">{{post.body}}</p>
      <!--<span v-for="tag in post.tags" :key="tag">#{{ tag }} </span> -->
    </div>

  </template>
  
  <script>
  import {ref} from 'vue'
  import getPost from '../composables/post/getPost'
  import defaultImg from '../assets/NoImage.png'
  import ModalView from '../views/ModalView.vue'
  
  export default {
      props: ['id', 'size'],
      components: {ModalView},
      setup(props) {
          const {post, error, load} = getPost(props.id);
          load();

          const image = (post.image === undefined) ? defaultImg : post.image;
          const showUpdate = ref(false)
          const showDelete = ref(false)

          const toggleModal = () => {
            showUpdate.value = false;
            showDelete.value = false;
          }
  
          return { post, error, image, showUpdate, showDelete, toggleModal }
      },
      methods: {
        back() {
          this.$router.go(-1);
        }
      },
      mounted() {
        window.scrollTo(0,0);
      }
  }
  </script>
  
  <style>
  .backLink {
    text-align:left;
    margin-left: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  .backLink svg {
    margin-right:10px;
  }
  .backLink:hover {
    color:#3ca576;
  }
    .post {
      max-width:1200px;
      margin: 0 auto;
    }
    .post p {
      position: relative;
      color: #2c3e50;
      line-height: 1.5em;
      margin-top: 40px;
      float: left;
      width: 100%;
    }
    .post h1 {
      color: #3ca576;
    }
    .post .postImage {
      height: 500px;
    }
    .small .post .postImage {
      position: relative;
      left: 0px;
      margin-left: 0;
      width: 100%;
    }
    .pre {
      white-space: pre-wrap;
    }
    .small .detailPostActions {
      position:relative;
      float: left;
      width:100%;
      margin-top:15px;
      margin-bottom:10px;
    }
    .small .detailPostActions div {
      width: 40%;
    }
    .small .updateAction {float:left;}
    .small .deleteAction {float:right;}

    .medium .detailPostActions div {
      margin-top: 15px;
    }

    .large .detailPostActions div {
      width:200px;
    }
    .large .detailPostActions {
      position: relative;
      float: right;
      width: 100%;
      margin-bottom: 20px;
    }
    .large .detailPostActions div {float: right;margin-left: 10px;}

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
  </style>