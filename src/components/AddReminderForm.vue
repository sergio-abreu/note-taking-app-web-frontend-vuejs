<script setup lang="ts">
import { ref, onRenderTriggered, watch, onMounted } from "vue";
import { Reminder } from "@/models/Notes";
import { useNotesStore } from "@/stores/notes";

const store = useNotesStore();
const emits = defineEmits<{
  (e: "menu-updated", value: boolean): void
}>();

const props = defineProps<{
  note_id: string,
  reminder: Reminder,
}>();

const menu = ref<boolean>(false);
const selectedDays = ref<Array<number>>(!!props.reminder && !!props.reminder.week_days ? props.reminder.week_days.split(",") : Array<number>());
const reminder = ref<Reminder>({});
const ends = ref({ type: "", ends_at: "", ends_after_n: 0 });

watch(ends.value, async (newValue) => {
  if (newValue.type == "never") {
    reminder.value.ends_at = "";
    reminder.value.ends_after_n = 0;
  } else if (newValue.type == "occurrences") {
    if (newValue.ends_after_n < 1) {
      ends.value.ends_after_n = 1;
    }
    reminder.value.ends_at = "";
    reminder.value.ends_after_n = parseInt(newValue.ends_after_n);
  } else if (newValue.type == "date") {
    reminder.value.ends_at = newValue.ends_at;
    reminder.value.ends_after_n = 0;
  }
});

watch(() => selectedDays.value, async (newValue) => {
  if (reminder.value.interval != "Weekly") {
    reminder.value.week_days = "";
  } else {
    reminder.value.week_days = newValue.join(",");
  }
}, { deep: true });

onRenderTriggered((e) => {
  if (e.newValue !== true) {
    return;
  }
  const now = new Date();
  const today = [now.getFullYear(), ("00" + (now.getMonth() + 1)).slice(-2), ("00" + now.getDate()).slice(-2)].join("-");
  const time = [("00" + now.getHours()).slice(-2), ("00" + (now.getMinutes() + 1)).slice(-2)].join(":");
  reminder.value.id = !!props.reminder && !!props.reminder.id ? props.reminder.id : "";
  reminder.value.note_id = !!props.reminder && !!props.reminder.note_id ? props.reminder.note_id : props.note_id;
  reminder.value.user_id = !!props.reminder && !!props.reminder.user_id ? props.reminder.user_id : "";
  reminder.value.start_date = !!props.reminder && !!props.reminder.start_date ? props.reminder.start_date : today;
  reminder.value.start_time = !!props.reminder && !!props.reminder.start_time ? props.reminder.start_time : time;
  reminder.value.timezone = !!props.reminder && !!props.reminder.timezone ? props.reminder.timezone : Intl.DateTimeFormat().resolvedOptions().timeZone;
  reminder.value.interval = !!props.reminder && !!props.reminder.interval ? props.reminder.interval : "Daily";
  reminder.value.week_days = !!props.reminder && !!props.reminder.week_days ? props.reminder.week_days : "";
  reminder.value.ends_after_n = !!props.reminder && !!props.reminder.ends_after_n ? props.reminder.ends_after_n : 0;
  reminder.value.ends_at = !!props.reminder && !!props.reminder.ends_at ? props.reminder.ends_at : "";
  reminder.value.created_at = !!props.reminder && !!props.reminder.created_at ? props.reminder.created_at : "";
  reminder.value.updated_at = !!props.reminder && !!props.reminder.updated_at ? props.reminder.updated_at : "";

  ends.value.type = !!props.reminder && props.reminder.ends_after_n > 0 ? "occurrences" : props.reminder && !!props.reminder.ends_at ? "date" : "never";
  ends.value.ends_after_n = !!props.reminder && props.reminder.ends_after_n > 0 ? props.reminder.ends_after_n : 1;
  ends.value.ends_at = !!props.reminder && !!props.reminder.ends_at ? props.reminder.ends_at : today;

  selectedDays.value = !!props.reminder && !!reminder.value.week_days ? reminder.value.week_days.split(",") : [];
});

function addDay(day: number) {
  if (existDay(day)) {
    return;
  }
  selectedDays.value.push(day);
  selectedDays.value.sort();
}

function removeDay(day: number) {
  selectedDays.value = selectedDays.value.filter((el: Number) => el != day);
}

function existDay(day: number): boolean {
  return !!selectedDays.value.find((el: Number) => el == day);
}

</script>

