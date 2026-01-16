<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import HeaderTitleLink from './atoms/HeaderTitleLink.vue';
import HeaderRightMenu from './organisms/HeaderRightMenu.vue';
import HeaderMobileMenuMolecule from './molecules/HeaderMobileMenuMolecule.vue';
import { capitalize } from 'vue';
import { headerCategoryGroups } from '~/config/headerCategories';

const itemsCategories = computed<NavigationMenuItem[]>(() => headerCategoryGroups)
</script>

<template>
    <header
        class="backdrop-blur border-b border-default h-(--ui-header-height) top-0 z-50 flex flex-row justify-start items-center w-full min-h-28 px-0 bg-(--color-bg) fixed gap-6">
        <UContainer
            class="w-full max-w-(--ui-container) mx-auto pl-4 pr-0 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">
            <UContainer name="left" class="lg:flex-1 flex items-center gap-1.5">
                <nav class="sr-only">
                    <NuxtLink to="#main">{{ capitalize($t('header.skip_content')) }}</NuxtLink>
                </nav>
                <HeaderMobileMenuMolecule :items="itemsCategories" />
                <HeaderTitleLink highlight highlight-color="neutral" :class="'sr-only xl:not-sr-only'" />
            </UContainer>
        </UContainer>

        <UContainer name="right" class="flex items-center justify-end lg:flex-1 gap-1.5">
            <HeaderRightMenu />
        </UContainer>
    </header>
</template>