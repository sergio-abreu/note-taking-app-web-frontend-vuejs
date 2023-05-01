<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useDisplay} from "vuetify";
import axios from "axios";
import Note from "@/components/NoteItem.vue";
import AddNote from "@/components/AddNote.vue";

const notes = ref(Array<Note>())

onMounted(() => {
    axios.get('http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/')
        .then(function (response) {
            response.data.forEach((el: any) => {
                notes.value.push(el)
            })
        })
        .catch(function (error) {
            console.log(error);
        })
})

const itemsPerRow = computed(() => {
    return Math.floor(useDisplay().width.value / 270)
})

function getNotesForColum(column: number) {
    return notes.value.filter((note: Note, index: number) => {
        return index % itemsPerRow.value == column - 1;
    })
}

</script>

<template>
    <AddNote/>
    <v-container fluid>
        <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col v-for="n in itemsPerRow" :key="n">
                <Note
                    v-for="note in getNotesForColum(n)"
                    :note="note"
                    :key="note.id"
                />
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>