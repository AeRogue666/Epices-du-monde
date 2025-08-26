<script setup lang="ts">
import AvatarLinkMolecule from './AvatarLinkMolecule.vue';
</script>

<template>
    <AvatarLinkMolecule :as="'button'" :title="'my account'" :to="'/panel/profile'" :icon="'i-fa6-solid:circle-user'"
        :size="'text-2xl'" :class="'text-(--black)'" />
    <AvatarLinkMolecule :as="'button'" :title="'my favorites'" :to="'/panel/favorites'" :icon="'i-fa6-solid:heart'"
        :size="'text-2xl'" :class="'text-(--primary-color)'" />
</template>