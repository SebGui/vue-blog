<template>
    <div @click.self="handleClicBackdrop" class="backdrop">
        <div class="content" :class="{aClassName:mTheme}">
            <!-- CreateForm -->
            <!--<slot>Default content</slot>
            <div class="actions">
                <slot name="links"></slot>
                <slot name="form"></slot>
            </div>-->
        </div>
    </div>
</template>

<script>
//v-if="isShown"
export default {
    name: "modal",
    props: { 

        mTheme: Boolean
    },
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        handleClicBackdrop(e) {
            //if (e.target.className != "backdrop")
                //return;
            this.$emit('closeModal', true)
            this.showModal = !this.showModal;
        }
    }
}
</script>

<style scoped>
.backdrop {
    top: 0;
    position:fixed;
    background-color: rgb(0,0,0,0.5);
    height: 100%;
    width: 100%;
    left: 0px;
}
.content{
    width:400px;
    padding: 20px;
    background-color:lightgray;
    border-radius:10px;
    margin: 100px auto;
}

.large .content {
    width:600px;
}
.medium .content {
    width:500px;
}
.small .content {
    width:350px;
}
</style>