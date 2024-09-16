<script setup lang="ts">
import type { BikelineDataRow } from '~/model/bikelineData';


const shuffleHandler = useShuffelHandler()
const items = shuffleHandler.shuffleItems;



const choosenRow = ref<BikelineDataRow | undefined>(undefined)

</script>

<template>
    <div class="p-2 h-full flex flex-col">
        <div class="h-full overflow-scroll">
            <BikelineList :items="items" :scrollToId="choosenRow?.id" class="mb-24" />
        </div>
        <nav class="fixed bottom-0 left-0 w-full backdrop-blur-md bg-base-content/30">
            <div class="flex justify-between max-w-sm mx-auto my-4 gap-2">
                <button class="btn btn-primary w-1/2" @click="shuffleHandler.shuffel()">Shuffle</button>
                <button class="btn btn-primary w-1/2" @click="choosenRow = shuffleHandler.getRandRow()">
                    Choose Random
                </button>
                <span class="fixed bottom-0 right-0 p-2 ">
                    Items: {{ items?.length }}
                </span>
            </div>
        </nav>
    </div>
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