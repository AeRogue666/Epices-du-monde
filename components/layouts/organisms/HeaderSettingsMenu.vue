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
  themeValue = ref("light");

const themeStore = useThemeStore();

watch(themeValue, (newValue) => {
  themeStore.updateUserTheme(newValue);
});
</script>

<template>
  <UModal title="Paramètres" description="Paramétrer votre expérience" :overlay="false">
    <UButton class="bg-transparent rounded-xl gap-2" color="neutral" variant="subtle">
      <UIcon name="fa6-solid:ellipsis-vertical" class="text-lg" />
      {{ capitalize('settings') }}
    </UButton>
    <template #body>
      <UContainer class="flex flex-col items-start">
        <span class="text-lg font-semibold">{{ capitalize('theme') }}</span>
        <USelect v-model="themeValue" :items="themeItems" class="w-48" />
      </UContainer>
    </template>
  </UModal>
</template>