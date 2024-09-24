<script setup lang="ts">
import type { BikelineDataRow } from '~/model/bikelineData';



const shuffleHandler = useShuffelHandler()
const items = shuffleHandler.shuffleItems;



const choosenRow = ref<BikelineDataRow | undefined>(undefined)
const emit = defineEmits(['nextStep', 'prevStep'])

const stepBack = () => {
    emit('prevStep')
}

</script>

<template>
    <div class="p-2 h-full flex flex-col">
        <div class="h-full overflow-scroll">
            <BikelineList :items="items" :scrollToId="choosenRow?.id" class="mb-24" />
        </div>
        <nav class="fixed bottom-0 left-0 w-full backdrop-blur-md bg-base-100/70">
            <div v-auto-animate class="flex justify-between max-w-sm mx-auto my-4 gap-2"
                :class="{ '*:w-[calc(33.3%-1rem)]': choosenRow, '*:w-[calc(50%-.5rem)]': !choosenRow }">
                <button class="btn btn-primary" @click="shuffleHandler.shuffel()">Shuffle
                    <Icon name="svg-spinners:blocks-shuffle-3" size="20" />
                </button>
                <button class="btn btn-primary text-nowrap min-w-fit" @click="choosenRow = shuffleHandler.getRandRow()">
                    <span>
                        {{ choosenRow ? '' : 'Zufällige Auswahl' }}
                    </span>
                    <Icon name="game-icons:perspective-dice-six-faces-random" size="30" />
                </button>
                <button v-if="choosenRow" class="btn btn-primary"
                    @click="shuffleHandler.removeItem(choosenRow.id); choosenRow = undefined">
                    Entfernen
                </button>
            </div>
            <span class="fixed bottom-0 right-0 p-2 ">
                Items: {{ items?.length }}
            </span>
            <span class="fixed bottom-0 left-0 p-2 ">
                <button @click="stepBack()" class="btn btn-accent m-2">
                    <Icon name="mdi:restart" size="20" />
                    Zurück
                </button>
            </span>
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