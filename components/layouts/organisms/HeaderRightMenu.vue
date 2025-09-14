<script setup lang="ts">
import HeaderAvatarMenu from './HeaderAvatarMenu.vue';

const { search } = useSearchQueryStore(),
    isAvatarMenuOpen = ref<boolean>(false);

const { isDesktop, isDesktopOrTablet, isTablet, isMobileOrTablet, isMobile } = useDevice();

const updateAvatarMenu = () => {
    isAvatarMenuOpen.value = !isAvatarMenuOpen.value
};

</script>

<template>
    <div class="flex flex-row justify-end items-center w-full px-6 gap-6">
        <LayoutsMoleculesHeaderSearchBarMobileVersion v-if="isMobile || isMobileOrTablet" :search="search" />
        <LayoutsMoleculesHeaderSearchBarDesktopVersion v-if="isDesktop" :search="search" />
        <LayoutsMoleculesHeaderShopIconMolecule />
        <UAvatar icon="fa6-solid:circle-user" class="text-4xl" size="xl" @click.prevent="updateAvatarMenu" />
        <HeaderAvatarMenu v-if="isAvatarMenuOpen == true" />
    </div>
</template>