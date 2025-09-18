<script setup lang="ts">
import { capitalize } from 'vue';
import { getStorage } from '~/assets/js/storageFunctions';

const cart = useCartStore(),
    shoppingCart = reactive(cart.shoppingCart),
    show = computed(() => shoppingCart.length !== 0),
    newCart = ref<Array<{
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
        availability: string,
        product_number: number,
    }>>([]);

if (import.meta.client) {
    newCart.value = getStorage('cart');

    onMounted(() => {
        console.log(shoppingCart, show.value);
    })
}
</script>

<template>
    <UContainer :show="!show" class="flex flex-col justify-center items-center w-full h-full gap-4">
        <span>{{ capitalize('shoppingCart') }}</span>
        <UContainer v-for="product of shoppingCart">
            <CartMoleculesCartItem :product="product" />
        </UContainer>
        <span>{{ capitalize('newCart') }}</span>
        <UContainer v-for="product of newCart">
            <CartMoleculesCartItem :product="product" />
        </UContainer>
    </UContainer>
    <UContainer class="flex flex-col justify-center items-center w-full h-full gap-2">
        <span>{{ capitalize('shoppingCart') }}: {{ shoppingCart }}</span>
        <span>{{ capitalize('show') }}: {{ show }}</span>
        <span>{{ capitalize('cart') }}: {{ newCart }}</span>
    </UContainer>
    <div>
        <span v-if="show" class="text-sm">{{ capitalize($t('header.cart.no_product')) }}</span>
    </div>
</template>