<script setup lang="ts">
import {ref} from "vue";
import Note from "./../components/NoteItem.vue";

const showForm = ref(false)
const emits = defineEmits(['add-note'])
const note = ref({title: "", description: ""})
function clearNote(note:Note) {
    note.title = ''
    note.description = ''
}

</script>

<template>
    <div
        class="justify-center mb-2"
        :class="[showForm ? 'd-none' : 'd-flex']"
    >
        <v-card
                border
                density="compact"
                min-width="550"
                elevation="5"
                variant="plain"
                @click="showForm = !showForm"
        >
            <v-card-item class="ma-1 pa-1 text-subtitle-2">
                <v-card-title>Take a note...</v-card-title>
            </v-card-item>
        </v-card>
    </div>
    <div
        class="justify-center mb-2"
        :class="[!showForm ? 'd-none' : 'd-flex']"
    >
        <v-card
                border
                density="compact"
                min-width="550"
                elevation="5"
                variant="plain"
        >
            <v-card-text class="ma-0 mt-n4 pa-2">
                <div class="d-block justify-space-around">
                    <v-textarea
                            class="text-subtitle-1"
                            variant="plain"
                            placeholder="Title"
                            density="compact"
                            hide-details
                            auto-grow
                            no-resize
                            rows="1"
                            focused
                            autofocus
                            v-model="note.title"
                    ></v-textarea>
                    <v-textarea
                            class="text-caption"
                            variant="plain"
                            placeholder="Take a note..."
                            density="compact"
                            hide-details
                            auto-grow
                            no-resize
                            rows="1"
                            v-model="note.description"
                    ></v-textarea>
                </div>
            </v-card-text>

            <v-card-actions class="justify-end ma-0 pa-0">
                <v-btn size="small" icon="mdi-bell-plus"></v-btn>
                <v-spacer></v-spacer>
                <v-btn size="small" icon="mdi-plus" @click="showForm = !showForm; emits('add-note', note); clearNote(note)"></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
