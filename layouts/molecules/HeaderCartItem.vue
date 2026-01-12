<script setup lang="ts">
import { UCard } from '#components';
import { capitalize } from 'vue';

defineProps<{
    product: any | null,
    quantity: number,
    unavailable: boolean,
}>();

defineEmits<{
    removeProductFromCart: [value: string]
}>();

const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;
</script>

<template>
    <UCard class="flex flex-row items-center w-full h-auto" :ui="{
        header: 'p-0 sm:p-0',
        body: 'p-0 sm:p-0 md:mx-auto',
        footer: 'p-0 ml-auto mr-2 sm:p-0'
    }">
        <!-- IMAGE -->
        <template #header>
            <a :href="`/product/${product.id}/${product.slug}`"
                class="flex flex-row items-center w-full h-auto no-underline gap-4 hover:text-blue-600">
                <NuxtPicture v-if="product.image" :src="`${apiPublicEndpoint}/assets/${product.image.id}`"
                    class="max-w-30 min-w-26 max-h-24 min-h-22 rounded-lg" :alt="product.image.description"
                    :width="product.image.width" :height="product.image.height" />
                <div v-else class="flex items-center justify-center w-26 h-22 bg-gray-200 rounded-lg">
                    <span>Image indisponible</span>
                </div>
            </a>
        </template>

        <!-- CONTENT -->
        <a :href="`/product/${product.id}/${product.slug}`"
            class="flex flex-col items-baseline w-full h-full no-underline gap-4 hover:text-blue-600">
            <h2 class="w-max text-xl font-semibold">
                {{ product ? capitalize(product.title) : capitalize('produit indisponible') }}
            </h2>
            <div class="flex flex-row justify-between items-center w-full h-full">
                <span class="text-base">{{ product ? `${product.price}` : '-' }} € </span>
                <span class="text-base">x {{ quantity }}</span>
                <span v-if="unavailable" class="text-sm text-red-500">{{ capitalize('ce produit n\'est plus disponible') }}</span>
            </div>
        </a>

        <!-- ACTION -->
        <template #footer>
            <div class="flex flex-col items-center">
                <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can"
                    @click.prevent="$emit('removeProductFromCart', product?.id)" />
            </div>
        </template>
    </UCard>
</template>