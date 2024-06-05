<template>
  <h1 v-if="!showCreated">{{ $t('inputs.createPostTitle') }}</h1>
  <form @submit.prevent="handleForm" v-if="showForm" class="createFrom">
    <div class="titleContainter">
        <!--<label>Title:</label>-->
        <input type="text" required autofocus v-model="title" :placeholder="$t('inputs.enterTitle')">
    </div>

    <div class="categoryContainer">
        <!--<label>Category:</label>-->
        <select v-model="category">
            <option value="" class="defaultOption" selected disabled hidden>{{ $t('inputs.enterCategory') }}</option>
            <template v-for="currentCategory in categories" :key="currentCategory.id">
                <option v-if="currentCategory.id != 0" :value="currentCategory.id">{{ currentCategory.categoryName[$i18n.locale] }}</option>
            </template>
        </select>
    </div>

    <div class="bodyContainer">
        <!--<label>Body:</label>-->
        <textarea type="textarea" required rows="1" cols="10" v-model="body" :placeholder="$t('inputs.enterBody')"></textarea>
    </div>

    <div class="imageContainer">
        <label for="create-file-upload" class="uploadFile" :class="{imageUploaded:imageUploaded}" ref="uploadText">
            {{$t('inputs.imageLabelText')}}
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
import addPost from '../composables/addPost'
import getCategories from '../composables/getCategories'
import postCreatedEvent from '../composables/postCreatedEvent'
import { inject } from 'vue'

export default {
    props:  ['size'],
    setup() {
        let {categories, error, load} = getCategories()

        load();
        categories.value = categories.value.shift();
        console.log(categories);
        return {categories, error}
        //postCreatedEvent();
        //return {postCreatedEvent}
        //const postCreated = () => (postCreatedEvent);
        //return {postCreated}
    },
    emits: ["postCreated"],
    data() {
        return {
            title: '',
            body: '',
            image: 'data:image/gif;base64,R0lGODlhUAAPAKIAAAsLav///88PD9WqsYmApmZmZtZfYmdakyH5BAQUAP8ALAAAAABQAA8AAAPbWLrc/jDKSVe4OOvNu/9gqARDSRBHegyGMahqO4R0bQcjIQ8E4BMCQc930JluyGRmdAAcdiigMLVrApTYWy5FKM1IQe+Mp+L4rphz+qIOBAUYeCY4p2tGrJZeH9y79mZsawFoaIRxF3JyiYxuHiMGb5KTkpFvZj4ZbYeCiXaOiKBwnxh4fnt9e3ktgZyHhrChinONs3cFAShFF2JhvCZlG5uchYNun5eedRxMAF15XEFRXgZWWdciuM8GCmdSQ84lLQfY5R14wDB5Lyon4ubwS7jx9NcV9/j5+g4JADs=',
            category: '',
            showForm: true,
            showCreated: false,
            imageUploaded: false
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
              title: this.title,
              body: this.body,
              image: this.image,
              category: this.category,
              createdBy: this.$cookies.get('userId'),
              createdAt: new Date().getTime()
            }
            console.log(tempPost);
            const {status, error2, savePost} = addPost(tempPost);
            savePost();

            /*var evt = document.createEvent("Event");
            evt.initEvent("myEvent",true,true);*/

            // create the event
            const event = new Event('refreshPosts');
            event.data = tempPost;

            // elem is any element
            document.dispatchEvent(event)

            this.showCreated = true;
            this.showForm = false;

            let that = this;
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
            this.$emit('postCreated', false)
        },
        resetView() {
            this.$emit('postCreated', true)
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
            console.log(file);
            if (typeof file == 'object') {
                reader.readAsDataURL(file);

                console.log(name);

                const uploadedText = this.$t('inputs.imageUploadSuccessText').replace('$name', file.name)
                this.$refs.uploadText.innerText = uploadedText;
                //this.$refs.uploadText.innerHTML = '<fa-icon icon="plus" /> ' + uploadedText;
                this.imageUploaded = true;
            }


            //update file uploaded, with name, check icon (optional: preview?)

            /*const hasName = ['file', 'logo','headerImg'].includes(name)
            if(hasName && file) this[name] = file
            else console.log('error')*/
        }
    }
}
</script>

<style>
h1 {
    color:#3ca576;
}
input, textarea {
    border: none;
    border-bottom: 1px solid gray;
}
input:active, input:focus, textarea:active, textarea:focus {
    border-color:#3ca576;
}
input:focus-visible, textarea:focus-visible {
    outline:none;
}
select {
    border-radius: 5px;
    padding: 5px;
    color: #797979;
    outline-color: #3ca576;
}
textarea {
    max-width:80%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
.small textarea {
    max-width:88%;
}
.createForm div {
    height: 70px;
}
.large input, .large textarea, .medium input, .medium textarea {
    width: 80%;
    padding: 5px;
    margin: 20px;
}
.small input, .small textarea {
    width: 88%;
    padding: 5px;
    margin: 20px;
}
.small .categoryContainer, .small .imageContainer {
    padding-left:20px;
}
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
.titleContainter{}
.categoryContainer{    
    text-align: left;
    padding-left: 56px;
    margin-top: 10px;
}
.bodyContainer{}
.imageContainer{}
.submit button{
    padding: 7px 30px;
    border: 1px solid #3ca576;
    background-color: #3ca576;
    border-radius: 5px;
    color: white;
    transition: 100ms;
    cursor:pointer;
}
.small .submit button{
    font-size: 20px;
    width:80%;
    margin-top:20px;
}
.submit button:hover {
    background-color: white;
    color: #3ca576;
}
.submit button:active {
    background-color: #3ca576;
    color: white;
}
.iconFormSuccess {font-size:30px;}
.defaultOption {color:#838383 !important}
input[type="file"] {
    display: none;
}
.uploadFile {
    border: 1px solid #3ca576;
    border-radius:5px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;

  background-color: white;
    color: #3ca576;
}
.uploadFile:active {
    background-color: white;
    color: #3ca576;
}
.uploadFile:hover {
    background-color: #3ca576;
    color: white;
}
.imageUploaded {
    border-color:#00af00;
    color:#00af00;
}
.postCreatedContainer {
    position: relative;
    display: block;
    height: 50px;
    color: #3ca576;
    font-size: 30px;
    padding: 10px;
}
.postCreatedContainer svg {
    font-size: 40px;
    margin-right: 15px;
}
.postCreatedContainer span {

}
.cancelModal {
    position: fixed;
    bottom: 0px;
    width: 100%;
}
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
</style>