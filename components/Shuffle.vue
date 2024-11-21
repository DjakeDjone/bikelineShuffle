<script setup lang="ts">
import type { BikelineDataRow } from '~/model/bikelineData';



const shuffleHandler = useShuffelHandler()
const items = shuffleHandler.shuffleItems;
const show_result = ref(false)



const choosenRow = ref<BikelineDataRow | undefined>(undefined)
const emit = defineEmits(['nextStep', 'prevStep'])

const stepBack = () => {
    emit('prevStep')
}

watch(() => choosenRow.value, (row) => {
    show_result.value = true;
})

</script>

<template>
    <div class="p-2 h-full flex flex-col">
        <div class="h-full overflow-scroll">
            <div v-auto-animate class="fixed top-0 left-0 right-0">
                <div v-if="choosenRow && show_result"
                    class="backdrop-blur-md bg-base-100/70 flex justify-center items-center">
                    <div class="p-2 w-full max h-full flex flex-col justify-center items-center">
                        <button @click="show_result = false" class="absolute top-0 right-0 m-4 btn btn-accent">
                            <Icon name="mdi:close" size="20" />
                        </button>
                        <div class="w-[32rem] min-w-fit p-4 bg-base-200 rounded-lg">
                            <h2 class="text-6xl font-bold">{{ choosenRow.name }}</h2>
                            <p>{{ choosenRow.trips }} Fahrten</p>
                        </div>
                    </div>
                </div>
            </div>
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