<script setup lang="ts">
    const route = useRoute();

    const categorieContent = reactive<{
        id: string,
        name: string,
        image?: {
            url: string, description: string,
        },
        icon?: string,
        color?: string,
        children?: Array<{
            id: string,
            name: string,
            image?: string,
            icon?: string,
            color?: string,
        }>,
    }[]>([
        {
            id: 'all_flags',
            name: 'Produits par pays',
            icon: 'flag',
            color: 'grey3',
            children: [
                {
                    id: 'thailande',
                    name: 'Thaïlande',
                    icon: 'th-4x3',
                },
                {
                    id: 'coree',
                    name: 'Corée du sud',
                    icon: 'kr-4x3',
                },
                {
                    id: 'japon',
                    name: 'Japon',
                    icon: 'jp-4x3',
                },
                {
                    id: 'taiwan',
                    name: 'Taïwan',
                    icon: 'tw-4x3',
                },
                {
                    id: 'vietnam',
                    name: 'Vietnam',
                    icon: 'vn-4x3',
                },
                {
                    id: 'chine',
                    name: 'Chine',
                    icon: 'ch-4x3',
                },
            ]
        }
    ]);
</script>

<template>
    <div v-for="(ctg, i) of categorieContent" class="flex flex-col items-center" :key="i">
        <picture v-if="ctg.image">
            <img :href="ctg.image.url" :alt="ctg.image.description">
            <h1 class="text-5xl font-semibold">{{ ctg.name }}</h1>
        </picture>
        <a :href="'/products?filter=' + ctg.id"
            class="flex flex-col items-center w-full h-auto p-4 text-(--color-text) cursor-pointer rounded-xl"
            :style="`background-color: ${ctg.color}`">
            <h1 class="flex items-center text-5xl font-semibold gap-4"><UIcon :name="`fa6-solid:${ctg.icon}` || ''" class="w-9 h-9" /> {{ ctg.name }}</h1>
        </a>
        <ul class="grid grid-cols-3 items-center">
            <li v-for="(item, i) of ctg.children" :key="i">
                <a :href="'/products?filter=' + item.id"
                    class="flex flex-col items-center w-full h-[10rem] p-4 text-(--silver) cursor-pointer rounded-xl"
                    :style="`background-color: ${item.color}`">
                    <UIcon :name="`flag:${item.icon}` || ''" class="w-18 h-18" />
                    <span class="w-full h-auto text-base text-center font-semibold text-(--color-text) p-4">{{ item.name }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>