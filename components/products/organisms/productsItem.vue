<script setup lang="ts">
    import { UCard, UIcon } from '#components';

    defineProps<{
        product: {
            id: number,
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
                name: string,
                value: string,
                color: string,
            },
        },
    }>();
</script>

<template>
    <a :href="`/product/${product.id}/${product.slug}`"
        class="flex w-72 h-[26.675rem] border-none no-hunderline hover:text-blue-600">
        <UCard class="flex flex-col items-center w-full h-auto" :ui="{
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
    </a>
</template>