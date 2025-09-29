<script setup lang="ts">
import { UCard } from '#components';
import { capitalize } from 'vue';

defineProps<{
    product: {
        id: string,
        title: string,
        image: {
            id: string,
            description: string,
            width?: number,
            height?: number,
        },
        slug: string,
        poids_net: number,
        price: number,
        price_per_kg?: number,
        reduction_rate?: number,
        old_price?: number,
        stock: number,
        availability?: any,
        product_number: number,
    },
}>();

defineEmits<{
    productId: [value: string]
}>();

const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;
</script>

<template>
    <UCard class="flex flex-row items-center w-full h-auto" :ui="{
        header: 'p-0 sm:p-0',
        body: 'w-full h-auto p-0 sm:p-0 md:mx-6',
        footer: 'p-0 ml-auto mr-6 sm:p-0'
    }">
        <template #header>
            <a :href="`/product/${product.id}/${product.slug}`"
                class="flex w-full h-auto no-underline hover:text-blue-600">
                <NuxtPicture v-if="product.image" :src="`${apiPublicEndpoint}/assets/${product.image.id}`"
                    class="w-full max-w-90 min-w-24 max-h-auto min-h-12 rounded-lg" :alt="product.image.description"
                    :width="product.image.width" :height="product.image.height" />
                <NuxtImg v-else
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg/960px-Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg"
                    class="w-full max-w-90 min-w-24 max-h-auto min-h-12 rounded-lg"
                    alt="NASA/JPL-Caltech/ESA/CXC/STScI, Public domain, via Wikimedia Commons" />
            </a>
        </template>

        <a :href="`/product/${product.id}/${product.slug}`"
            class="flex flex-col items-baseline w-full h-full no-underline gap-4 hover:text-blue-600">
            <h2 class="w-max text-xl font-semibold">{{ capitalize(product.title) }}</h2>
            <div class="flex flex-row justify-between items-center w-full h-full">
                <span class="text-base">{{ capitalize('price') }}: {{ product.price }}€ </span>
                <span class="text-base">{{ capitalize('number') }}: {{ product.product_number }}</span>
            </div>
        </a>

        <template #footer>
            <div class="flex flex-row items-center w-full gap-4">
                <UIcon name="fa6-solid:circle" :style="`color: ${product.availability.color}`" />
                <span class="text-base font-semibold">{{ product.availability.name }}</span>
            </div>
            <div class="flex flex-col items-center">
                <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can"
                    @click.prevent="$emit('productId', product.id)" />
            </div>
        </template>
    </UCard>
</template>