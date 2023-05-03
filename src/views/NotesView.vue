<script setup lang="ts">
import {computed, onMounted, onUpdated, ref} from "vue";
import {useDisplay} from "vuetify";
import axios from "axios";
import Note from "./../components/NoteItem.vue";
import NoteItem from "@/components/NoteItem.vue";
import AddNoteForm from "@/components/AddNoteForm.vue";

const props = defineProps({
    archivedView: {type: Boolean, required: true}
})

const notes = ref(new Array<Note>)
const dialog = ref(false)
const selectedNote = ref(Note)

onMounted(() => {
    getNotes()
})

onUpdated(() => {
    getNotes()
})

const itemsPerRow = computed(() => {
    return Math.floor(useDisplay().width.value / 270)
})

function getNotesForColum(column: number) {
    return notes.value.filter((note: Note, index: number) => {
        return index % itemsPerRow.value == column - 1;
    })
}

function getNotes() {
    notes.value = Array<Note>()
    const url = props.archivedView ? 'http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/completed' :
        'http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/'
    axios.get(url)
        .then(function (response) {
            notes.value = response.data
        })
        .catch(function (error) {
            console.error(error);
        })
}

function addNote(note: Note) {
    const title = note.title
    const description = note.description
    axios.post('http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/', note)
        .then(function (response) {
            console.log(response.data);
            if (props.archivedView) {
                return
            }
            notes.value.push({
                id: response.data.note_id,
                title: title,
                description: description,
                user_id: 'bdd0ff53-f42d-4168-a669-478c0be09207',
                reminder: null,
                created_at: '',
                updated_at: null,
            })
        })
        .catch(function (error) {
            console.error(error);
        });
}

function copyNote(note: Note) {
    axios.post(['http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/', note.id, '/copy'].join(''))
        .then(function (response) {
            console.log(response.data);
            if (props.archivedView) {
                return
            }
            notes.value.push({
                id: response.data.note_id,
                title: note.title,
                description: note.description,
                user_id: 'bdd0ff53-f42d-4168-a669-478c0be09207',
                reminder: null,
                created_at: '',
                updated_at: null,
            })
        })
        .catch(function (error) {
            console.error(error);
        });
}

function editNote(note: Note) {
    axios.patch(['http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/', note.id].join(''), note)
        .then(function (response) {
            console.log(response.data);
            const n = notes.value.find(el => el.id == note.id)
            n.title = note.title
            n.description = note.description
        })
        .then(() => dialog.value = false)
        .catch(function (error) {
            console.error(error);
        });
}

function deleteNote(id: string) {
    axios.delete(['http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/', id].join(''))
        .then(function (response) {
            console.log(response.data);
            notes.value = notes.value.filter(note => note.id != id)
        })
        .catch(function (error) {
            console.error(error);
        });
}

function archiveNote(id: string) {
    axios.put(['http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/', id, '/complete'].join(''))
        .then(function (response) {
            console.log(response.data);
            notes.value = notes.value.filter(note => note.id != id)
        })
        .catch(function (error) {
            console.error(error);
        });
}

function unarchiveNote(id: string) {
    axios.put(['http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/', id, '/in-progress'].join(''))
        .then(function (response) {
            console.log(response.data);
            notes.value = notes.value.filter(note => note.id != id)
        })
        .catch(function (error) {
            console.error(error);
        });
}

</script>

<template>
    <AddNoteForm v-if="!archivedView" @add-note="addNote"/>
    <v-container fluid>
        <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col v-for="n in itemsPerRow" :key="n">
                <div v-for="note in getNotesForColum(n)" :key="note.id" @click="dialog = true; selectedNote = note">
                    <NoteItem
                        :note="note"
                        :key="note.id"
                        :width=238
                        :edit-mode="false"
                        @copy-note="copyNote"
                        @archive-note="archiveNote"
                        @unarchive-note="unarchiveNote"
                        @delete-note="deleteNote"
                    />
                </div>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-dialog
            v-model="dialog"
            width="auto"
        >
            <NoteItem
                :note="selectedNote"
                :width=700
                @copy-note="copyNote"
                @archive-note="archiveNote"
                @unarchive-note="unarchiveNote"
                @delete-note="deleteNote"
                @edit-note="editNote"
                :edit-mode="true"
            />
        </v-dialog>
    </v-container>

</template>