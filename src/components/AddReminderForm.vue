<script setup lang="ts">
import { computed, ref } from "vue";
import cronstrue from "cronstrue/i18n";

const emits = defineEmits(["menu-updated", "save-reminder"]);

const menu = ref(false);
const now = new Date();
const today = [now.getFullYear(), ("00" + (now.getMonth() + 1)).slice(-2), ("00" + now.getDate()).slice(-2)].join("-");
const date = ref(today);
const time = ref([("00" + now.getHours()).slice(-2), ("00" + now.getMinutes()).slice(-2)].join(":"));
const every = ref("Daily");
const selectedDays = ref(Array<Number>());
const ends = ref({
  type: "never",
  occurrences: 1,
  on: today
});

const endsOn = computed(() => {
  switch (ends.value.type) {
    case "date":
      return ". Ends on " + ends.value.on;
    case "occurrences":
      return ". Ends after " + ends.value.occurrences + " occurrences.";
    case "never":
    default:
      return "";
  }
});

const cron = computed(() => {
  const datePart = date.value.split("-");
  const timePart = time.value.split(":");
  const min = timePart[1];
  const hour = timePart[0];
  let day = "*";
  let month = "*";
  let week = "*";
  switch (every.value) {
    case "Daily":
      break;
    case "Weekly":
      week = selectedDays.value.length == 0 ? "*" : selectedDays.value.join(",");
      break;
    case "Monthly":
      day = datePart[2];
      break;
    case "Yearly":
      day = datePart[2];
      month = datePart[1];
      break;
  }
  return [min, hour, day, month, week].join(" ");
});

const humanReadable = computed(() => cronstrue.toString(cron.value));

function addDay(day: Number) {
  if (existDay(day)) {
    return;
  }
  selectedDays.value.push(day);
}

function removeDay(day: Number) {
  selectedDays.value = selectedDays.value.filter(el => el != day);
}

function existDay(day: Number): boolean {
  return !!selectedDays.value.find(el => el == day);
}

function save() {
  emits("save-reminder", {
    cron_expression: cron.value,
    ends_at: ends.value.type == "date" ? ends.value.on : "",
    repeats: ends.value.type == "occurrences" ? ends.value.occurrences : 0
  });
  menu.value = false
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
              v-model="date"
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
              v-model="time"
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
              v-model="every"
              hide-no-data
              single-line
            ></v-select>
            <div class="mt-n2 mb-2" v-show="every == 'Weekly'">
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
                v-model="ends.occurrences"
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
                v-model="ends.on"
                type="date"
                density="compact"
                hide-details
                variant="underlined"
                class="mt-n4 ml-n8 mb-5"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-radio-group>
        <v-row>
          <v-divider></v-divider>
          <v-col>
            <div class="text-subtitle-2">{{ humanReadable }}{{ endsOn }}</div>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none" @click="save">Save</v-btn>
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