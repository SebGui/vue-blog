<template>
    <!-- Large sidebar -->
    <div v-if="size === 'large'" :class="{barFixed: scrollPosition > 80}" class="largeSidebar">
        <div v-for="category in categories" :key="category.id" class="singleCategory" @click="sendFilter(category.id)">
            <div class="categoryIcon">
                <fa-icon :icon="category.categoryIcon" />
            </div>
            <div class="categoryName">
                <span>{{ category.categoryName[$i18n.locale] }}</span>
            </div>
        </div>
    </div>

    <!-- Small and Medium sidebar -->
    <div v-else>
        <div :class="{mediumSidebar:size=='medium',smallSidebar:size=='small'}">
            <div v-for="category in categories" :key="category.id" class="singleCategory" @click="sendFilter(category.id),this.$emit('categoryClicked', true)">
                <div class="categoryIcon">
                    <fa-icon :icon="category.categoryIcon" />
                </div>
                <div class="categoryName">
                    <span>{{ category.categoryName[$i18n.locale] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import getCategories from '../composables/category/getCategories'

export default {
    props:['size'],
    emits: ['categoryClicked'],
    setup() {
        /* Init scroll handler for sidebar */
        const scrollPosition = ref(0)
        const updateScroll = () => {
            scrollPosition.value = window.scrollY;
        }

        /* Get Categories */
        const {categories, error, load} = getCategories();
        load();

        /* Toggle sidebar view */
        const showSidebar = ref(false);
        const toggleSidebar = () => {
            showSidebar.value = !showSidebar.value;
        }

        /* Sends filter custom event */
        const sendFilter = (id) => {
            const event = new Event('filterPosts');
            event.data = id;//Category id to filter on
            document.dispatchEvent(event)
        }

        /* LifeCycle hooks */
        onMounted(() => {
            window.addEventListener('scroll', updateScroll);
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', updateScroll);
        })

        return {categories, error, showSidebar, toggleSidebar, scrollPosition, updateScroll, sendFilter}
    }
}
</script>

<style>
/* General elements CSS */
.singleCategory {position: relative;width: 100%;height: 65px;background-color: #3ca576;border-bottom: 1px solid #2b795675;cursor:pointer;transition:100ms;}
.categoryIcon {position:relative;float:left;width: 30%;background-color: #1d513a;color: #3ca576;height: 100%;font-size: 34px;}
.categoryIcon svg {margin-top: 25%;}
.categoryName {position:relative;float:left;height: 100%;width: 70%;top: 5px;}
.categoryName span {top: 25%;}
.singleCategory:hover * {color:white !important;}
.categoryIcon:hover {color: #3ca576;}
.categoryName {text-align:left;color: #2c3e50;}
.categoryName span {position:relative;left: 10px;}
.barFixed {position: fixed;top: 88px;z-index: 3;width: 215px;/*box-shadow: #b7b6b6 5px 8px 8px 3px;*/}

/* Large CSS */
.largeSidebar {font-size:22px;box-shadow: #b7b6b6 5px 8px 8px 3px;}

/* Medium Sidebar */
.mediumSidebar {font-size: 40px;width: 60%;box-shadow: #a1a1a1 6px -2px 5px;}
.mediumSidebar .categoryName span {left:25px;}
.mediumSidebar .categoryIcon svg {    margin-top: 13%;margin-left: 27%;}
.mediumSidebar .singleCategory {height:100px;}
.mediumSidebar .categoryIcon {font-size: 60px;}

/* Small Sidebar */
.smallSidebar {height: 60vh;font-size: 50px;box-shadow: #a1a1a1 -1px 9px 5px;}
.smallSidebar .singleCategory {height: calc(60vh / 7);}
.smallSidebar .categoryIcon {font-size: 50px;}
.smallSidebar .categoryIcon svg {margin-top: 8%;margin-left: 27%;}
.smallSidebar .categoryName span {left:25px;top: 0px;font-size: 36px;}
.smallSidebar .categoryName {top: 0px;}
</style>