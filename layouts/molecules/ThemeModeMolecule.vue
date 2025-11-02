<script setup lang="ts">
import { capitalize } from 'vue';

</script>

<template>
    <UContainer class="flex flex-row items-center gap-4">
        <span class="text-base font-semibold">{{ capitalize($t('header.settings.theme')) }}</span>
        <UColorModeSelect />
    </UContainer>
</template>