<script setup lang="ts">
    import { capitalize } from 'vue';

    defineProps<{
        array: Array<{
            id: number,
            name: string,
            value: string,
            icon: string,
            product_id: string[],
        }>
    }>();
</script>

<template>
    <h2 v-for="(title, i) of array" class="flex flex-col md:flex-row text-4xl font-semibold" :key="i">
        {{ capitalize(`les ${title.name.toLocaleLowerCase()}`) }}
        <a class="m-1.5 p-1.5 text-base text-center text-white bg-(--secondary-color-3) rounded-lg"
            :href="`/products?categories=${title.value}`">{{ capitalize(`toutes les ${title.name.toLocaleLowerCase()}`) }}</a>
    </h2>
</template>