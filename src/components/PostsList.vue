<template>
  <div class="postList">
    <div v-for="post in posts" :key="post.id">
        <SinglePost :post="post" :size="size"/>
    </div>
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue';

export default {
    props: ['posts', 'size'],
    components: { SinglePost }
}
</script>

<style>
.postList {}
</style>