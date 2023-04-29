<script setup lang="ts">
import {defineProps, PropType} from "vue";

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
</script>

<template>
    <v-card class="ma-1" width="238">
        <v-card-text>
            <p class="text-subtitle-1 three-lines">{{note.title}}</p>
            <p class="text-subtitle-2 sixteen-lines">{{note.description}}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn>Click me</v-btn>
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