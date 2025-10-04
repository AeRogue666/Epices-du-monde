<script setup lang="ts">
import { capitalize } from 'vue';

const route = useRoute(),
    fullPath = route.fullPath.replace('/', '');
</script>

<template>
    <UContainer class="max-w-[100rem] text-center gap-6">
        <h1
            class="text-5xl sm:text-7xl text-pretty text-highlighted tracking-tight font-bold leading-none mb-4 sm:text-[7rem] lg:mt-16 tabular-nums text-[5rem]">
            <span class="text-error">404</span>
        </h1>
        <span class="font-semibold mb-2 sm:text-3xl text-2xl">{{ capitalize('page not found:') }} {{ fullPath }}</span>
        <UContainer class="flex flex-row justify-center items-center w-full h-auto mt-6">
            <ULink href="/" class="font-medium hover:text-[--secondary-color-3] text-sm underline underline-offset-3">
                {{ capitalize('go back home') }}
            </ULink>
        </UContainer>
    </UContainer>
</template>