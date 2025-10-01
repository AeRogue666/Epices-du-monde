<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
    product: {
        id: number,
        title: string,
        description: string,
        ingredients: string,
        slug: string,
        origine: string,
        marque: string,
        poids_net?: number,
        price: number,
        price_per_kg: number,
        reduction_rate?: number,
        old_price?: number,
        stock: number,
        availability?: { name: string; value: string; color: string; },
        image: object,
        tags?: [],
        allergies?: [],
        nutrition?: [],
        labels?: [],
    },
    cartNumber: number,
}>();

defineEmits<{
    change: [id: number],
}>();
const productNumber = defineModel({ default: 1 });
</script>

<template>
    <UContainer class="flex flex-col w-96 h-full border border-solid border-(--color-text)">
        <div class="flex flex-col items-start my-6 gap-4">
            <span class="text-base font-semibold">{{ product.price }} €</span>
            <span class="text-base">Poids net: {{ product.poids_net }}</span>
            <span class="text-base">1 kg = {{ product.price_per_kg }} €</span>
        </div>
        <div class="flex flex-col items-start my-6 gap-4">
            <span class="flex flex-row items-center text-base gap-2">
                <UIcon name="i-fa6-solid:circle" class="size-5" :class="product.availability?.color" />
                {{ capitalize('en stock') }}: {{ product.stock }}
            </span>
            <UContainer class="flex flex-col items-center">
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
                <UButton v-if="cartNumber < 0 && product.stock !== 0" color="neutral" variant="outline" size="xl"
                    icon="fa6-solid:cart-shopping" @click.prevent="$emit('change', productNumber)"
                    class="flex items-center w-auto h-auto min-w-[12rem] text-xl p-4 border-2 border-solid border-(--color-text) rounded-lg relative">
                    {{ capitalize('ajouter au panier') }}</UButton>
                <UButton v-else-if="cartNumber >= 0 && product.stock !== 0" color="neutral" variant="outline" size="xl"
                    icon="fa6-solid:cart-shopping"
                    class="flex items-center w-auto h-auto min-w-[12rem] text-xl p-4 rounded-lg relative">
                    {{ capitalize('déjà dans le panier') }}</UButton>
                <UButton v-else color="neutral" variant="outline" size="xl" icon="fa6-solid:cart-shopping"
                    class="flex items-center w-auto h-auto min-w-[12rem] text-xl p-4 rounded-lg relative">
                    {{ capitalize('aucun produit disponible') }}</UButton>
            </UContainer>
        </div>
    </UContainer>
</template>