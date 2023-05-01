<script setup lang="ts">

defineProps({darkTheme: {type: Boolean, required: true}})
const emits = defineEmits(['drawer', 'themeChanger'])

</script>

<template>
    <v-app-bar elevation="0" border>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="emits('drawer')"></v-app-bar-nav-icon>
        </template>

        <template v-slot:append>
            <v-btn icon @click="emits('themeChanger')">
                <v-icon v-if="darkTheme">mdi-weather-sunny</v-icon>
                <v-icon v-else>mdi-weather-night</v-icon>
            </v-btn>
            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
</template>
