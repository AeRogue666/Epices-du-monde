<script setup lang="ts">
import { capitalize } from 'vue';

const items = ref(['Dark', 'Light']),
    value = ref('Light');
</script>

<template>
    <UContainer class="flex flex-row items-center gap-4">
        <span class="text-base font-semibold">{{ capitalize($t('header.settings.theme')) }}</span>
        <UColorModeSelect v-model="value" :items="items" />
    </UContainer>
</template>