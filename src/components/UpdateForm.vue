<template>
  <h1 v-if="!showCreated">{{this.updateTitleText}}</h1>
  <form @submit.prevent="handleForm" v-if="showForm" class="createFrom">
    <div class="titleContainter">
      <input type="text" required autofocus v-model="title">
    </div>

    <div class="categoryContainer">
      <select v-if="post.category" v-model="post.category">
        <template v-for="currentCategory in categories" :key="currentCategory.id">
          <option v-if="currentCategory.id != 0" :value="currentCategory.id">{{ currentCategory.categoryName[$i18n.locale] }}</option>
        </template>
      </select>
    </div>

    <div class="bodyContainer">
      <textarea type="textarea" required rows="1" cols="10" v-model="body"></textarea>
    </div>

    <div class="imageContainer">
      <label for="create-file-upload" class="uploadFile" :class="{imageUploaded:imageUploaded}" ref="uploadText">
        {{$t('inputs.imageLabelText')}}
      </label>
      <input type="file" id="create-file-upload" @change="fileUpdate">
    </div>
  
    <div class="submit">
      <button @click="postCreated">{{$t('inputs.updatePost')}}</button>
    </div>
  </form>

  <div class="postCreatedContainer" v-if="showCreated">
    <fa-icon icon="check" class="iconFormSuccess"/>
    <span>{{$t('inputs.postUpdated')}}</span>
  </div>

  <div v-if="size == 'small'" class="cancelModal">
    <button @click="cancelView">{{$t('inputs.cancelButtonText')}}</button>
  </div>
</template>
  
  <script>
  import { useI18n } from 'vue-i18n'
  import { ref, onMounted } from 'vue'

  import updatePost from '../composables/post/updatePost'
  import getCategories from '../composables/category/getCategories'
  
  export default {
      props:  ['size', 'post'],
      emits: ["postUpdated"],
      setup(props, ctx) {
        /* Translations object */
        const {t} = useI18n();

        /* Initialize categories */
        const {categories, error, load} = getCategories();
        load();

        /* Clearer access to current post to update */
        const currentPost = props.post;

        /* Post refs */
        const id = currentPost.id;
        const title = ref(currentPost.title);
        const body = ref(currentPost.body);
        const image = ref(currentPost.image);
        const category = ref(currentPost.category);

        /* Conditional rendering value */
        const showForm = ref(true);
        const showCreated = ref(false);
        const imageUploaded = ref(false);
        const updateTitleText = ref("");

        /* Update handeling */
        const handleForm = () => {
          const tempPost = {
                id: id,
                title: title.value,
                body: body.value,
                image: image.value,
                category: category.value,
                updatedAt: new Date().getTime()
          }

          const {status, error2, update} = updatePost(tempPost);
          update();

          // Create composable?
          const event = new Event('refreshPosts');
          event.data = tempPost;
          document.dispatchEvent(event)

          showCreated.value = true;
          showForm.value = false;

          setTimeout(() => resetView(), 3000);
        }

        const cancelView = () => {
          ctx.emit('postUpdated', false)
        }

        const resetView = () => {
          ctx.emit('postUpdated', true)
          showCreated.value = false;
          showForm.value = true;
        }

        /* Image update */
        const fileUpdate = (e) => {
          const name = e.target.name,
                file = e.target.files[0]
          const reader = new FileReader();
          reader.addEventListener('load', () => image.value = reader.result);
          reader.readAsDataURL(file);
        }

        /* Lifecycle hook */
        onMounted(() => {
          updateTitleText.value = t('inputs.updateTitle').replace('$title', title.value)
        })

        return {
          categories, error, title, body, image, category, showForm, showCreated, imageUploaded, updateTitleText,
          handleForm, cancelView, fileUpdate
        }
      }
  }
  </script>
  
  <style>
  
  </style>