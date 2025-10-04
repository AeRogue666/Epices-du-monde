<script setup lang="ts">
import { capitalize } from 'vue';
import ThemeModeMolecule from '../molecules/ThemeModeMolecule.vue';
import LanguageSwitcher from '../molecules/LanguageSwitcher.vue';

</script>

<template>
  <UModal :title="capitalize($t('header.settings.title'))" :description="capitalize($t('header.settings.description'))"
    :overlay="false">
    <UButton class="bg-transparent rounded-xl gap-2" color="neutral" variant="subtle">
      <UIcon name="fa6-solid:ellipsis-vertical" class="text-lg" />
      {{ capitalize($t('header.settings.settings')) }}
    </UButton>
    <template #body>
      <ThemeModeMolecule />
      <UContainer>
        <span>{{ capitalize($t('header.settings.languages')) }}</span>
        <LanguageSwitcher />
      </UContainer>
    </template>
  </UModal>
</template>