<template>
  <h1 v-if="!showCreated">{{ $t('inputs.createPostTitle') }}</h1>
  <form @submit.prevent="handleForm" v-if="showForm" class="createFrom">
    <div class="titleContainter">
        <input type="text" required autofocus v-model="title" :placeholder="$t('inputs.enterTitle')">
    </div>

    <div class="categoryContainer">
        <select v-model="category">
            <option value="" class="defaultOption" selected disabled hidden>{{ $t('inputs.enterCategory') }}</option>
            <template v-for="currentCategory in categories" :key="currentCategory.id">
                <option v-if="currentCategory.id != 0" :value="currentCategory.id">{{ currentCategory.categoryName[$i18n.locale] }}</option>
            </template>
        </select>
    </div>

    <div class="bodyContainer">
        <textarea type="textarea" required rows="1" cols="10" v-model="body" :placeholder="$t('inputs.enterBody')"></textarea>
    </div>

    <div class="imageContainer">
        <label for="create-file-upload" class="uploadFile" :class="{imageUploaded:imageUploaded}">
            {{ uploadText }}
        </label>
        <input type="file" id="create-file-upload" @change="fileUpdate">
    </div>
  
    <div class="submit">
        <button @click="postCreated">{{$t('inputs.createPost')}}</button>
    </div>
  </form>

  <div class="postCreatedContainer" v-if="showCreated">
    <fa-icon icon="check" class="iconFormSuccess"/>
    <span>{{$t('inputs.postCreated')}}</span>
  </div>

  <!-- Cancel button for Phone view-->
  <div v-if="size == 'small'" class="cancelModal">
    <button @click="cancelView">{{$t('inputs.cancelButtonText')}}</button>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'

import addPost from '../composables/post/addPost'
import getCategories from '../composables/category/getCategories'
import noImage from '../assets/NoImage.png'

export default {
    props:  ['size'],
    emits: ["postCreated"],
    setup(props, ctx) {
        /* Load categories*/
        const {categories, error, load} = getCategories()
        load();

        /* Translation and Cookie */
        const {t} = useI18n();
        const $cookies = inject('$cookies');

        /* Post value refs */
        const title = ref('');
        const body = ref('');
        const image = ref('');
        const category = ref('');

        /* Conditionnal rendering refs */
        const showForm = ref(true);
        const showCreated = ref(false);
        const imageUploaded = ref(false);
        const uploadText = ref(t('inputs.imageLabelText'));

        /* Create post callback */
        const handleForm = () => {
            const tempPost = {
              title: title.value,
              body: body.value,
              image: (image.value == '') ? noImage :  image.value,
              category: category.value,
              createdBy: $cookies.get('userId'),
              createdAt: new Date().getTime()
            }

            const {status, error2, savePost} = addPost(tempPost);
            savePost();

            //Make composable?
            const event = new Event('refreshPosts');
            event.data = tempPost;
            document.dispatchEvent(event)

            showCreated.value = true;
            showForm.value = false;

            setTimeout(() => resetView(), 3000);
        }

        /* view reseters */
        const cancelView = () => {
            ctx.emit('postCreated', false)
        }
        const resetView = () => {
            ctx.emit('postCreated', true)
            showCreated.value = false;
            showForm.value = true;
        }

        /* Image upload */
        const fileUpdate = (e) => {
            const name = e.target.name,
                  file = e.target.files[0]

            const reader = new FileReader();
            reader.addEventListener('load', () => image.value = reader.result);
            if (typeof file == 'object') {
                reader.readAsDataURL(file);
                uploadText.value = t('inputs.imageUploadSuccessText').replace('$name', file.name);
                imageUploaded.value = true;
            }
        }

        return {
            categories, error, title, body, image, category, showForm, showCreated, imageUploaded, uploadText,
            handleForm, cancelView, resetView, fileUpdate
        }
    }
}
</script>

<style>
/* General form CSS */
h1 {color:#3ca576;}
input, textarea {border: none;border-bottom: 1px solid gray;}
input:active, input:focus, textarea:active, textarea:focus {border-color:#3ca576;}
input:focus-visible, textarea:focus-visible {outline:none;}
select {border-radius: 5px;padding: 5px;color: #797979;outline-color: #3ca576;}
textarea {max-width:80%;font-family: Avenir, Helvetica, Arial, sans-serif;}
.createForm div {height: 70px;}
.imageContainer {
    padding-left: 56px;
    position: relative;
    top: 15px;
    font-size: 14px;
    float: left;
    width: 82%;
    text-align: left;
    height: 35px;
    margin-bottom: 35px;
}
.categoryContainer{    text-align: left;padding-left: 56px;margin-top: 10px;}
.submit button{
    padding: 7px 30px;
    border: 1px solid #3ca576;
    background-color: #3ca576;
    border-radius: 5px;
    color: white;
    transition: 100ms;
    cursor:pointer;
}
.submit button:hover {background-color: white;color: #3ca576;}
.submit button:active {background-color: #3ca576;color: white;}
.iconFormSuccess {font-size:30px;}
.defaultOption {color:#838383 !important}
input[type="file"] {display: none;}
.uploadFile {
    border: 1px solid #3ca576;
    border-radius:5px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: white;
    color: #3ca576;
}
.uploadFile:active {background-color: white;color: #3ca576;}
.uploadFile:hover {background-color: #3ca576;color: white;}
.imageUploaded {border-color:#00af00;color:#00af00;}
.postCreatedContainer {
    position: relative;
    display: block;
    height: 50px;
    color: #3ca576;
    font-size: 30px;
    padding: 10px;
}
.postCreatedContainer svg {font-size: 40px;margin-right: 15px;}
.cancelModal {position: fixed;bottom: 0px;width: 100%;}
.cancelModal button {
    width: 80%;
    position: relative;
    bottom: 20px;
    background-color: #ff4545;
    color: white;
    border: 1px solid white;
    padding: 10px;
    border-radius: 5px;
    font-size: 20px;
    cursor:pointer;
}

/* Large & Medium CSS */
.large input, .large textarea, .medium input, .medium textarea {
    width: 80%;
    padding: 5px;
    margin: 20px;
}

/* Small CSS */
.small input, .small textarea {
    width: 88%;
    padding: 5px;
    margin: 20px;
}
.small .categoryContainer, .small .imageContainer {
    padding-left:20px;
}
.small .submit button{
    font-size: 20px;
    width:80%;
    margin-top:20px;
}
.small textarea {
    max-width:88%;
}
</style>