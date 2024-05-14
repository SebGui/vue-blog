<template>
    <div v-if="size === 'large'">
        <div>
            <span>Large</span>
        </div>
    </div>
    <!--<div v-else>
        <teleport to=".sideBar">
            <div>
                <span>Testing</span>
            </div>
        </teleport>
    </div>-->
    Toto
</template>

<script>
export default {// Make teleport permanent view, and temporary menu view with listener to show/hide
    props:['size'],
    setup() {
        /* Get categories, return them for showing*/
    }
}
</script>

<style>

</style>