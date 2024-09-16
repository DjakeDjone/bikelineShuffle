<script setup lang="ts">

const model = defineModel({ type: String });

const props = defineProps({
    step: Number,
    showNext: {
        type: Boolean,
        default: true
    },
    showPrev: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: ''
    }
});

const emmits = defineEmits([
    'nextStep',
    'prevStep'
]);

const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            model.value = content;
        };
        reader.readAsText(file);
    }
};

</script>

<template>
    <div class="h-full w-full flex flex-col gap-4 justify-center items-center">
        <h1 class="text-2xl font-bold">
            Upload CSV file
        </h1>
        <p class="p-2 text-center max-w-md text-pretty">{{ description }}</p>
        <input type="file" class="file-input" @change="handleChange" />
        <div class="join gap-1">
            <button class="btn btn-primary join-item" @click="$emit('prevStep')" :disabled="!showPrev">Prev</button>
            <button class="btn btn-primary join-item" @click="$emit('nextStep')" :disabled="!showNext">
                Next</button>
        </div>
    </div>
</template>