<template>
  <v-menu
    location="bottom"
    :close-on-content-click="false"
    @update:model-value="(value) => emits('menu-updated', value)"
    v-model="menu"
  >
    <template v-slot:activator="{ props }">
      <slot :props="props" name="activator"></slot>
    </template>

    <v-card class="text-caption" min-width="320" max-width="350">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              v-model="reminder.start_date"
              type="date"
              density="compact"
              hide-details
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
          <v-col>
            <v-text-field
              v-model="reminder.start_time"
              type="time"
              density="compact"
              hide-details
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
          <v-col>
            <v-select
              :items="['Daily', 'Weekly', 'Monthly', 'Yearly']"
              variant="underlined"
              v-model="reminder.interval"
              hide-no-data
              single-line
            ></v-select>
            <div class="mt-n2 mb-2" v-show="reminder.interval == 'Weekly'">
              <v-chip class="rounded-chip pa-1 mr-2 mb-1 rounded-circle text-caption"
                      @click="existDay(7) ? removeDay(7) : addDay(7)"
                      :variant="existDay(7) ? 'elevated' : 'outlined'"
                      color="blue"
                      text="Sun"></v-chip>
              <v-chip class="rounded-chip pa-1 mr-2 mb-1 rounded-circle text-caption"
                      @click="existDay(1) ? removeDay(1) : addDay(1)"
                      :variant="existDay(1) ? 'elevated' : 'outlined'"
                      color="blue"
                      text="Mon"></v-chip>
              <v-chip class="rounded-chip pa-1 mr-2 mb-1 rounded-circle text-caption"
                      @click="existDay(2) ? removeDay(2) : addDay(2)"
                      :variant="existDay(2) ? 'elevated' : 'outlined'"
                      color="blue"
                      text="Tue"></v-chip>
              <v-chip class="rounded-chip pa-1 mr-2 mb-1 rounded-circle text-caption"
                      @click="existDay(3) ? removeDay(3) : addDay(3)"
                      :variant="existDay(3) ? 'elevated' : 'outlined'"
                      color="blue"
                      text="Wed"></v-chip>
              <v-chip class="rounded-chip pa-1 mr-2 mb-1 rounded-circle text-caption"
                      @click="existDay(4) ? removeDay(4) : addDay(4)"
                      :variant="existDay(4) ? 'elevated' : 'outlined'"
                      color="blue"
                      text="Thu"></v-chip>
              <v-chip class="rounded-chip pa-1 mr-2 mb-1 rounded-circle text-caption"
                      @click="existDay(5) ? removeDay(5) : addDay(5)"
                      :variant="existDay(5) ? 'elevated' : 'outlined'"
                      color="blue"
                      text="Fri"></v-chip>
              <v-chip class="rounded-chip pa-1 mr-2 mb-1 rounded-circle text-caption"
                      @click="existDay(6) ? removeDay(6) : addDay(6)"
                      :variant="existDay(6) ? 'elevated' : 'outlined'"
                      color="blue"
                      text="Sat"></v-chip>
            </div>
          </v-col>
        </v-row>
        <v-radio-group density="compact" class="text-caption mt-5" hide-details v-model="ends.type">
          <v-row>
            <v-divider></v-divider>
            <v-col cols="3">
              Ends
            </v-col>
            <v-col>
              <v-radio value="never" class="ml-n8">
                <template v-slot:label>
                  <div class="text-caption">Never</div>
                </template>
              </v-radio>
            </v-col>
          </v-row>
          <v-row class="mt-n1">
            <v-col cols="3"></v-col>
            <v-col cols="3">
              <v-radio value="occurrences" class="ml-n8 mt-n2">
                <template v-slot:label>
                  <div class="text-caption">After</div>
                </template>
              </v-radio>
            </v-col>
            <v-col cols="2">
              <v-text-field
                type="number"
                density="compact"
                hide-details
                variant="underlined"
                class="mt-n6 ml-n8"
                v-model="ends.ends_after_n"
              ></v-text-field>
            </v-col>
            <v-col>
              <div>occurrences</div>
            </v-col>
          </v-row>
          <v-row class="mt-n2">
            <v-col cols="3"></v-col>
            <v-col cols="3">
              <v-radio value="date" class="ml-n8 mt-n1">
                <template v-slot:label>
                  <div class="text-caption">On</div>
                </template>
              </v-radio>
            </v-col>
            <v-col>
              <v-text-field
                v-model="ends.ends_at"
                type="date"
                density="compact"
                hide-details
                variant="underlined"
                class="mt-n4 ml-n8 mb-5"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none" @click="store.saveReminder(reminder); menu = false;">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<style>
.rounded-chip {
  width: 33px;
  height: 33px;
}
</style>