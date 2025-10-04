<script setup lang="ts">
import CarouselOrganismProducts from '~/components/carousel/organisms/CarouselOrganismProducts.vue';
import CarouselOrganismCtg from '~/components/carousel/organisms/CarouselOrganismCtg.vue';
import { capitalize } from 'vue';
import CarouselPromotedProductsOrganism from '~/components/carousel/organisms/CarouselPromotedProductsOrganism.vue';

</script>

<template>
    <UContainer
        class="flex flex-col lg:grid py-24 sm:py-32 gap-16 sm:gap-y-12 lg:grid-cols-1 lg:items-center pb-0 sm:pb-0 lg:py-0">
        <h1 class="text-5xl sm:text-7xl text-pretty text-highlighted tracking-tight font-bold lg:mt-16">
            <span class="text-error">{{ capitalize($t('main.index.title')) }}</span>
            <br />
            {{ capitalize($t('main.index.subtitle')) }}
        </h1>
        <section class="flex flex-col items-center w-full my-6 gap-4">
            <CarouselPromotedProductsOrganism />
            <CarouselOrganismCtg />
            <CarouselOrganismProducts :categorie-params="'promotion'" />
            <CarouselOrganismProducts :categorie-params="'nouveautes'" />
        </section>
    </UContainer>
</template>