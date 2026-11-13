<script setup lang="ts">
import { capitalize } from 'vue';

const props = defineProps<{
    product: Product,
    isProductInCart: ComputedRef<boolean>,
    isQuantityAvailable: ComputedRef<boolean>,
}>();

defineEmits<{
    change: [id: number],
}>();

const productNumber = defineModel({ default: 1 });
</script>

<template>
    <UContainer class="flex flex-col items-center my-4">
        <UFormField label="Nombre de produits" help="" class="mt-6 mb-9" required>
            <UInputNumber v-if="product.stock > 0" v-model="productNumber" :default-value="1" :min="1"
                :max="product.stock" size="xl" placeholder="Spécifier le nombre de produits"
                :increment="{ color: 'neutral', variant: 'solid', size: 'xl' }"
                :decrement="{ color: 'neutral', variant: 'solid', size: 'xl' }" :ui="{
                    increment: 'pe-0',
                    decrement: 'ps-0',
                }" />
            <UInputNumber v-else v-model="product.stock" size="xl" placeholder="Ce produit n'est plus disponible"
                :increment="{ color: 'neutral', variant: 'solid', size: 'xl' }"
                :decrement="{ color: 'neutral', variant: 'solid', size: 'xl' }" disabled />
        </UFormField>
        <UButton
            v-if="(!isProductInCart.value || isProductInCart.value) && isQuantityAvailable.value && product.stock > 0"
            color="neutral" variant="outline" size="xl" icon="fa6-solid:cart-shopping"
            @click.prevent="$emit('change', productNumber)"
            class="flex items-center w-auto h-auto min-w-48 text-xl p-4 border-2 border-solid border-(--color-text) rounded-lg relative"
            key="add-to-cart">
            {{ capitalize('ajouter au panier') }}</UButton>
        <UButton v-else color="neutral" variant="outline" size="xl" icon="fa6-solid:cart-shopping"
            class="flex items-center w-auto h-auto min-w-48 text-xl p-4 rounded-lg relative" key="not-available-to-cart"
            disabled>
            {{ capitalize('aucun produit disponible') }}</UButton>
    </UContainer>
</template>