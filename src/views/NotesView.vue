<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";
import { useDisplay, useLayout } from "vuetify";
import { Note, Reminder } from "@/models/Notes";
import NoteItem from "./../components/NoteItem.vue";
import AddNoteForm from "./../components/AddNoteForm.vue";
import NotesApi from "@/models/NotesAPI";

const props = defineProps({
  archivedView: { type: Boolean, required: true },
  listView: { type: Boolean, required: true }
});

const { mainRect } = useLayout();
const notes = ref(Array<Note>());
const dialog = ref(false);
const selectedNote: Note = ref({});
const api = new NotesApi("http://localhost:8080", "bdd0ff53-f42d-4168-a669-478c0be09207");

onMounted(() => {
  getNotes();
});

onUpdated(() => {
  getNotes();
});

const itemsPerRow = computed(() => {
  if (props.listView) {
    return 1;
  }
  const width = useDisplay().width.value - mainRect.value.left - mainRect.value.right - 100;
  if (width < 250) {
    return 1;
  }
  return Math.floor(width / 250);
});

const cardWidth = computed(() => {
  if (props.listView) {
    return 600;
  }
  return 238;
});

function getNotesForColum(column: number) {
  return notes.value.filter((note: Note, index: number) => {
    return index % itemsPerRow.value == column - 1;
  });
}

function getNotes() {
  if (props.archivedView) {
    api.getCompletedNotes().then((n: Array<Note>) => {
      notes.value = n;
    }).catch((e: any) => {
      console.error(e);
    });
  } else {
    api.getInProgressNotes().then((n: Array<Note>) => {
      notes.value = n;
    }).catch((e: any) => {
      console.error(e);
    });
  }
}

function addNote(note: Note) {
  api.addNote(note).then((note: Note) => {
    if (props.archivedView) {
      return;
    }
    notes.value.unshift(note);
  }).catch((e: any) => {
    console.error(e);
  });
}

function copyNote(note: Note) {
  api.copyNote(note).then((note: Note) => {
    if (props.archivedView) {
      return;
    }
    notes.value.unshift(note);
  }).catch((e: any) => {
    console.error(e);
  });
}

function editNote(note: Note) {
  api.editNote(note).then((note: Note) => {
    notes.value = notes.value.map(el => el.id == note.id ? note : el);
  }).then(() => {
    dialog.value = false;
  }).catch((e: any) => {
    console.error(e);
  });
}

function deleteNote(id: string) {
  api.deleteNote(id).then((id: string) => {
    notes.value = notes.value.filter(note => note.id != id);
  }).catch((e: any) => {
    console.error(e);
  });
}

function archiveNote(id: string) {
  api.archiveNote(id).then((id: string) => {
    notes.value = notes.value.filter(note => note.id != id);
  }).catch((e: any) => {
    console.error(e);
  });
}

function unarchiveNote(id: string) {
  api.unarchiveNote(id).then((id: string) => {
    notes.value = notes.value.filter(note => note.id != id);
  }).catch((e: any) => {
    console.error(e);
  });
}

function saveReminder(reminder: Reminder) {
  if (reminder.id) {
    api.editReminder(reminder.note_id, reminder.id, reminder).then((r: Reminder) => {
      let note = notes.value.find((el) => el.id == reminder.note_id);
      note.reminder = r;
    }).catch((e: any) => {
      console.error(e);
    });
  } else {
    api.createReminder(reminder.note_id, reminder).then((r: Reminder) => {
      let note = notes.value.find((el) => el.id == reminder.note_id);
      note.reminder = r;
    }).catch((e: any) => {
      console.error(e);
    });
  }
}

function deleteReminder(reminder: Reminder) {
  api.deleteReminder(reminder.note_id, reminder.id).then(() => {
    let note = notes.value.find((el) => el.id == reminder.note_id);
    note.reminder = undefined;
  }).catch((e: any) => {
    console.error(e);
  });
}

</script>

<template>
  <AddNoteForm v-if="!archivedView" @add-note="addNote" />
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
            @copy-note="copyNote"
            @archive-note="archiveNote"
            @unarchive-note="unarchiveNote"
            @delete-note="deleteNote"
            @save-reminder="saveReminder"
            @delete-reminder="deleteReminder"
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
        @copy-note="copyNote"
        @archive-note="archiveNote"
        @unarchive-note="unarchiveNote"
        @delete-note="deleteNote"
        @edit-note="editNote"
        @save-reminder="saveReminder"
        @delete-reminder="deleteReminder"
      />
    </v-dialog>
  </v-container>
</template>
