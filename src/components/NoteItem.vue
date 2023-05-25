<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import AddReminderForm from "@/components/AddReminderForm.vue";
import { Note, Reminder } from "@/models/Notes";

const props = defineProps({
  note: { type: Object as PropType<Note>, required: true },
  editMode: { type: Boolean, required: true },
  width: { type: [Number, String], required: true }
});

const emits = defineEmits(["delete-note", "copy-note", "archive-note", "unarchive-note", "edit-note", "save-reminder", "delete-reminder"]);

const showActions = ref(false);
const editedNote = ref({ ...props.note });
const persistent = ref(false);

const reminderChip = computed({
  get() {
    return !!props.note.reminder;
  },
  set() {
  }
});

const nextCron = computed(() => {
  if (!props.note.reminder) {
    return "";
  }
  const r:Reminder = props.note.reminder;
  return [r.start_date, " ", r.interval].join("");
});

</script>

<template>
  <v-card
    class="ma-1 d-flex flex-column rounded-lg"
    variant="flat"
    :width="width"
    @mouseover="showActions = true"
    @mouseleave="showActions = false"
    density="compact"
    border
  >
    <v-card-text v-if="!editMode" class="mb-n7">
      <p class="text-subtitle-1 font-weight-bold three-lines">{{ note.title }}</p>
      <p class="text-body-2 sixteen-lines">{{ note.description }}</p>
    </v-card-text>
    <v-card-text v-else class="ma-2 mt-n2 pa-2">
      <div class="d-block justify-space-around">
        <v-textarea
          class="text-subtitle-1 font-weight-bold three-lines"
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
          class="text-body-2 sixteen-lines"
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
      <div class="d-flex justify-space-between text-caption mt-2" style="z-index: 1">
        <div>
          <v-chip
            v-show="!!note.reminder"
            v-model="reminderChip"
            size="small"
            class="text-caption"
            closable
            close-label="Delete reminder"
            close-icon="mdi-window-close"
            @click:close.stop="emits('delete-reminder', note.reminder)"
            @click.stop=""
          >
            {{ nextCron }}
          </v-chip>
        </div>
        <div>Edited {{ note.updated_at.toLocaleString() }}
          <v-tooltip
            activator="parent"
            location="top"
          >
            Created {{ note.created_at.toLocaleString() }}
          </v-tooltip>
        </div>
      </div>
    </v-card-text>
    <v-card-item v-if="!editMode" class="mb-n5 mt-3" style="z-index: 1">
      <v-chip
        v-show="!!note.reminder"
        v-model="reminderChip"
        size="small"
        class="text-caption"
        closable
        close-label="Delete reminder"
        close-icon="mdi-window-close"
        @click:close.stop="emits('delete-reminder', note.reminder)"
        @click.stop=""
      >
        {{ nextCron }}
      </v-chip>
    </v-card-item>
    <v-card-actions class="pb-0 pt-3 ma-0" :class="{'mt-n8': editMode}">
      <v-fade-transition v-show="editMode || showActions || persistent">
        <v-layout>
          <v-spacer></v-spacer>
          <AddReminderForm
            :note_id="note.id"
            :reminder="note.reminder"
            @menu-updated="(value) => persistent = value"
            @save-reminder="(r) => emits('save-reminder', r)"
          >
            <template v-slot:activator="{ props }">
              <v-btn class="ms-0" size="small" icon @click.prevent.stop v-bind="props">
                <v-icon>mdi-bell-plus-outline</v-icon>
                <v-tooltip offset="-5" activator="parent" location="bottom" :disabled="persistent">Remind me</v-tooltip>
              </v-btn>
            </template>
          </AddReminderForm>
          <v-btn class="ms-0" size="small" icon @click.prevent.stop="emits('copy-note', note)">
            <v-icon>mdi-content-copy</v-icon>
            <v-tooltip offset="-5" activator="parent" location="bottom">Make a copy</v-tooltip>
          </v-btn>
          <v-btn v-if="!note.completed" class="ms-0" size="small" icon
                 @click.prevent.stop="emits('archive-note', note.id)">
            <v-icon>mdi-archive-arrow-down-outline</v-icon>
            <v-tooltip offset="-5" activator="parent" location="bottom">Archive</v-tooltip>
          </v-btn>
          <v-btn v-else class="ms-0" size="small" icon @click.prevent.stop="emits('unarchive-note', note.id)">
            <v-icon>mdi-archive-arrow-up-outline</v-icon>
            <v-tooltip offset="-5" activator="parent" location="bottom">Unarchive</v-tooltip>
          </v-btn>
          <v-btn class="ms-0" size="small" icon @click.prevent.stop="emits('delete-note', note.id)">
            <v-icon>mdi-delete-outline</v-icon>
            <v-tooltip offset="-5" activator="parent" location="bottom">Delete</v-tooltip>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="editMode" class="ms-0" size="small" icon @click="emits('edit-note', editedNote)">
            <v-icon>mdi-pencil-outline</v-icon>
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