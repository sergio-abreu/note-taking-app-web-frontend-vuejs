<script setup lang="ts">
import { computed, onBeforeMount, Ref, ref } from "vue";
import { useDisplay, useLayout } from "vuetify";
import { Note } from "@/models/Notes";
import NoteItem from "./../components/NoteItem.vue";
import AddNoteForm from "./../components/AddNoteForm.vue";
import { useNotesStore } from "@/stores/notes";

const props = defineProps<{
  archivedView: boolean,
  listView: boolean,
}>();

const store = useNotesStore();
const { mainRect } = useLayout();
const dialog = ref(false);
const selectedNote: Ref<Note> = ref({});
const notes = computed<Array<Note>>(() => {
  return props.archivedView ? store.completed : store.inProgress;
});

onBeforeMount(() => {
  store.getNotes();
});

const itemsPerRow = computed<number>(() => {
  if (props.listView) {
    return 1;
  }
  const width = useDisplay().width.value - mainRect.value.left - mainRect.value.right - 100;
  if (width < 250) {
    return 1;
  }
  return Math.floor(width / 250);
});

const cardWidth = computed<number>(() => {
  if (props.listView) {
    return 600;
  }
  return 238;
});

function getNotesForColum(column: number): Array<Note> {
  return notes.value.filter((note: Note, index: number) => {
    return index % itemsPerRow.value == column - 1;
  });
}

</script>

<template>
  <AddNoteForm v-if="!archivedView" @add-note="store.addNote" />
  <v-container fluid>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <v-col v-for="n in itemsPerRow" :key="n" class="ma-1">
        <div
          v-for="note in getNotesForColum(n)"
          :key="note.id"
          @click="dialog = true; selectedNote = note"
          class="mb-4"
        >
          <NoteItem
            :note="note"
            :key="note.id"
            :width="cardWidth"
            :edit-mode="false"
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
        :edit-mode="true"
        @close-dialog="dialog = false"
      />
    </v-dialog>
  </v-container>
</template>
