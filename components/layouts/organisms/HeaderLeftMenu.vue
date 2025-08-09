<script setup lang="ts">
    import { capitalize } from 'vue';

    const isMenuOpen = defineModel<boolean>('isMenuOpen'),
        emit = defineEmits<{
            isMenuOpen: [value: boolean]
        }>(),
        headerMenuOpen = () => {
            emit('isMenuOpen', isMenuOpen.value = !isMenuOpen.value)
        }
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
</template>