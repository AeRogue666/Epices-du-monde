<script setup lang="ts">
    import type { ArrayOrNested, NavigationMenuItem } from '@nuxt/ui';
    import HeaderMobileMenuMolecule from '../molecules/HeaderMobileMenuMolecule.vue';
    import { capitalize } from 'vue';

    defineProps<{
        items: ArrayOrNested<NavigationMenuItem> | undefined
    }>();

    const isMenuOpen = defineModel<boolean>('isMenuOpen'),
        emit = defineEmits<{
            isMenuOpen: [value: boolean]
        }>();

    const headerMenuOpen = () => {
        emit('isMenuOpen', isMenuOpen.value = !isMenuOpen.value)
    };
</script>

<template>
    <nav class="sr-only">
        <NuxtLink to="#main">{{ capitalize('skip to the main content') }}</NuxtLink>
    </nav>
    <div @click="headerMenuOpen">
        <UIcon v-if="!isMenuOpen" name="fa6-solid:bars" class="text-3xl" />
        <UIcon v-else name="fa6-solid:xmark" class="text-3xl" />
    </div>
    <a href="/">
        <span class="title text-3xl font-semibold text-(--color-logo)">{{ capitalize('epices du Monde') }}</span>
    </a>
    <HeaderMobileMenuMolecule v-show="isMenuOpen == true" :items="items" />
</template>