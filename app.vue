<script setup lang="ts">
import { type BikelineData, type BikelineDataRow } from './model/bikelineData';

const step = ref(0)

const dataHandler = useDataHandler()

const nextStep = () => {
  step.value++
}

const prevStep = () => {
  step.value--
}
const filename = ref<string | null>(null)

const formatLastDataFileName = (file: BikelineData | null): string | undefined => {
  if (file) {
    // '2021-09-01_20Items.csv'
    const date = new Date(file.date)
    return `${date.toLocaleDateString()}.csv, (${file.rows.length} items)`

  }
  return undefined
}

</script>

<template>
  <main class="p-2 h-screen flex flex-col">
    <ul v-auto-animate class="h-full *:h-full">
      <li v-if="step === 0">
        <CSVInput :step="0" @update:modelValue="dataHandler.uploadData1($event, filename ?? '')"
          v-bind:filename="filename" @nextStep="nextStep" @prevStep="prevStep" :showPrev="false"
          :lastDataFile="formatLastDataFileName(dataHandler.data1.value)"
          description="Upload the CSV file from the last bikeline shuffling (probably one week ago). Just go to next step if the file is correct."
          @deleteFile="dataHandler.removeData1()" />
      </li>
      <li v-else-if="step === 1">
        <CSVInput :step="1" @update:modelValue="dataHandler.uploadData2($event, filename ?? '')"
          v-bind:filename="filename" @nextStep="nextStep" @prevStep="prevStep"
          description="Upload the CSV file from the current bikeline shuffling" />

      </li>
      <li v-else-if="step === 2">
        <Shuffle @nextStep="nextStep" @prevStep="prevStep" />
      </li>
    </ul>
    <div v-if="step !== 2" class="flex justify-center">
      <ul class="steps *:cursor-pointer">
        <li class="step" :class="{ 'step-info': step >= 0 }" @click="step = 0">previour CSV data</li>
        <li class="step" :class="{ 'step-info': step >= 1 }" @click="step = 1">current CSV data</li>
        <li class="step" :class="{ 'step-info': step >= 2 }" @click="step = 2">Shuffle and choose random</li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
/* #main {
  background-image: url('/BikelineStreetBG.png');
} */

/* nav {
  background-image: url('/BikelineHeader.png');
  background-size: cover;
  background-position: center;
} */
</style>