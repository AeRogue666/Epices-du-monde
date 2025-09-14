<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
    <ULink v-for="locale in availableLocales" :key="locale.code" class="w-48" @click.prevent.stop="setLocale(locale.code)">
        {{ locale.name }}
    </ULink>
</template>