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
    <v-card :title=note.title :text=note.description class="ma-5" min-width="200" max-width="500">
        <v-card-actions>
            <v-btn>Click me</v-btn>
        </v-card-actions>
    </v-card>
</template>
