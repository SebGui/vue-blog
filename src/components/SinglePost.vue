<template>
    <router-link :to="{name: 'Details', params: {id: post.id}}">
    <div class="singlePost">
        <div class="postImage" :style="{ 'background-image': 'url(' + testImage + ')' }"></div>

        <div class="postInfo">
            <h4>Category</h4>
            <h3>{{post.title}}</h3>
            <span>{{post.body}}</span><br/>

            <!--<div class="postSubInfo">
                <span v-for="tag in post.tags" :key="tag">#{{ tag }} </span> 
            </div>-->
        </div>
    </div>
    </router-link>
</template>
  
  <script>
  import { computed, ref } from 'vue'
  
  export default {
      props: ['post'],
      setup(props) {
        const testImage = "data:image/gif;base64,R0lGODlhUAAPAKIAAAsLav///88PD9WqsYmApmZmZtZfYmdakyH5BAQUAP8ALAAAAABQAA8AAAPbWLrc/jDKSVe4OOvNu/9gqARDSRBHegyGMahqO4R0bQcjIQ8E4BMCQc930JluyGRmdAAcdiigMLVrApTYWy5FKM1IQe+Mp+L4rphz+qIOBAUYeCY4p2tGrJZeH9y79mZsawFoaIRxF3JyiYxuHiMGb5KTkpFvZj4ZbYeCiXaOiKBwnxh4fnt9e3ktgZyHhrChinONs3cFAShFF2JhvCZlG5uchYNun5eedRxMAF15XEFRXgZWWdciuM8GCmdSQ84lLQfY5R14wDB5Lyon4ubwS7jx9NcV9/j5+g4JADs=";
          const snippet = computed(() => {
              return props.post.body.substring(0, 50) + '...'
          })

          return {snippet, testImage}
      }
  }
  </script>
  
  <style>
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
   .singlePost:active {
    background-color:#3ca576a3;
    box-shadow: rgb(250, 250, 250) 5px 5px 5px;
   }
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

   .medium .postInfo h4 {
    margin-bottom: -5px;
   }

    /* Large Screens */
   .large .singlePost {
    position: relative;
    width: calc((100% - 7%) / 3); /* -200px/3 (category bar divided by 3) */
    float: left;
    margin: 1%;
    min-height: 540px; /* Fix with masonry?*/
   }
    .large .postInfo span,.large .postInfo h3 {
    -webkit-line-clamp: 4;
    padding-left: 10px;
    padding-right: 12px;
   }


   .postInfo h3 {
    -webkit-line-clamp: 1;
    color: #656464;
   }
   .postInfo span, h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
   }
   .postInfo {
    float: left;
    width: 100%;
   }
   .postInfo a {
    text-decoration: none;
   }
   .postInfo span {
    color:gray;
   }
   .postInfo h4 {
    color:#3ca576;
   }
   .postSubInfo {
    display: inline-flex;
   }
   .postImage {
    background-size: auto;
    background-position: center;
    background-repeat: no-repeat;
   }
  </style>