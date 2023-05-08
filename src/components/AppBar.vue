<script setup lang="ts">

defineProps({
    darkTheme: {type: Boolean, required: true},
    listView: {type: Boolean, required: true},
    title: {type: String, required: true},
})
const emits = defineEmits(['drawer', 'theme-changer', 'list-view-changer'])

</script>

<template>
    <v-app-bar elevation="0" border>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="emits('drawer')"></v-app-bar-nav-icon>
        </template>

        <template v-slot:title>
            <span class="text-capitalize">{{ title }}</span>
        </template>

        <template v-slot:append>
            <v-btn icon @click="emits('list-view-changer')">
                <v-icon v-if="listView">mdi-view-grid-outline</v-icon>
                <v-icon v-else>mdi-view-agenda-outline</v-icon>
            </v-btn>
            <v-btn icon @click="emits('theme-changer')">
                <v-icon v-if="darkTheme">mdi-weather-sunny</v-icon>
                <v-icon v-else>mdi-weather-night</v-icon>
            </v-btn>
            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
</template>
