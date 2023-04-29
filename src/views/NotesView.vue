<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useDisplay} from "vuetify";
import axios from "axios";
import Note from "@/components/NoteItem.vue";

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
    const items = Math.floor(useDisplay().width.value / 280);
    console.log(items)
    return items
})

function getNotesForColum(column:number) {
    return notes.value.filter((note:Note, index:number) => {
        return index % itemsPerRow.value == column - 1;
    })
}

</script>

<template>
    <v-container fluid class="d-flex">
        <v-row no-gutters>
            <v-col class="d-block" v-for="n in itemsPerRow">
                <Note v-for="note in getNotesForColum(n)" :note="note" :key="note.id"/>
            </v-col>
        </v-row>
    </v-container>
</template>