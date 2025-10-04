<script setup lang="ts">
import AvatarLinkMolecule from './AvatarLinkMolecule.vue';
</script>

<template>
    <AvatarLinkMolecule :as="'button'" :title="'login'" :to="'/auth/login'" :icon="'i-fa6-solid:circle-user'"
        :size="'text-2xl'" />
    <AvatarLinkMolecule :as="'button'" :title="'register'" :to="'/auth/register'"
        :icon="'i-fa6-solid:circle-user'" :size="'text-2xl'" />
</template>