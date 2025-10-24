<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
    title: string;
    description?: any;
    ingredients?: string;
    allergies?: any;
    nutrition?: any;
    brand?: string;
    origin?: string;
    tags?: any;
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
            <ProductMoleculesProductDescriptionMarkdownMolecule v-if="description" :source="description" />
            <div class="flex flex-col items-baseline w-full h-full gap-6">
                <div v-if="ingredients" class="flex flex-col items-baseline">
                    <span>{{ capitalize($t('main.product.collapsible.ingredient')) }}:</span>
                    <ProductMoleculesProductDescriptionMarkdownMolecule :source="ingredients" />
                </div>
                <div v-if="allergies" class="flex flex-col items-baseline">
                    <span>{{ capitalize($t('main.product.collapsible.allergy')) }}:</span>
                    <div>{{ allergies }}</div>
                </div>
                <div v-if="nutrition" class="flex flex-col items-baseline">
                    <span>{{ capitalize($t('main.product.collapsible.nutrition')) }}:</span>
                    <div>{{ nutrition }}</div>
                </div>
                <span v-if="brand">{{ capitalize($t('main.product.collapsible.brand')) }}: {{ brand }}</span>
                <span v-if="origin">{{ capitalize($t('main.product.collapsible.origin')) }}: {{ origin }}</span>
                <div v-if="tags" class="flex flex-col items-baseline">
                    <span>{{ capitalize($t('main.product.collapsible.tag')) }}:</span>
                    <div>{{ tags }}</div>
                </div>
            </div>
        </template>
    </UCollapsible>
</template>