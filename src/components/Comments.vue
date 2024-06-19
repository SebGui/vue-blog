<template>
    <div class="commentsContainer"> <!-- [ToDo] : add comment restriction ? -->
      <h1>{{ $t('comments.commentTitle') }}</h1>

      <template v-if="currentPostComment.length > 0">
        <div v-for="comment in currentPostComment" :key="comment.id">
          <SingleComment :comment="comment" />
        </div>
      </template>
      <template v-else>
          <h5>{{ $t('comments.noCommentsYet') }}</h5>
      </template>

    <!-- Comment Form -->
      <form @submit.prevent="handleForm">
        <textarea type="textarea" required rows="3" cols="10" v-model="body" :placeholder="$t('comments.addAComment')"></textarea>
        <button>{{$t('comments.createComment')}}</button>
      </form>
    </div>
</template>

<script setup>
import {ref, inject} from 'vue'
import idGenerator from '../composables/utils/idGenerator'
import SingleComment from './subcomponents/SingleComment.vue'
import getComments from '../composables/comment/getComments.js'
import addComment from '../composables/comment/addComment.js'

/* Props definition */
const props = defineProps({
  postId: String
})

/* Rendering refs */
const currentPostComment = ref([]);
const body = ref("")

/* Cookie object */
const $cookies = inject('$cookies');

/* Get comments related to this article */
const getCurrentComments = (comments) => {
    currentPostComment.value = comments.value.filter((item) => {
        return item.postId == props.postId
    })
}

/* Get Comments */
const {comments, error, load} = getComments();
load((commentList) => getCurrentComments(commentList));

/* Add comment handling */
const handleForm = () => {
    const tempComment = {
        id: idGenerator(8),
        postId: props.postId,
        body: body.value,
        createdAt: new Date().getTime(),
        createdBy: $cookies.get('userId')
    }
    console.log(tempComment);

    const {status, error, saveComment} = addComment(tempComment);
    saveComment();
    currentPostComment.value.unshift(tempComment);

    // Reset form
    body.value = "";
}

//Make refresh comment list

</script>

<style>
.commentsContainer {
    position: relative;
    float: left;
    width: calc(100% - 40px);
    text-align: left;
    padding: 20px;
    margin-top: 20px;
}
.commentsContainer textarea {
    width: 100%;
    max-width: 100%;
    float: left;
    margin: 0px 0px 20px 0px;
    padding: 0;
}
.commentsContainer button {
    float: left;
    position: relative;
    padding: 8px 25px 7px 25px;
    border-radius: 5px;
    background-color: #3ca576;
    color: white;
    border: 1px solid white;
    transition: 100ms;
    cursor: pointer;
}
.commentsContainer button:hover {
    background-color: white;
    color: #3ca576;
    border: 1px solid #3ca576;
}
.commentsContainer button:active {
    background-color: #3ca576;
    color: white;
    border: 1px solid white;
}
.commentsContainer form {
    margin-top:40px;
}
.commentsContainer h1 {
    margin-bottom:40px;
}

.commentsContainer div:nth-child(odd) .singleComment {
  background: white;
}

.commentsContainer div:nth-child(even) .singleComment {
  background: rgb(249 249 249);
}
</style>