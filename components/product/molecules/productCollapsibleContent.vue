<script setup lang="ts">
import { UTable } from '#components';
import type { TableColumn } from '@nuxt/ui';
import { capitalize } from 'vue';

defineProps<{
    title: string;
    description?: any;
    ingredients?: string;
    allergies?: any;
    nutrition?: Nutrition[];
    brand?: string;
    origin?: string;
    tags?: any;
}>();

const primaryColumns = reactive<string[]>([
    'per_100g',
    'per_30g',
    'rnj'
]);

const columns: TableColumn<Nutrition>[] = [
    {
        accessorKey: "primary_column",
        header: "",
        cell: () => {
            return primaryColumns.map((item) => h('span', { class: 'text-left font-medium'}, capitalize($t('main.product.nutrition.' + item))))
        }
    },
    {
        accessorKey: "energie",
        header: () => h('div', { class: 'text-left' }, capitalize($t('main.product.nutrition.energy'))),
        cell: ({ row }) => {
            const amountKJ = Number.parseInt(row.getValue('energie'))
            const formattedKCal = Math.round(amountKJ / 4.184)
            return h('span', { class: 'text-left font-medium'}, formattedKCal)
        }
    },
    {
        accessorKey: "matieres_grasses",
        header: capitalize($t('main.product.nutrition.fat')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('matieres_grasses')} g`)
        }
    },
    {
        accessorKey: "acide_gras_satures",
        header: capitalize($t('main.product.nutrition.satured_fat')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('acide_gras_satures')} g`)
        }
    },
    {
        accessorKey: "glucides",
        header: capitalize($t('main.product.nutrition.glucides')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('glucides')} g`)
        }
    },
    {
        accessorKey: "sucres",
        header: capitalize($t('main.product.nutrition.sugar')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('sucres')} g`)
        }
    },
    {
        accessorKey: "fibres",
        header: capitalize($t('main.product.nutrition.fiber')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('fibres')} g`)
        }
    },
    {
        accessorKey: "proteines",
        header: capitalize($t('main.product.nutrition.proteine')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('proteines')} g`)
        }
    },
    {
        accessorKey: "sel",
        header: capitalize($t('main.product.nutrition.salt')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('sel')} g`)
        }
    },
    {
        accessorKey: "edulcorants",
        header: capitalize($t('main.product.nutrition.edulcorant')),
        cell: ({ row }) => {
            return h('span', `${row.getValue('edulcorants')} g`)
        }
    }
]
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
                    <UTable :data="nutrition" :columns="columns" />
                    <ProductMoleculesProductTable :nutrition="nutrition" />
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