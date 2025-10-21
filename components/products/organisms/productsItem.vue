<script setup lang="ts">
import { UCard, UIcon } from '#components';

defineProps<{
    product: {
        id: string,
        title: string,
        description: string,
        image: {
            id: string,
            description: string,
            width?: number,
            height?: number,
        },
        slug: string,
        price: number,
        reduction_rate?: number,
        old_price?: number,
        availability: {
            name?: string,
            value?: string,
            color?: string,
        },
    },
}>();
</script>

<template>
    <article class="relative group/blog-post rounded-lg overflow-hidden flex flex-col bg-default ring ring-default">
        <div class="relative overflow-hidden aspect-[16/9] w-full pointer-events-none">
            <NuxtPicture v-if="product.image" :src="`http://localhost:3000/directus/assets/${product.image.id}`"
                class="object-cover object-top w-full h-full rounded-lg" :alt="product.image.description"
                :width="product.image.width" :height="product.image.height" />
            <NuxtImg v-else
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg/960px-Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg"
                class="object-cover object-top w-full h-full  rounded-lg"
                alt="NASA/JPL-Caltech/ESA/CXC/STScI, Public domain, via Wikimedia Commons" />
        </div>
        <div class="min-w-0 flex-1 flex flex-col p-4 sm:p-6">
            <a :href="`/product/${product.id}/${product.slug}`" tabindex="-1" :aria-label="product.title"
                class="focus:outline-none peer">
                <span class="absolute inset-0" aria-hidden="true"></span>
            </a>
            <div class="flex flex-row justify-between items-center w-full mb-2">
                <div class="flex flex-row items-center w-auto gap-4">
                    <UIcon name="fa6-solid:circle" :style="`color: ${product.availability.color}`" />
                    <span class="text-base font-semibold">{{ product.availability.name }}</span>
                </div>
                <ProductsMoleculesProductsMoleculeItemFooter :product="product" />
            </div>
            <h2 class="text-xl text-pretty font-semibold text-highlighted">{{ product.title }}</h2>
            <div class="mt-1 text-base text-pretty text-muted">{{ product.description }}</div>
        </div>
    </article>
</template>

<!-- <a :href="`/product/${product.id}/${product.slug}`"
        class="flex w-72 h-[26.675rem] border-none no-hunderline hover:text-blue-600">
        <UCard class="relative group/blog-post rounded-lg overflow-hidden flex flex-col bg-default ring ring-default" :ui="{
            root: 'bg-(--color-semi-transparent) ring-transparent', // bg-unset
            header: 'mt-auto',
            body: 'h-full mt-auto',
            footer: 'mt-auto'
        }">
            <template #header>
                <div class="flex flex-row items-center w-full gap-4">
                    <UIcon name="fa6-solid:circle" :style="`color: ${product.availability.color}`" />
                    <span class="text-base font-semibold">{{ product.availability.name }}</span>
                </div>
            </template>

<div class="flex flex-col items-center w-full h-full gap-4">
    <NuxtPicture v-if="product.image" :src="`http://localhost:3000/directus/assets/${product.image.id}`"
        class="max-w-60 min-w-52 max-h-48 min-h-44 rounded-lg" :alt="product.image.description"
        :width="product.image.width" :height="product.image.height" />
    <NuxtImg v-else
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg/960px-Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg"
        class="max-w-60 min-w-52 max-h-48 min-h-44 rounded-lg"
        alt="NASA/JPL-Caltech/ESA/CXC/STScI, Public domain, via Wikimedia Commons" />

    <h2 class="text-3xl font-semibold">{{ product.title }}</h2>
</div>

<template #footer>
                <ProductsMoleculesProductsMoleculeItemFooter :product="product" />
            </template>
</UCard>
</a> -->