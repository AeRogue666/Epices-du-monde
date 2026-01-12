import type { TableColumn } from "@nuxt/ui";
import { capitalize } from "vue";

const primaryColumns = reactive<string[]>([
    'per_100g',
    'per_30g',
    'rnj'
]);

export const productTableColumns: TableColumn<Nutrition>[] = [
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