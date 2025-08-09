<script setup lang="ts">
    import CarouselOrganismProducts from '~/components/carousel/organisms/CarouselOrganismProducts.vue';
    import CarouselOrganismCtg from '~/components/carousel/organisms/CarouselOrganismCtg.vue';
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-5xl font-semibold">Un large choix de produits</h1>
        <section class="flex flex-col items-center w-full my-6 gap-4">
            <h2 class="text-4xl font-semibold">Catégories</h2>
            <CarouselOrganismCtg />
            <CarouselOrganismProducts :categorie-params="'promotion'"  />
            <CarouselOrganismProducts :categorie-params="'nouveautes'" />
        </section>
    </div>
</template>