<script setup lang="ts">
import { capitalize } from 'vue';

const cartStore = useCartStore();
</script>

<template>
    <UContainer :show="cartStore.totalItems > 0" class="flex flex-col justify-center items-center w-full h-full gap-4">
        <h1 class="text-2xl font-semibold">{{ capitalize('shoppingCart') }}</h1>
        <UContainer v-for="product of cartStore.totalItems">
            <CartMoleculesCartItem :product="product" />
        </UContainer>
    </UContainer>
    <UContainer class="flex flex-col justify-center items-center w-full h-full gap-2">
        <span>{{ capitalize('shoppingCart') }}: {{ cartStore.totalItems }}</span>
    </UContainer>
    <div>
        <span v-if="cartStore.totalItems <= 0" class="text-sm">{{ capitalize($t('header.cart.no_product')) }}</span>
    </div>
</template>