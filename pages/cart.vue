<script setup lang="ts">
import { capitalize } from 'vue';

const cart = usePiniaCartStore(),
    shoppingCart = reactive(cart.cart),
    show = computed(() => cart.cartItemsCount !== 0);

if (import.meta.client) {
    cart.loadCartFromLocalStorage
    onMounted(() => {
        console.log(shoppingCart, show.value);
    })
}
</script>

<template>
    <UContainer :show="show" class="flex flex-col justify-center items-center w-full h-full gap-4">
        <h1 class="text-2xl font-semibold">{{ capitalize('shoppingCart') }}</h1>
        <UContainer v-for="product of shoppingCart">
            <CartMoleculesCartItem :product="product" />
        </UContainer>
    </UContainer>
    <UContainer class="flex flex-col justify-center items-center w-full h-full gap-2">
        <span>{{ capitalize('shoppingCart') }}: {{ shoppingCart }}</span>
    </UContainer>
    <div>
        <span v-if="!show" class="text-sm">{{ capitalize($t('header.cart.no_product')) }}</span>
    </div>
</template>