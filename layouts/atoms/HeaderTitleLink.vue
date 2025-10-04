<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
    class?: string,
}>();
</script>

<template>
    <ULink to="/" class="flex justify-center" :class="class">
        <span class="title text-3xl font-semibold text-(--color-logo)">{{ capitalize('epices du Monde') }}</span>
    </ULink>
</template>