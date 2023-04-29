<script setup lang="ts">
import {defineEmits} from "vue";

const emits = defineEmits(['drawer'])

</script>

<template>
    <v-app-bar>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="emits('drawer')"></v-app-bar-nav-icon>
        </template>

        <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
</template>
