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
            el.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                }
            )
        }
    }
})

</script>

<template>
    <TransitionGroup name="list" tag="ul"
        class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <li v-for="item in items" :key="item.id">
            <div class="w-full btn btn-primary" :id="item.id" :class="{ '!btn-secondary': item.id === scrollToId }">
                {{ item.name }}
                ({{ item.trips }} Fahrten)
            </div>
        </li>
    </TransitionGroup>
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
</style>