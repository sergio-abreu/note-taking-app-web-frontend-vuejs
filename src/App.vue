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
</script>

<template>
    <v-app full-height>
        <AppBar @drawer="drawer = !drawer"/>
        <NavigationDrawer :drawer="drawer" :items="items"/>
        <v-main class="bg-grey-lighten-2">
            <v-container fluid class="ma-5 pa-5">
                <v-container fluid>
                    <RouterView/>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>
