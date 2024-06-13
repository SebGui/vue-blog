<template>
    <!-- Delete confirmation -->
    <div class="deleteContainer" v-if="!deletionConfirmed">
        <h1>{{deleteTitle}}?</h1>

        <div class="deleteButtonsContainer">
            <div @click="resetView" class="cancelConfirm">{{ $t('delete.cancelText') }}</div>
            <div @click="deleteMyPost($event, post.id)" class="deleteConfirm">{{ $t('delete.deleteConfirm') }}</div>
        </div>
    </div>

  <!-- DeleteDone confirmation -->
  <div class="deletionConfirmed" v-if="deletionConfirmed">
      <fa-icon icon="check" class="iconFormSuccess"/>
      <span>{{deletionText}}</span>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import deletePost from '../composables/post/deletePost'

export default {
    props : ['post'],
    emits: ["hideDelete"],
    setup(props, ctx) {
        /* Translation object */
        const {t} = useI18n();

        /* Refs for text to be shown */
        const deleteTitle =  ref("");
        const deletionText =  ref("");

        /* Conditionnal rendering value */
        const deletionConfirmed = ref(false);

        const deleteMyPost = (e, id) => {
            const {post, error, doDelete} = deletePost(id);
  
            doDelete();

            deletionConfirmed.value = true;
            e.stopPropagation();

            setTimeout(() => resetView(), 3000);
        }
        const resetView = () => {
            const event = new Event('refreshPosts');
            document.dispatchEvent(event);
            
            ctx.emit('hideDelete', true);

            deletionConfirmed.value = false;
        }

        onMounted(() => {
            deleteTitle.value = t('delete.deleteTitle').replace('$title', props.post.title)
            deletionText.value = t('delete.deletionSuccess').replace('$title', props.post.title)
        })

        return {
            deleteTitle, deletionText, deletionConfirmed,
            deleteMyPost, resetView
        }
    }
}
</script>

<style>
/* General Delete CSS */
.deleteContainer {height: 90px;}
.deleteButtonsContainer {position: relative;float: right;}
.deleteButtonsContainer div {float:left;margin:10px;left: 15px;}
.cancelConfirm {color: gray;cursor:pointer;transition:100ms;}
.cancelConfirm:hover {color: #3ca576;}
.cancelConfirm:active {color: #225e43;}
.deleteConfirm {
    border: 1px solid #ed5f5f;
    background-color: #ed5f5f;
    padding: 5px 15px;
    border-radius: 5px;
    color: white;
    position: relative;
    bottom: 5px;
    transition:100ms;
    cursor: pointer;
}
.deleteConfirm:hover {background-color:white;color: #ed5f5f;}
.deleteConfirm:active {color:white;background-color: #ed5f5f;}
.deletionConfirmed {color: #00af00;}
.deletionConfirmed svg {font-size: 40px;margin-right: 10px;}
.deletionConfirmed span {font-size: 20px;position: relative;bottom: 5px;}

/* Small CSS */
.small .deleteContainer {margin-top:200px;}
.small .deleteButtonsContainer {
    position: relative;
    float: left;
    width: 101%;
    display: flex;
    flex-wrap: wrap;
    position: fixed !important;
    bottom: 30px;
}
.small .deleteButtonsContainer div {
    position: relative;
    float: left;
    width: calc(100vw - 40px);
    left: 0;
    margin-left: 1%;
}
.small .cancelConfirm {padding-left: 15px;order:2;}
</style>