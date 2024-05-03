<template>
    <div class="singlePost">
        <router-link :to="{name: 'Details', params: {id: post.id}}">
          <h3>{{post.title}}</h3>
        </router-link>
        <p>{{snippet}}</p>
        <span v-for="tag in post.tags" :key="tag">#{{ tag }} </span> 
    </div>
</template>
  
  <script>
  import { computed } from 'vue'
  
  export default {
      props: ['post'],
      setup(props) {
          const snippet = computed(() => {
              return props.post.body.substring(0, 50) + '...'
          })
          return {snippet}
      }
  }
  </script>
  
  <style>
   .singlePost {
    background-color:red;
   }
   .small .singlePost {
    background-color:yellow;
   }

   .medium .singlePost {
    background-color:blue;
   }

   .large .singlePost {
    background-color:pink;
   }
  </style>