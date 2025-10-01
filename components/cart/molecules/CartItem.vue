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
const productNumber = defineModel({ default: 1 });

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

        <!-- <a :href="`/product/${product.id}/${product.slug}`"
            class="flex flex-col items-baseline w-full h-full no-underline gap-4 hover:text-blue-600">
            <h2 class="w-max text-xl font-semibold">{{ capitalize(product.title) }}</h2>
            <div class="flex flex-row justify-between items-center w-full h-full">
                <span class="text-base">{{ capitalize('price') }}: {{ product.price }}€ </span>
                <span class="text-base">{{ capitalize('number') }}: {{ product.product_number }}</span>
            </div>
        </a> -->

        <UContainer class="flex flex-col items-baseline w-full h-full no-underline gap-4">
            <a :href="`/product/${product.id}/${product.slug}`" class="no-underline hover:text-blue-600">
                <h2 class="w-max text-xl font-semibold">{{ capitalize(product.title) }}</h2>
            </a>
            <UContainer class="flex flex-row justify-between items-center w-full h-full gap-6">
                <UFormField label="Nombre de produits" help="" class="mt-6 mb-9" required>
                    <UInputNumber v-if="product.stock !== 0" v-model="productNumber" :default-value="1" :min="1"
                        :max="product.stock" size="xl" placeholder="Spécifier le nombre de produits"
                        :increment="{ color: 'neutral', variant: 'solid', size: 'xl' }"
                        :decrement="{ color: 'neutral', variant: 'solid', size: 'xl' }" />
                    <UInputNumber v-else v-model="product.stock" size="xl"
                        placeholder="Ce produit n'est plus disponible"
                        :increment="{ color: 'neutral', variant: 'solid', size: 'xl' }"
                        :decrement="{ color: 'neutral', variant: 'solid', size: 'xl' }" disabled />
                </UFormField>
                <span class="text-md font-semibold">{{ capitalize('price') }}: {{ product.price }}€ </span>
            </UContainer>
        </UContainer>

        <template #footer>
            <div
                class="flex flex-row items-center w-full absolute top-[5%] left-[90%] gap-4 md:top-[9%] md:left-[90%] xl:top-[7.9%] xl:left-[90%] 2xl:top-[9%]">
                <UIcon name="fa6-solid:circle" :style="`color: ${product.availability.color}`" />
            </div>
            <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can" class="relative"
                @click.prevent="$emit('productId', product.id)" />
        </template>
    </UCard>
</template>