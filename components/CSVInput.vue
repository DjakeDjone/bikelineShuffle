<script setup lang="ts">

const model = defineModel({ type: String });
const modelFileName = defineModel('filename');

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
    },
    lastDataFile: {
        type: String,
    }
});

const emmits = defineEmits([
    'nextStep',
    'prevStep',
    'deleteFile'
]);

// const handleChange = (e: Event) => {
//     const target = e.target as HTMLInputElement;
//     const file = target.files?.item(0);
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const content = e.target?.result as string;
//             modelFileName.value = file.name;
//             model.value = content;
//         };
//         reader.readAsText(file);
//     }
// };
const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (file) {
        console.log(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("onload");

            const content = e.target?.result as ArrayBuffer;
            // it's german but with a lot of special characters
            const decoder = new TextDecoder('windows-1252');
            const decoded = decoder.decode(content);
            modelFileName.value = file.name;
            model.value = decoded;
        };

        reader.readAsArrayBuffer(file);
    }
};

</script>

<template>
    <div class="h-full w-full flex flex-col gap-4 justify-center items-center">
        <h1 class="text-2xl font-bold">
            CSV Daten hochladen
        </h1>
        <p class="p-2 text-center max-w-md text-pretty">{{ description }}</p>

        <div v-if="lastDataFile">
            <label for="file" class="text-pretty">Last file uploaded:
                <span class="badge badge-info p-3 inner-flex justify-between items-center">
                    <p>
                        {{ lastDataFile }}
                    </p>
                    <button class="mx-2" @click="$emit('deleteFile')">
                        <Icon name="mdi:delete" size="20" />
                    </button>
                </span>
            </label>
        </div>

        <input type="file" class="file-input" @change="handleChange" />
        <div class="join gap-1">
            <button class="btn btn-primary join-item" @click="$emit('prevStep')" :disabled="!showPrev">Prev</button>
            <button class="btn btn-primary join-item" @click="$emit('nextStep')" :disabled="!showNext">
                Next</button>
        </div>
    </div>
</template>