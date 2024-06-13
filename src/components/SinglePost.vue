<template>
    <div class="singlePost" @mouseover.stop="showAction = true" @mouseleave="showAction = false">
        <div v-if="post.createdBy == $cookies.get('userId')" class="postActions" v-show="showAction">
            <fa-icon icon="pen-to-square" @click="showUpdate = true"/>
            <teleport to=".modal" v-if="showUpdate">
              <ModalView @closeModal="toggleUpdateModal" type="update" :post="post" :size="size"/>
            </teleport>

            <fa-icon icon="trash" @click="showDelete = true"/>
            <teleport to=".modal" v-if="showDelete">
              <ModalView @closeModal="toggleDeleteModal" type="delete" :post="post"/>
            </teleport>
        </div>

        <router-link :to="{name: 'Details', params: {id: post.id, size: size}}">
            <div class="postImage" :style="{ 'background-image': 'url(' + image + ')' }"></div>

            <div class="postInfo">
                <h4 v-if="category.categoryName != null">{{category.categoryName[$i18n.locale]}}</h4>
                <h3>{{post.title}}</h3>
                <span>{{post.body}}</span><br/>
            </div>
        </router-link>
    </div>
</template>
  
  <script>
  import { ref } from 'vue'
  import deletePost from '../composables/post/deletePost'
  import getCategory from '../composables/category/getCategory'
  import ModalView from '../views/ModalView.vue'
  import defaultImg from '../assets/NoImage.png'
  
  export default {
      props: ['post', 'size'],
      components: {ModalView},
      setup(props) {
        /* Conditional rendering refs */
        const showAction = ref(false)
        const showUpdate = ref(false)
        const showDelete = ref(false)

        /* Initializing image (cases where there wasn't default image) */
        const image = (props.post.image === undefined) ? defaultImg : props.post.image;

        /* Initializing category (cases where it didn't exist) */
        const catId = (props.post.category === undefined) ? 1 : props.post.category;

        /* Initializing categories */
        const {category, error, load} = getCategory(catId);
        load();

        /* Delete post logic */
        const deleteMyPost = (e, id) => {
            const {post, error, doDelete} = deletePost(id);
  
            doDelete();

            const event = new Event('refreshPosts');
            document.dispatchEvent(event)
            e.stopPropagation();
        }
        const toggleUpdateModal = () => {
            showUpdate.value = false;
        }
        const toggleDeleteModal = () => {
            showDelete.value = false;
        }

        return {
            image, showAction, showUpdate, category, showDelete,
            deleteMyPost, toggleDeleteModal, toggleUpdateModal
        }
      }
  }
  </script>
  
  <style>
    /* Single post CSS */
   .singlePost {
    border: 1px solid lightgray;
    box-shadow: darkgray 5px 5px 5px;
    border-radius: 5px;
    background-color: #3ca5761c;
    transition:100ms;
   }
   .singlePost:hover {
    cursor:pointer;
    transition:100ms;
    background-color:rgb(250, 250, 250);
    box-shadow: #3ca576 5px 5px 5px;
   }
   .singlePost:active {background-color:#3ca576a3;box-shadow: rgb(250, 250, 250) 5px 5px 5px;}
   .postInfo h3 {-webkit-line-clamp: 1;color: #656464;}
   .postInfo span, h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
   }
   .postInfo {float: left;width: 100%;}
   .postInfo a {text-decoration: none;}
   .postInfo span {color:#2c3e50c4;}
   .postInfo h3 {color:#2c3e50;}
   .postInfo h4 {color:#3ca576;}
   .postSubInfo {display: inline-flex;}
   .postImage {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
   }
   .postActions {
    position:absolute;
    float:right;
    right:0px;
    background-color:#3ca57673;
    border-top-right-radius: 5px;
    height:25px;
    font-size:20px;
    padding:3px 10px;
    z-index:2;
   }
   .postActions svg {margin: 0px 5px;transition:100ms;}
   .postActions .fa-pen-to-square:hover  {color:rgb(0, 197, 0);}
   .postActions .fa-trash:hover  {color:rgb(168, 18, 18);}

   /* Small screens */
   .small .singlePost {
    position:relative;
    width: calc(100% - 10px);
    float:left;
    margin:5px;
   }
   .small .postImage{
    position: relative;
    width: 150px;
    height: 150px;
    margin: 20px;
    float: left;
   }
   .small .postInfo {
    position: relative;
    float: left;
    width: calc(100% - 200px);
    text-align: left;
    margin-top: 15px;
    line-height: 25px;
    padding-right: 10px;
   }
   .small .postInfo span, h3 {
    -webkit-line-clamp: 2;
   }
    /* Medium screen */
   .medium .singlePost {
    position: relative;
    width: calc((100% - 5%) / 2);
    float: left;
    margin: 1%;
   }

   .medium .postImage, .large .postImage{
    position: relative;
    width: 98%;
    height: 300px;
    margin: 1%;
    float: left;
    border-radius:5px;
    margin-bottom: 10px;
   }

   .medium .postInfo span,.medium .postInfo h3 {
    -webkit-line-clamp: 3;
    padding-left: 10px;
    padding-right: 12px;
   }

   .medium .postInfo h4 {margin-bottom: -5px;}

    /* Large Screens */
   .large .singlePost {
    position: relative;
    width: calc((100% - 7%) / 3);/* -200px/3 (category bar divided by 3) */
    float: left;
    margin: 0% 1% 2% 1%;
    min-height: 540px; /* Fix with masonry?*/
    max-width: 400px;
   }
    .large .postInfo span,.large .postInfo h3 {
    -webkit-line-clamp: 4;
    padding-left: 10px;
    padding-right: 12px;
   }
  </style>