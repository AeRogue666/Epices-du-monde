<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
    as: string,
    title: string,
    to: string,
    icon: string,
    size: string,
    class?: string,
}>();
</script>

<template>
    <ULink :as="as" :to="to" class="flex flex-row items-center w-full text-(--color-text) gap-2" :class="class">
        <UIcon :name="icon" :size="size" />
        <span>{{ capitalize(title) }}</span>
    </ULink>
</template>