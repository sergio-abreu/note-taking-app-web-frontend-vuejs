import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import type { Note, Reminder } from "@/models/Notes";
import NotesApi from "@/models/NotesAPI";

export const useNotesStore = defineStore("notes", () => {
  const api: NotesApi = new NotesApi("http://localhost:8080", "bdd0ff53-f42d-4168-a669-478c0be09207");
  const notes: Ref<Array<Note>> = ref([]);

  const completed = computed<Array<Note>>(() => {
    return notes.value.filter(el => el.completed)
  })

  const inProgress = computed<Array<Note>>(() => {
    return notes.value.filter(el => !el.completed)
  })

  function getNotes() {
    api.getNotes().then((n: Array<Note>) => {
      notes.value = n;
    });
  }

  function addNote(note: Note) {
    api.addNote(note).then((note: Note) => {
      notes.value.unshift(note);
    });
  }

  function copyNote(note: Note) {
    api.copyNote(note).then((note: Note) => {
      notes.value.unshift(note);
    });
  }

  function editNote(note: Note) {
    api.editNote(note).then((note: Note) => {
      notes.value = notes.value.map(el => el.id == note.id ? note : el);
    });
  }

  function deleteNote(id: string) {
    api.deleteNote(id).then((id: string) => {
      notes.value = notes.value.filter(note => note.id != id);
    });
  }

  function archiveNote(id: string) {
    api.archiveNote(id).then((id: string) => {
      const note = notes.value.find(note => note.id == id);
      note.completed = true;
    });
  }

  function unarchiveNote(id: string) {
    api.unarchiveNote(id).then((id: string) => {
      const note = notes.value.find(note => note.id == id);
      note.completed = false;
    });
  }

  function saveReminder(reminder: Reminder) {
    if (reminder.id) {
      api.editReminder(reminder.note_id, reminder.id, reminder).then((r: Reminder) => {
        const note = notes.value.find((el) => el.id == reminder.note_id);
        note.reminder = r;
      });
    } else {
      api.createReminder(reminder.note_id, reminder).then((r: Reminder) => {
        const note = notes.value.find((el) => el.id == reminder.note_id);
        note.reminder = r;
      });
    }
  }

  function deleteReminder(reminder: Reminder) {
    api.deleteReminder(reminder.note_id, reminder.id).then(() => {
      const note = notes.value.find((el) => el.id == reminder.note_id);
      note.reminder = undefined;
    });
  }

  return {
    completed,
    inProgress,
    getNotes,
    addNote,
    copyNote,
    editNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    saveReminder,
    deleteReminder
  };
});