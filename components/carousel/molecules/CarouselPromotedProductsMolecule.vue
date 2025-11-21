<script setup lang="ts">
import { capitalize, type Reactive } from 'vue';

defineProps<{
    products: Reactive<{
        id: string;
        label: string;
        slug: string;
        image?: {
            id: string,
            description: string,
            width: number,
            height: number,
        },
    }[]>
}>();
</script>

<template>
    <UCarousel v-slot="{ item }" autoplay loop dots :items="products" :ui="{
        root: 'mb-6',
        viewport: 'overflow-hidden',
        container: 'transition-[height]',
        dot: 'w-6 h-3',
        item: 'xl:basis-full',
    }" class="w-full lg:max-w-6xl mx-auto z-1">
        <a :href="`products?q=${item.slug}`"
            class="flex flex-col items-center p-4 text-(--silver) cursor-pointer rounded-xl"
            :aria-label="capitalize(item.label)">
            <img v-if="item.image"
                class="w-[100% + 2px] h-[100% + 2px] min-h-100 max-h-120 lg:min-h-120 lg:max-h-136 rounded-t-xl"
                :src="`/directus/assets/${item.image.id}`" :alt="item.image.description">
        </a>
    </UCarousel>
</template>