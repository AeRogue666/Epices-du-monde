<script setup lang="ts">
import { capitalize } from 'vue';

const themeItems = ref([
  {
    label: "Clair",
    value: "light",
  },
  {
    label: "Sombre",
    value: "dark",
  },
]),
  themeValue = ref("light"),
  themeStore = useThemeStore();

watch(themeValue, (newValue) => {
  themeStore.updateUserTheme(newValue);
});
</script>

<template>
  <UModal :title="capitalize($t('header.settings.title'))" :description="capitalize($t('header.settings.description'))" :overlay="false">
    <UButton class="bg-transparent rounded-xl gap-2" color="neutral" variant="subtle">
      <UIcon name="fa6-solid:ellipsis-vertical" class="text-lg" />
      {{ capitalize($t('header.settings.settings')) }}
    </UButton>
    <template #body>
      <UContainer class="flex flex-col items-start">
        <span class="text-lg font-semibold">{{ capitalize($t('header.settings.theme')) }}</span>
        <USelect v-model="themeValue" :items="themeItems" class="w-48" />
      </UContainer>
      <UContainer>
        <span>{{ capitalize($t('header.settings.languages')) }}</span>
        <LayoutsMoleculesLanguageSwitcher />
      </UContainer>
    </template>
  </UModal>
</template>