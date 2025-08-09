<script setup lang="ts">
    import { capitalize } from 'vue';

    const route = useRoute();

    const categorieList = reactive<{
        id: string,
        label: string,
        to: string,
        icon?: string,
        color?: string,
        children: number[],
    }[]>([
        {
            id: 'all-flags',
            label: 'Produits par pays',
            to: 'thailande,coree,japon,taiwan,vietnam,chine',
            icon: 'fa6-solid:flag',
            color: 'var(--grey3)',
            children: [1, 2, 3, 4, 5, 6],
        },
        {
            id: 'epices-et-sauces',
            label: 'Epices & Sauces',
            to: 'epices-en-gros,epices-en-100g,curry-asiatiques,curry-produits-inde,sauce-soja,sauce-poisson-nuoc-man,sauce-a-huitres,sauces-epicees,huiles-et-vinaigres,sauces-diverses',
            icon: 'fa6-solid:pepper-hot',
            color: 'var(--primary-color)',
            children: [7, 8, 9, 10, 11, 12, 13, 14, 15, 56],
        },
        {
            id: 'boissons-alcoolisees',
            label: 'Boissons alcoolisées',
            to: 'bieres-et-cidres,sake-soju-autres-alcools',
            icon: 'fa6-solid:beer-mug-empty',
            color: 'blue',
            children: [17, 18]
        },
        {
            id: 'boissons-soda',
            label: 'Boissons sans alcool & Soda',
            to: 'boissons-sucrees,soda-ramune-japonais,bubble-tea-boba,mogu-mogu',
            icon: 'fa6-solid:glass-water',
            color: 'blue',
            children: [19, 20, 21, 53]
        },
        {
            id: 'boissons-chaudes',
            label: 'Thé, Tisanes & Bois. chaudes',
            to: 'the,tisane,boissons-chaudes',
            icon: 'fa6-solid:mug-hot',
            color: 'var(--secondary-color-3)',
            children: [22, 23, 24]
        },
        {
            id: 'aperitifs-collations',
            label: 'Aperitifs & Collations',
            to: 'chips-snacks-aperitifs-sales,gateaux-biscuits,mochis,bonbons',
            icon: 'fa6-solid-stroopwafel',
            color: 'blue',
            children: [25, 26, 27, 28]
        },
        {
            id: 'feculents-sauces-prep',
            label: 'Nouilles, pâtes & autres féculents',
            to: 'nouilles-instantanees,nouilles-vermicelles,farines,riz-galettes,pates-sauces-sachet,prep-culinaires',
            icon: 'fa6-solid:bowl-food',
            color: 'var(--secondary-color-2)',
            children: [30, 31, 32, 33, 34, 54, 55]
        },
        {
            id: 'fruits-et-legumes',
            label: 'Fruits & Légumes',
            to: 'legumes-conserves,legumes-secs,fruits-conserves,fruits-secs,champignons,noix-coco',
            icon: 'fa6-solid:apple-whole',
            color: 'green',
            children: [35, 36, 37, 38, 39]
        },
        {
            id: 'produits-mer',
            label: 'Produits de la mer',
            to: 'algues,nori,poissons,crevettes',
            icon: 'fa6-solid:fish',
            color: 'blue',
            children: [40, 41, 42, 43]
        },
        {
            id: 'cosmetiques',
            label: 'Cosmétiques',
            to: 'soins-corps,soins-cheveux',
            icon: 'fa6-solid:seedling',
            color: 'var(--secondary-color-3)',
            children: [45, 46]
        },
        {
            id: 'encens-baguettes-decorations',
            label: 'Encens, Baguettes & Décorations',
            to: 'encens,baguettes,decorations',
            icon: 'fa6-solid:grip-lines',
            color: 'var(--grey2)',
            children: [48, 49, 50]
        },
    ]),
        categorie = reactive<{
            id: string,
            label: string,
            to: string,
            icon?: string,
            color?: string,
            children?: Array<{
                id: number,
                name: string,
                value: string,
                image?: string,
                icon?: string,
                color?: string,
            }>
        }[]>([]);

    const readCategoriesParams = async () => {
        const tempCtg = reactive<{}[]>([]);
        const ctgChildren = categorieList.filter((item) => item.id === route.params.id),
            readCategories = await Promise.all(
                ctgChildren.map(async (obj: { children: number[] }) => {
                    await Promise.all(
                        obj.children.map(async (value: number) => {
                            await fetch(`http://localhost:3000/directus/items/Categorie?filter[id][_eq]=${value}&fields=id,name,value,icon,color`)
                                .then(res => res.json())
                                .then(res => res.data)
                                .then(res => tempCtg.push(res.reduce((acc: any, value: any) => acc + value)))
                        })
                    )
                })
            );
        ctgChildren ? readCategories : ''
        tempCtg.length ? categoriesAssembler(ctgChildren, tempCtg) : ''
    },
        categoriesAssembler = (array: { id: string, label: string; to: string; icon?: string; color?: string; }[], fetched: any) => {
            array.map((obj: { id: string, label: string; to: string; icon?: string; color?: string; }) => {
                return categorie.push({
                    id: obj.id,
                    label: obj.label,
                    to: obj.to,
                    icon: obj.icon,
                    color: obj.color,
                    children: fetched,
                })
            })
        };

    onMounted(() => {
        readCategoriesParams();
    })
</script>

<template>
    <div v-for="(ctg, i) of categorie" class="flex flex-col items-center" :key="i">
        <h1 class="flex items-center text-5xl font-semibold gap-4" :style="`color: ${ctg.color}`">
            <UIcon :name="`${ctg.icon}` || ''" class="w-9 h-9" /> {{ ctg.label }}
        </h1>
        <a :href="'/products?categories=' + ctg.to"
            class="flex flex-col items-center w-full h-auto  max-w-[30rem] p-4 text-(--color-text) cursor-pointer rounded-xl">
            {{ capitalize('tous les produits') }}
        </a>
        <ul class="grid grid-cols-3 items-center">
            <li v-for="(item, i) of ctg.children" :key="i">
                <a :href="'/products?categories=' + item.value"
                    class="flex flex-col items-center w-full h-[10rem] p-4 text-(--black) cursor-pointer rounded-xl"
                    :style="`background-color: ${item.color}`">
                    <UIcon :name="`${item.icon}` || 'fa6-solid:earth-europe'" class="w-18 h-18" />
                    <span class="w-full h-auto text-base text-center font-semibold text-(--color-text) p-4">
                        {{ item.name }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>