<script setup lang="ts">
import { capitalize } from 'vue';

const { locale, locales, setLocale } = useI18n()
</script>

<template>
  <UContainer class="flex flex-row items-center gap-4">
    <span class="text-base font-semibold">{{ capitalize($t('header.settings.languages')) }}</span>
    <ULocaleSelect v-model="locale" :locales="locales" @update:model-value="setLocale($event)" />
  </UContainer>
</template>