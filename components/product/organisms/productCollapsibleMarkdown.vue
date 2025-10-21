<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
    title: string;
    description: string;
}>();
</script>

<template>
    <UCollapsible class="flex flex-col items-baseline gap-2 mx-6 my-3">
        <UButton class="group" color="neutral" variant="ghost" trailing-icon="fa6-solid:chevron-down" :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }" block>
            <span class="text-base font-semibold">{{ capitalize(title) }}</span>
        </UButton>
        <template #content>
            <ProductMoleculesProductDescriptionMarkdownMolecule :source="description" />
        </template>
    </UCollapsible>
</template>