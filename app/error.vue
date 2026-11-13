<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <UApp>
        <main class="min-h-screen flex items-center justify-center p-6">
            <UError :error="{
                statusCode: error?.status || 404,
                statusMessage: 'Page introuvable',
                message: 'La page que vous recherchez n\'existe pas ou a été déplacée.'
            }" :clear="{
                label: 'Retourner à l\'accueil',
                color: 'primary',
                size: 'xl',
                icon: 'fa6-solid:arrow-left',
                class: 'rounded-full',
            }" />
        </main>
    </UApp>
</template>