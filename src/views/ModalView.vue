<template>
    <div @click.self="handleClicBackdrop" class="backdrop">
        <!-- Check on type for implementing category modal views -->
        <div v-if="type === 'sidebar'" class="sidebarModal">
            <SideBar :size="size" @categoryClicked="handleClicBackdrop"/>
        </div>

        <div v-if="type !== 'sidebar'" class="content">
            <CreateForm v-if="type === 'create'" :size="size" @postCreated="handleClicBackdrop"/>

            <UpdateForm v-if="type === 'update'" :size="size" :post="post" @postUpdated="handleClicBackdrop"/>

            <DeletePopup v-if="type === 'delete'" :post="post" @hideDelete="handleClicBackdrop"/>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import CreateForm from '../components/CreateForm.vue'
import UpdateForm from '../components/UpdateForm.vue'
import DeletePopup from '../components/DeletePost.vue'
import SideBar from '../views/SidebarView.vue'

export default {
    name: "modal",
    components: {CreateForm, UpdateForm, DeletePopup, SideBar},
    props: [
        'size', 'type', 'post'
    ],
    setup(props, ctx) {
        /* Init default showModal value*/
        const showModal = ref(false)

        /* Modal's backdrop click handler */
        const handleClicBackdrop = (e) => {
            ctx.emit('closeModal', true)
            showModal.value = !showModal.value;
        }

        return {showModal, handleClicBackdrop}
    }
}
</script>

<style scoped>
/* General CSS */
.backdrop {
    top: 0;
    position:fixed;
    background-color: rgb(0,0,0,0.5);
    height: 100%;
    width: 100%;
    left: 0px;
    z-index: 9;
}
.content{
    width:400px;
    padding: 20px;
    background-color:white;
    border-radius:10px;
    margin: 100px auto;
}

/* Large CSS */
.large .content {
    width:600px;
}

/* Medium CSS */
.medium .content {
    width:600px;
}

/* Small CSS */
.small .content {
    position: absolute;
    width: 100vw;
    height: 100vh;
    padding:0;
    margin-top: 0;
    border-radius: 0;
    font-size: 27px;
}
</style>