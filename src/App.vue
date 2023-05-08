<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppBar from "@/components/AppBar.vue";
import {ref, watch} from "vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import router from "@/router";

const drawer = ref(true)
const items = ref([{
    title: "Notes",
    icon: "mdi-lightbulb-outline",
    to: '/notes',
}, {
    title: "Reminders",
    icon: "mdi-bell-outline",
    to: '/reminders',
}, {
    title: "Archive",
    icon: "mdi-archive-arrow-down-outline",
    to: '/archive',
}])
const darkTheme = ref(false)
const listView = ref(false)
const pageTitle = ref("")

watch(router.currentRoute, (r) => {
    pageTitle.value = r.name
})


</script>

<template>
    <v-app :theme="darkTheme ? 'dark' : 'light'">
        <AppBar
            @theme-changer="darkTheme = !darkTheme"
            @drawer="drawer = !drawer"
            :darkTheme="darkTheme"
            :listView="listView"
            @list-view-changer="listView = !listView"
            :title="pageTitle"
        />
        <NavigationDrawer :drawer="drawer" :items="items"/>
        <v-main>
            <v-container fluid>
                <RouterView :listView="listView" />
            </v-container>
        </v-main>
    </v-app>
</template>
