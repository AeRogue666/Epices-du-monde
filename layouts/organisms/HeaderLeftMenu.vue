<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { capitalize } from 'vue';
import HeaderMobileMenuMolecule from '../molecules/HeaderMobileMenuMolecule.vue';
import HeaderTitleLink from '../atoms/HeaderTitleLink.vue';
import type { ArrayOrNested } from '@nuxt/ui/runtime/types/utils.js';

defineProps<{
    items: ArrayOrNested<NavigationMenuItem> | undefined
}>();

const isMenuOpen = defineModel<boolean>('isMenuOpen'),
    emit = defineEmits<{
        isMenuOpen: [value: boolean]
    }>(),
    headerMenuOpen = () => {
        emit('isMenuOpen', isMenuOpen.value = !isMenuOpen.value)
    };
</script>

<template>
    <nav class="sr-only">
        <NuxtLink to="#main">{{ capitalize($t('header.skip_content')) }}</NuxtLink>
    </nav>
    <div @click="headerMenuOpen">
        <UIcon v-if="!isMenuOpen" name="fa6-solid:bars" class="text-3xl" />
        <UIcon v-else name="fa6-solid:xmark" class="text-3xl" />
    </div>
    <!-- <HeaderTitleLink :class="'sr-only xl:not-sr-only'" /> -->
    <HeaderMobileMenuMolecule v-show="isMenuOpen == true" :items="items" />
</template>