<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppBar from "@/components/AppBar.vue";
import {ref} from "vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

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
    icon: "mdi-package-down",
    to: '/archive',
}])
const darkTheme = ref(false)
</script>

<template>
    <v-app full-height :theme="darkTheme ? 'dark' : 'light'">
        <AppBar @themeChanger="darkTheme = !darkTheme" @drawer="drawer = !drawer" :darkTheme="darkTheme"/>
        <NavigationDrawer :drawer="drawer" :items="items"/>
        <v-main>
            <v-container fluid class="ma-5 pa-5">
                <v-container fluid>
                    <RouterView/>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>
