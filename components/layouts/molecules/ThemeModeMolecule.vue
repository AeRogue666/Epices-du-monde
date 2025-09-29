<script setup lang="ts">
import { capitalize } from 'vue';

const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set(_isDark) {
        colorMode.preference = _isDark ? 'dark' : 'light';
    }
});

</script>

<template>
    <UContainer class="flex flex-row items-center gap-4">
        <span class="text-base font-semibold">{{ capitalize($t('header.settings.theme')) }}</span>
        <ClientOnly v-if="!colorMode.forced">
            <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="ghost"
                :label="capitalize(`switch to ${isDark ? 'light' : 'dark'} mode`)" @click="isDark = !isDark">
                <template #fallback>
                    <div class="size-8" />
                </template>
            </UButton>
        </ClientOnly>
    </UContainer>
</template>