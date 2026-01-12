<script setup lang="ts">
import HeaderPiniaShopIconMocule from '../molecules/HeaderPiniaShopIconMocule.vue';
import HeaderSearchBarDesktopVersion from '../molecules/HeaderSearchBarDesktopVersion.vue';
import HeaderSearchBarMobileVersion from '../molecules/HeaderSearchBarMobileVersion.vue';
import HeaderAvatarMenu from './HeaderAvatarMenu.vue';

const { search } = useFilterStore(),
    { isDesktop, isDesktopOrTablet, isTablet, isMobileOrTablet, isMobile } = useDevice();

const { cart, cartError } = useCartStore();


const isAvatarMenuOpen = ref<boolean>(false);

const updateAvatarMenu = () => {
    isAvatarMenuOpen.value = !isAvatarMenuOpen.value
};

if (import.meta.client) {
    console.log('search: ', search);
    console.log('cart product: ', cart[0]?.productId)
}

watch(() => cart, (newCart) => {
    console.log('Cart updated', newCart);
}, { deep: true });
</script>

<template>
    <UContainer class="flex flex-row justify-end items-end w-full px-6 gap-6">
        <HeaderSearchBarMobileVersion v-if="isDesktop || isMobileOrTablet" :search="search" />
        <HeaderSearchBarDesktopVersion v-else :search="search" />
        <HeaderPiniaShopIconMocule :error="cartError" />
        <UAvatar icon="fa6-solid:circle-user" class="text-4xl" size="xl" @click.prevent="updateAvatarMenu" />
        <HeaderAvatarMenu v-if="isAvatarMenuOpen == true" />
    </UContainer>
</template>