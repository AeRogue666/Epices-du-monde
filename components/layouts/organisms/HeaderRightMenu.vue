<script setup lang="ts">
import HeaderAvatarMenu from './HeaderAvatarMenu.vue';

const { search } = useSearchQueryStore(),
    piniaCart = usePiniaCartStore(),
    { cart, cartTotal, cartItemsCount } = storeToRefs(piniaCart),
    { isDesktop, isDesktopOrTablet, isTablet, isMobileOrTablet, isMobile } = useDevice();

const isAvatarMenuOpen = ref<boolean>(false),
    show = computed(() => cart.value.length !== 0);

const updateAvatarMenu = () => {
    isAvatarMenuOpen.value = !isAvatarMenuOpen.value
};
/* removeCartProduct = (v: string) => {
    cartStore.removeFromShoppingCart(v)
    console.log(v);
},
resetCartProduct = () => {
    cartStore.resetShoppingCart
    console.log(shoppingCart)
}; */

if (import.meta.client) {
    watch(usePiniaCartStore().$state, (state) => {
        console.log(cart.value, state.availibility, state.error)
    });
}
</script>

<template>
    <div class="flex flex-row justify-end items-center w-full px-6 gap-6">
        <LayoutsMoleculesHeaderSearchBarMobileVersion v-if="isMobile || isMobileOrTablet" :search="search" />
        <LayoutsMoleculesHeaderSearchBarDesktopVersion v-if="isDesktop" :search="search" />
        <!-- <LayoutsMoleculesHeaderShopIconMolecule :new-cart="newCart" :show="show" :shopping-cart="shoppingCart"
            @cart-product-id="removeCartProduct" @cart-reset="resetCartProduct" /> -->
        <LayoutsMoleculesHeaderPiniaShopIconMocule :items="cart" :total="cartTotal" :count="cartItemsCount" :show="show"
            @cart-reset="piniaCart.clearCart" @product-id="piniaCart.removeItem" />
        <UAvatar icon="fa6-solid:circle-user" class="text-4xl" size="xl" @click.prevent="updateAvatarMenu" />
        <HeaderAvatarMenu v-if="isAvatarMenuOpen == true" />
    </div>
</template>