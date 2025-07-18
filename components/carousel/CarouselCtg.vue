<script setup lang="ts">
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
            link: '/categories/epices_et_sauces',
            img: { icon: 'fa6-solid:pepper-hot', color: 'red' },
        },
        {
            label: 'Assaisonnements',
            link: '/products?filter=assaisonnements',
            img: { icon: 'fa6-solid:bottle-droplet', color: 'black' },
        },
        {
            label: 'Boissons alcoolisées',
            link: '/categories/boissons_alcoolisees',
            img: { icon: 'fa6-solid:beer-mug-empty', color: 'blue' },
        },
        {
            label: 'Boissons sans alcool & Soda',
            link: '/categories/boissons_soda',
            img: { icon: 'fa6-solid:glass-water', color: 'blue' },
        },
        {
            label: 'Thé, Tisanes & Bois. chaudes',
            link: '/products?filter=the_tisanes_bois_chaudes',
            img: { icon: 'fa6-solid:mug-hot', color: 'green' },
        },
        {
            label: 'Aperitifs & Collations',
            link: '/categories/aperetifs_collations',
            img: { icon: 'fa6-solid:stroopwafel', color: 'blue' },
        },
        {
            label: 'Sucre, miels',
            link: '/categories/sucre_miels',
            img: { icon: 'fa6-solid:cubes-stacked', color: 'blue' },
        },
        {
            label: 'Nouilles, pâtes & autres féculents',
            link: '/categories/feculents_sauces_prep',
            img: { icon: 'fa6-solid:bowl-food', color: 'blue' },
        },
        {
            label: 'Fruits & Légumes',
            link: '/categories/fruits_et_legumes',
            img: { icon: 'fa6-solid:apple-whole', color: 'green' },
        },
        {
            label: 'Produits de la mer',
            link: '/categories/produits_mer',
            img: { icon: 'fa6-solid:fish', color: 'blue' },
        },
        {
            label: 'Insectes comestibles',
            link: '/categories/insectes_comestibles',
            img: { icon: 'fa6-solid:bug', color: 'blue' },
        },
        {
            label: 'Cosmétiques',
            link: '/categories/cosmetiques',
            img: { icon: 'fa6-solid:seedling', color: 'blue' },
        },
        {
            label: 'Ustensiles de cuisine',
            link: '/categories/ustensiles_cuisine',
            img: { icon: 'fa6-solid:utensils', color: 'blue' },
        },
        {
            label: 'Encens, Baguettes & Décorations',
            link: '/categories/encens_baguettes_decorations',
            img: { icon: 'fa6-solid:grip-lines', color: 'blue' },
        },
    ]);
</script>

<template>
    <section class="flex items-center mb-6">
        <UCarousel v-slot="{ item }" loop arrows :items="categories" :ui="{
            viewport: 'overflow-hidden',
            container: 'transition-[height]',
            controls: 'carousel-ctg--controls',
            dots: '-top-7',
            dot: 'w-6 h-1',
            item: 'm-4',
        }" :prev-icon="'fa6-solid:chevron-left'" :next-icon="'fa6-solid:chevron-right'"
            class="w-full max-w-xs mx-auto z-1">
            <a :href="item.link"
                class="flex flex-col items-center w-[18rem] h-[10rem] p-4 text-(--silver) cursor-pointer rounded-xl"
                :style="`background-color: ${item.img.color}`">
                <UIcon :name="item.img.icon" class="w-18 h-18" />
                <span class="w-full h-auto text-base text-center font-semibold p-4">{{ item.label }}</span>
            </a>
        </UCarousel>
    </section>
</template>
