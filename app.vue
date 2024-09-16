<script setup lang="ts">
import { type BikelineDataRow } from './model/bikelineData';

const step = ref(0)

const dataHandler = useDataHandler()

const nextStep = () => {
  step.value++
}

const prevStep = () => {
  step.value--
}

</script>

<template>
  <main class="p-2 h-screen flex flex-col">
    <ul v-auto-animate class="h-full *:h-full">
      <li v-if="step === 0">
        <CSVInput :step="0" @update:modelValue="dataHandler.uploadData1($event)" @nextStep="nextStep"
          @prevStep="prevStep" :showPrev="false"
          description="Upload the CSV file from the last bikeline shuffling (probably one week ago). Just go to next step if the file is correct." />
      </li>
      <li v-else-if="step === 1">
        <CSVInput :step="1" @update:modelValue="dataHandler.uploadData2($event)" @nextStep="nextStep"
          @prevStep="prevStep" description="Upload the CSV file from the current bikeline shuffling" />

      </li>
      <li v-else-if="step === 2">
        <Shuffle />
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