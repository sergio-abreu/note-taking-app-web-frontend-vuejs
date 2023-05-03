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
    completed: boolean
    user_id: string
    reminder: Reminder
    created_at: string
    updated_at: string
}

const props = defineProps({
    note: {type: Object as PropType<Note>, required: true},
    editMode: {type: Boolean, required: true},
    width: {type: [Number, String], required: true},
})

const editedNote = ref({...props.note})

const emits = defineEmits(['delete-note', 'copy-note', 'archive-note', 'unarchive-note', 'edit-note'])

const showActions = ref(false)
</script>

<template>
    <v-card
            class="ma-1 d-flex flex-column"
            variant="elevated"
            :width="width"
            @mouseover="showActions = true"
            @mouseleave="showActions = false"
            density="compact"
            elevation="5"
    >
        <v-card-text v-if="!editMode">
            <p class="text-subtitle-1 three-lines">{{ note.title }}</p>
            <p class="text-subtitle-2 sixteen-lines">{{ note.description }}</p>
        </v-card-text>
        <v-card-text v-else class="ma-0 mt-n4 pa-2">
            <div class="d-block justify-space-around">
                <v-textarea
                        class="text-subtitle-1 three-lines"
                        variant="plain"
                        placeholder="Title"
                        density="compact"
                        hide-details
                        auto-grow
                        no-resize
                        rows="1"
                        focused
                        autofocus
                        v-model="editedNote.title"
                ></v-textarea>
                <v-textarea
                        class="text-subtitle-2 sixteen-lines"
                        variant="plain"
                        placeholder="Take a note..."
                        density="compact"
                        hide-details
                        auto-grow
                        no-resize
                        rows="1"
                        v-model="editedNote.description"
                ></v-textarea>
            </div>
        </v-card-text>
        <v-card-actions class="pb-0 pt-0 ma-n1">
            <v-fade-transition v-show="editedNote || showActions">
                <v-layout>
                    <v-spacer></v-spacer>
                    <v-btn class="ms-0" size="small" icon>
                        <v-icon>mdi-bell-plus-outline</v-icon>
                        <v-tooltip offset="-5" activator="parent" location="bottom">Remind me</v-tooltip>
                    </v-btn>
                    <v-btn class="ms-0" size="small" icon @click="emits('copy-note', note)">
                        <v-icon>mdi-content-copy</v-icon>
                        <v-tooltip offset="-5" activator="parent" location="bottom">Make a copy</v-tooltip>
                    </v-btn>
                    <v-btn v-if="!note.completed" class="ms-0" size="small" icon
                           @click="emits('archive-note', note.id)">
                        <v-icon>mdi-archive-arrow-down</v-icon>
                        <v-tooltip offset="-5" activator="parent" location="bottom">Archive</v-tooltip>
                    </v-btn>
                    <v-btn v-else class="ms-0" size="small" icon @click="emits('unarchive-note', note.id)">
                        <v-icon>mdi-archive-arrow-up</v-icon>
                        <v-tooltip offset="-5" activator="parent" location="bottom">Unarchive</v-tooltip>
                    </v-btn>
                    <v-btn class="ms-0" size="small" icon @click="emits('delete-note', note.id)">
                        <v-icon>mdi-delete-outline</v-icon>
                        <v-tooltip offset="-5" activator="parent" location="bottom">Delete</v-tooltip>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="editMode" class="ms-0" size="small" icon @click="emits('edit-note', editedNote)">
                        <v-icon>mdi-plus</v-icon>
                        <v-tooltip offset="-5" activator="parent" location="bottom">Edit</v-tooltip>
                    </v-btn>
                </v-layout>
            </v-fade-transition>
        </v-card-actions>
    </v-card>
    <slot></slot>
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