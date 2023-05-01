<script setup lang="ts">
import {PropType, ref} from "vue";

interface Reminder {
    id: string
    cron_expression: string
    ends_at: string
    created_at: string
    updated_at: string
}

interface Note {
    id: string
    title: string
    description: string
    user_id: string
    reminder: Reminder
    created_at: string
    updated_at: string
}

defineProps({
    note: {type: Object as PropType<Note>, required: true}
})

const showActions = ref(false)
</script>

<template>
    <v-card
            class="ma-1"
            variant="elevated"
            width="238"
            @mouseover="showActions = true"
            @mouseleave="showActions = false"
            density="compact"
            elevation="5"
    >
        <v-card-text>
            <p class="text-subtitle-1 three-lines">{{note.title}}</p>
            <p class="text-subtitle-2 sixteen-lines">{{note.description}}</p>
        </v-card-text>
        <v-card-actions class="pb-0 pt-0 ma-n1">
            <v-fade-transition v-show="showActions">
                <v-layout>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-0" size="small" icon="mdi-bell-plus-outline"></v-btn>
                    <v-btn class="ms-0" size="small" icon="mdi-content-copy"></v-btn>
                    <v-btn class="ms-0" size="small" icon="mdi-archive-arrow-down"></v-btn>
                    <v-btn class="ms-0" size="small" icon="mdi-delete-outline"></v-btn>
                    <v-spacer></v-spacer>
                </v-layout>
            </v-fade-transition>
        </v-card-actions>
    </v-card>
</template>

<style>
.three-lines {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: normal;
}
.sixteen-lines {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 16;
    white-space: normal;
}
</style>