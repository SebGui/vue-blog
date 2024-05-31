<template>
    <h1 v-if="!showCreated">{{this.updateTitleText}}</h1>
  <form @submit.prevent="handleForm" v-if="showForm" class="createFrom">
    <div class="titleContainter">
        <!--<label>Title:</label>-->
        <input type="text" required autofocus v-model="title">
    </div>

    <div class="categoryContainer">
        <!--<label>Category:</label>-->
        <select v-if="post.category" v-model="post.category">
            <option v-for="currentCategory in categories" :key="currentCategory.id" :value="currentCategory.id">{{ currentCategory.categoryName }}</option>
        </select>
    </div>

    <div class="bodyContainer">
        <!--<label>Body:</label>-->
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
  import updatePost from '../composables/updatePost'
  import getCategories from '../composables/getCategories'
  
  export default {
      props:  ['size', 'post'],
      setup(props) {
        let {categories, error, load} = getCategories();
        console.log(props);

        load();
        console.log(categories);
        return {categories, error}
      },
      emits: ["postUpdated"],
      data() {
          return {
            id: this.post.id,
              title: this.post.title,
              body: this.post.body,
              image: this.post.image,
              category: this.post.category,
              showForm: true,
              showCreated: false,
              imageUploaded: false,
              updateTitleText: ""
          }
      },
      methods : {
          handleForm(e) {
              console.log(e);
  
              console.log('Title', this.title);
              console.log('Category', this.category);
              console.log('Body', this.body);
              console.log('image', this.image);
  
              const tempPost = {
                id: this.id,
                title: this.title,
                body: this.body,
                image: this.image,
                category: this.category
              }
              console.log(tempPost);
              const {status, error2, update} = updatePost(tempPost);
              update();

              // create the event
              const event = new Event('refreshPosts');
              event.data = tempPost;
  
              // elem is any element
              document.dispatchEvent(event)
  
              this.showCreated = true;
              this.showForm = false;
  
              setTimeout(() => this.resetView(), 3000);
              //Show created
              //Hide modal after 1s?
  
              //this.postCreated();
              //this.$emit('closeModal', true)
              //Validate password
              /*this.passwordError = (this.password.length > 5) ? "" : "Password must be at least 6 chars long";
  
              if (!this.passwordError) {
                  console.log('email', this.email);
                  console.log('password', this.password);
                  console.log('role', this.role);
                  console.log('skills', this.skills);
                  console.log('term accepted', this.acceptedTerm);
              }*/
          },
          cancelView() {
            this.$emit('postUpdated', false)
          },
          resetView() {
              this.$emit('postUpdated', true)
              this.showCreated = false;
              this.showForm = true;
          },
          fileUpdate(e) {
              const name = e.target.name,
                    file = e.target.files[0]
              console.log(file);
              console.log(e);
  
              const reader = new FileReader();
              reader.addEventListener('load', () => this.image = reader.result);
              reader.readAsDataURL(file);
  
              /*const hasName = ['file', 'logo','headerImg'].includes(name)
              if(hasName && file) this[name] = file
              else console.log('error')*/
          }
      },
      mounted() {
        this.updateTitleText = this.$t('inputs.updateTitle').replace('$title', this.post.title)
      }
  }
  </script>
  
  <style>
  
  </style>