<script setup lang="ts">
import type { BikelineDataRow } from '~/model/bikelineData';


const props = defineProps({
    items: Array as PropType<BikelineDataRow[]>,
    scrollToId: {
        type: String,
        default: undefined
    }
})

// watch if scrollToId changes and scroll to the element with the id
watch(() => props.scrollToId, (id) => {
    if (id) {
        const el = document.getElementById(id)
        console.log('scroll to', id, el);

        if (el) {
            // scroll to the element so that it is in the middle of the screen
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })
        }
    }
})

</script>

<template>
    <main>
        <div v-if="props.scrollToId != undefined"
            class="w-full h-32 bg-base-200 rounded-lg flex justify-center items-center">
        </div>
        <TransitionGroup name="list" tag="ul"
            class="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            <li v-for="item in items" :key="item.id" :class="{ 'selected-item': props.scrollToId === item.id }">
                <div class="w-full flex flex-col btn btn-primary" :id="item.id"
                    :class="{ '!btn-secondary': item.id === scrollToId }">
                    <p>
                        {{ item.name }}
                    </p>
                    <i>
                        ({{ item.trips }} Fahrten)
                    </i>
                </div>
            </li>
        </TransitionGroup>
    </main>
</template>

<style>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all .7s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}

/* .selected-item {
    transition: all 3s ease-in-out;
    top: -50%;
    left: -50%;
    transform: translateX(50%) translateY(50%);
} */
</style>
