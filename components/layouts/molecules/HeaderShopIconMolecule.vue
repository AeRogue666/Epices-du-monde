<script setup lang="ts">
import { capitalize } from 'vue';
import HeaderCartItem from './HeaderCartItem.vue';
import { getStorage } from '~/assets/js/storageFunctions';

const cartStore = useCartStore(),
    shoppingCart = cartStore.shoppingCart,
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
    }>>(),
    show = computed(() => newCart.value?.length !== null); // { shoppingCart } = storeToRefs(cartStore);

const removeCartProduct = (v: string) => {
    cartStore.removeFromShoppingCart(v)
    console.log(v);
};

if (import.meta.client) {
    newCart.value = getStorage('cart');
    onMounted(() => {
        console.log('show: ', show.value, ' shoppingCart: ', shoppingCart, ' newCart: ', newCart.value)
    })
}
</script>

<template>
    <USlideover :title="capitalize($t('header.cart.title'))"
        :description="capitalize($t('header.cart.description', shoppingCart.length))" side="right">
        <UChip :show="show" :text="newCart?.length.toLocaleString()" color="info" size="3xl" position="top-right">
            <UButton icon="i-fa6-solid:cart-shopping" color="neutral" variant="ghost" size="xl" class="rounded-full" />
        </UChip>

        <template #body>
            <div :show="!show">
                <UContainer v-for="product of newCart">
                    <HeaderCartItem :product="product" @product-id="removeCartProduct" />
                </UContainer>
            </div>
            <span v-if="show" class="text-sm">{{ capitalize($t('header.cart.no_product')) }}</span>
        </template>

        <template #footer>
            <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can"
                @click.prevent="cartStore.resetShoppingCart" class="w-auto border-2 border-solid rounded-lg" :ui="{
                    base: 'w-full'
                }">{{ capitalize($t('header.cart.reset_cart_content')) }}</UButton>
            <UButton color="success" variant="solid" to="/cart" size="xl" icon="i-fa6-solid:cart-shopping"
                trailing-icon="i-fa6-solid:arrow-right" class="w-auto border-2 border-solid rounded-lg" :ui="{
                    base: 'w-full'
                }">{{ capitalize($t('header.cart.view_cart')) }}</UButton>
        </template>
    </USlideover>
</template>