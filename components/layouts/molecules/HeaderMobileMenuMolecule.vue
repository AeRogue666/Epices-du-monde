<script setup lang="ts">
    import type { ArrayOrNested, NavigationMenuItem } from '@nuxt/ui';

    defineProps<{
        items: ArrayOrNested<NavigationMenuItem> | undefined
    }>();
</script>

<template>
    <div id="mobile-menu"
        class="block w-auto min-w-[15rem] h-auto max-h-[90vh] bg-(--color-bg) absolute top-full left-0 overflow-y-scroll z-50">
        <UNavigationMenu highlight highlight-color="primary" orientation="vertical" :items="items" :ui="{
            label: 'text-3xl font-semibold',
            childList: 'sm:w-96',
            linkLabel: 'text-base truncate',
            linkTrailingIcon: 'text-xl',
        }" class="m-0 px-2 py-8 bg-(--color-bg) opacity-100" />
    </div>
</template>