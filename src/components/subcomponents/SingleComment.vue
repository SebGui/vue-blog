<template>
    <div class="singleComment">
        <h5>{{ props.comment.createdBy }}</h5> 
        <h6>
            <timeago :datetime="new Date(props.comment.createdAt)" :locale="localeObj[$i18n.locale]"/>
        </h6>
        <p>{{ props.comment.body }}</p>
    </div>
</template>

<script setup>
import { zhCN, fr } from 'date-fns/locale'

const localeObj = {
    cn:zhCN,
    fr:fr,
    en:''
}
const props = defineProps({
  comment: Object
})
</script>

<style>
.singleComment {margin-bottom:5px;padding:10px;}
.singleComment p {clear:both;}
.singleComment h5, .singleComment h6 {position:relative;float:left;margin-top:0px}
.singleComment h6 {position:relative;top:2px;margin-left:10px;color:gray;}
</style>