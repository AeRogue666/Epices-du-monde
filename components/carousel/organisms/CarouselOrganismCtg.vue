<script setup lang="ts">
import { capitalize } from 'vue';

const categories = reactive<{
    label: string,
    link: string,
    img: {
        icon: string,
        color: string,
    },
}[]>([
    {
        label: 'Produits par pays',
        link: '/categories/all-flags',
        img: { icon: 'fa6-solid:flag', color: 'var(--grey3)' },
    },
    {
        label: 'Epices & Sauces',
        link: '/categories/epices-et-sauces',
        img: { icon: 'fa6-solid:pepper-hot', color: 'red' },
    },
    {
        label: 'Assaisonnements',
        link: '/products?filter=assaisonnements',
        img: { icon: 'fa6-solid:bottle-droplet', color: 'black' },
    },
    {
        label: 'Boissons alcoolisées',
        link: '/categories/boissons-alcoolisees',
        img: { icon: 'fa6-solid:beer-mug-empty', color: 'blue' },
    },
    {
        label: 'Boissons sans alcool & Soda',
        link: '/categories/boissons-soda',
        img: { icon: 'fa6-solid:glass-water', color: 'blue' },
    },
    {
        label: 'Thé, Tisanes & Bois. chaudes',
        link: '/categories/boissons-chaudes',
        img: { icon: 'fa6-solid:mug-hot', color: 'green' },
    },
    {
        label: 'Aperitifs & Collations',
        link: '/categories/aperitifs-collations',
        img: { icon: 'fa6-solid:stroopwafel', color: 'blue' },
    },
    {
        label: 'Sucre, miels',
        link: '/products?categories=sucre-miels',
        img: { icon: 'fa6-solid:cubes-stacked', color: 'blue' },
    },
    {
        label: 'Nouilles, pâtes & autres féculents',
        link: '/categories/feculents-sauces-prep',
        img: { icon: 'fa6-solid:bowl-food', color: 'blue' },
    },
    {
        label: 'Fruits & Légumes',
        link: '/categories/fruits-et-legumes',
        img: { icon: 'fa6-solid:apple-whole', color: 'green' },
    },
    {
        label: 'Produits de la mer',
        link: '/categories/produits-mer',
        img: { icon: 'fa6-solid:fish', color: 'blue' },
    },
    {
        label: 'Insectes comestibles',
        link: '/products?categories=insectes-comestibles',
        img: { icon: 'fa6-solid:bug', color: 'blue' },
    },
    {
        label: 'Cosmétiques',
        link: '/categories/cosmetiques',
        img: { icon: 'fa6-solid:seedling', color: 'blue' },
    },
    {
        label: 'Ustensiles de cuisine',
        link: '/products?categories=ustensiles-cuisine',
        img: { icon: 'fa6-solid:utensils', color: 'blue' },
    },
    {
        label: 'Encens, Baguettes & Décorations',
        link: '/categories/encens-baguettes-decorations',
        img: { icon: 'fa6-solid:grip-lines', color: 'blue' },
    },
]);
</script>

<template>
    <UContainer class="flex flex-col justify-center items-center w-full h-auto my-6 gap-6">
        <h2 class="text-4xl sm:text-5xl text-pretty text-highlighted tracking-tight font-semibold lg:mt-16">{{ capitalize($t('main.index.categories')) }}</h2>
        <UCarousel v-slot="{ item }" loop arrows dots :items="categories" :ui="{
            root: 'mb-6',
            viewport: 'overflow-hidden',
            container: 'transition-[height]',
            controls: '',
            dots: '',
            dot: 'w-6 h-1',
            item: 'xl:basis-1/3',
        }" :prev-icon="'fa6-solid:chevron-left'" :next-icon="'fa6-solid:chevron-right'"
            class="w-full max-w-xs xl:max-w-6xl mx-auto z-1">
            <a :href="item.link"
                class="flex flex-col items-center w-[18rem] h-[10rem] p-4 text-(--silver) cursor-pointer rounded-xl"
                :style="`background-color: ${item.img.color}`">
                <UIcon :name="item.img.icon" width="234" height="234" class="w-18 h-18" />
                <span class="w-full h-auto text-base text-center font-semibold p-4">{{ item.label }}</span>
            </a>
        </UCarousel>
    </UContainer>
</template>