<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import Note from "@/components/NoteItem.vue";

const notes = ref(Array<Note>())

onMounted(() => {
    axios.get('http://localhost:8080/api/v1/bdd0ff53-f42d-4168-a669-478c0be09207/notes/')
        .then(function (response) {
            response.data.forEach((el: any) => {
                notes.value.push(el)
            })
            console.log(notes.value);
        })
        .catch(function (error) {
            console.log(error);
        })
})
</script>

<template>
    <v-container fluid class="d-flex">
        <v-row no-gutters>
            <v-col v-for="note in notes" :key=note.id>
                <Note :note="note" />
            </v-col>
            <v-col v-for="note in notes" :key=note.id>
                <Note :note="note" />
            </v-col>
        </v-row>
    </v-container>
</template>