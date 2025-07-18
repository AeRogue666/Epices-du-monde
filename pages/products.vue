<script setup lang="ts">
    import ProductsItem from '~/components/products/components/productsItem.vue';

    const { currentRoute } = useRouter(), { search, categories } = currentRoute.value.query;

    const categoriesList = reactive<{
        id: number,
        label: string,
        children: Array<{
            id: number,
            label: string,
            value: string,
            checked?: boolean,
        }>
    }[]>([
        {
            id: 1, label: 'Tous les drapeaux', children: [
                { id: 1, label: 'Thaïlande', value: 'thailande' },
                { id: 2, label: 'Corée du Sud', value: 'coree' },
                { id: 3, label: 'Japon', value: 'japon' },
                { id: 4, label: 'Taïwan', value: 'taiwan' },
                { id: 5, label: 'Vietnam', value: 'vietnam' },
                { id: 6, label: 'Chine', value: 'chine' },
            ]
        },
        {
            id: 2, label: 'Epices et Sauces', children: [
                { id: 7, label: 'Epices en gros', value: 'epices-en-gros' },
                { id: 8, label: 'Epices en 100g', value: 'epices-en-100g' },
                { id: 9, label: 'Curry asiatiques', value: 'curry-asiatiques' },
                { id: 10, label: 'Curry & Produits Indiens', value: 'curry-produits-inde' },
                { id: 11, label: 'Sauce soja', value: 'sauce-soja' },
                { id: 12, label: 'Sauce poisson nuoc man', value: 'sauce-poisson-nuoc-man' },
                { id: 13, label: 'Sauce à huîtres', value: 'sauce-a-huitre' },
                { id: 14, label: 'Huiles et Vinaigres', value: 'huiles-et-vinaigres' },
                { id: 16, label: 'Sauces épicées', value: 'sauces-epicees' },
            ]
        },
        {
            id: 3, label: 'Assaisonnements', children: [
                { id: 61, label: 'Assaisonnements', value: 'assaisonnements' }
            ]
        },
        {
            id: 4, label: 'Boissons alcoolisées', children: [
                { id: 17, label: 'Bières et Cidres', value: 'bieres-et-cidres' },
                { id: 19, label: 'Sake, Soju et Autres alcools', value: 'sake-soju-autres-alcools' },
            ]
        },
        {
            id: 5, label: 'Boissons sucrées & Soda', children: [
                { id: 22, label: 'Boissons sucrées', value: 'boissons-sucrees' },
                { id: 23, label: 'Soda ramune japonais', value: 'soda-ramune-japonais' },
                { id: 24, label: 'Bubble tea et Boba', value: 'bubble-tea-boba' },
                { id: 26, label: 'Mogu mogu', value: 'mogu-mogu' },
            ]
        },
        {
            id: 6, label: 'The, Tisane & Boissons chaudes', children: [
                { id: 27, label: 'Thé', value: 'the' },
                { id: 28, label: 'Tisane', value: 'tisane' },
                { id: 29, label: 'Boissons chaudes', value: 'boissons-chaudes' },
            ]
        },
        {
            id: 7, label: 'Aperitifs & Collations', children: [
                { id: 30, label: 'Chips, Snacks et Aperitifs salés', value: 'chips-snacks-aperitifs-sales' },
                { id: 33, label: 'Nouilles instantanées', value: 'nouilles-instant' },
                { id: 34, label: 'Gateaux et Biscuits', value: 'gateaux-biscuits' },
                { id: 35, label: 'Mochis', value: 'mochis' },
                { id: 36, label: 'Bonbons', value: 'bonbons' },
            ]
        },
        {
            id: 8, label: 'Sucre & Miel', children: [
                { id: 37, label: 'Sucre et Miels', value: 'sucre-miels' },
            ]
        },
        {
            id: 9, label: 'Feculents, Sauces, & Preparations', children: [
                { id: 39, label: 'Nouilles et Vermicelles', value: 'nouilles-vermicelles' },
                { id: 40, label: 'Farines', value: 'farines' },
                { id: 41, label: 'Pâtes et Sauces en sachat', value: 'pates-sauces-sachet' },
                { id: 42, label: 'Pâtes épicées', value: 'pates-epicees' },
                { id: 43, label: 'Préparations culinaires', value: 'prep-culinaires' },
            ]
        },
        {
            id: 10, label: 'Fruits & Legumes', children: [
                { id: 44, label: 'Légumes en conserve', value: 'legumes-conserves' },
                { id: 45, label: 'Légumes secs', value: 'legumes-secs' },
                { id: 46, label: 'Fruits en conserve', value: 'fruits-conserves' },
                { id: 47, label: 'Fruits secs', value: 'fruits-secs' },
                { id: 48, label: 'Champignons', value: 'champignon' },
                { id: 49, label: 'Noix de coco', value: 'noix-coco' },
            ]
        },
        {
            id: 11, label: 'Produits de la mer', children: [
                { id: 50, label: 'Algues', value: 'algues' },
                { id: 51, label: 'Nori', value: 'nori' },
                { id: 52, label: 'Poissons', value: 'poissons' },
                { id: 53, label: 'Crevettes', value: 'crevettes' },
            ]
        },
        {
            id: 12, label: 'Insectes comestibles', children: [
                { id: 54, label: 'Insectes comestibles', value: 'insectes-comestibles' },
            ]
        },
        {
            id: 13, label: 'Cosmétiques', children: [
                { id: 55, label: 'Soins du corps', value: 'soins-corps' },
                { id: 56, label: 'Soins de la peau', value: 'soins-des-cheveux' },
            ]
        },
        {
            id: 14, label: 'Ustensiles de cuisine', children: [
                { id: 57, label: 'Ustensiles de cuisine', value: 'ustensiles-cuisine' },
            ]
        },
        {
            id: 15, label: 'Encens, Baguettes & Decorations', children: [
                { id: 58, label: 'Encens', value: 'encens' },
                { id: 59, label: 'Baguettes', value: 'baguettes' },
                { id: 60, label: 'Decorations', value: 'decorations' },
            ]
        },
    ]);
    const tagsList = reactive<{
        id: number,
        label: string,
    }[]>([]);

    const productsList = reactive<{
        id: number,
        title: string,
        image: string,
        image_description: string,
        slug: string,
        new_price: number,
        old_price: number,
        stock_status: {
            status: string,
            color: string,
        },
    }[]>([
        {
            id: 1,
            title: 'Product Title',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg/330px-Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg',
            image_description: '',
            slug: 'product-title',
            new_price: 1.11,
            old_price: 1.11,
            stock_status: {
                status: 'In stock',
                color: 'green',
            },
        },
        {
            id: 2,
            title: 'Product Title',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg/330px-Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg',
            image_description: '',
            slug: 'product title',
            new_price: 1.11,
            old_price: 1.11,
            stock_status: {
                status: 'No stock',
                color: 'red',
            },
        },
        {
            id: 3,
            title: 'Product Title',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg/330px-Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg',
            image_description: '',
            slug: 'product title',
            new_price: 1.11,
            old_price: 1.11,
            stock_status: {
                status: 'No stock',
                color: 'red',
            },
        },
        {
            id: 4,
            title: 'Product Title',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg/330px-Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg',
            image_description: '',
            slug: 'product title',
            new_price: 1.11,
            old_price: 1.11,
            stock_status: {
                status: 'Not available',
                color: 'black',
            },
        },
        {
            id: 5,
            title: 'Product Title',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg/330px-Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg',
            image_description: '',
            slug: 'product title',
            new_price: 1.11,
            old_price: 1.11,
            stock_status: {
                status: 'In stock',
                color: 'green',
            },
        },
        {
            id: 6,
            title: 'Product Title',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg/330px-Real_Monasterio_de_San_Juan_de_la_Pe%C3%B1a%2C_Huesca%2C_Espa%C3%B1a%2C_2023-01-05%2C_DD_48-50_HDR.jpg',
            image_description: '',
            slug: 'product title',
            new_price: 1.11,
            old_price: 1.11,
            stock_status: {
                status: 'In stock',
                color: 'green',
            },
        },
    ]);

    const productNumber = ref<number>(productsList.length);

    const updateTagsList = (v: number) => {
        const find = tagsList.findIndex((obj) => obj.id === v);
        console.log(v, tagsList, find), updateCheckedStateToCategories(tagsList[find].label)
        tagsList.splice(find, 1);
    };

    const updateCheckedStateToCategories = (array: any) => {
        let filter = reactive<{ id: number, label: string, value: string }[]>([]);
        if (typeof array == 'string') {
            categoriesList.map((obj) => {
                const res = obj.children.filter((item) => item.value === array), foundObj = obj.children.findIndex((item) => item.value === array);
                if (res.length !== 0) {
                    console.log(res[0].checked)
                    if (!res[0].checked) {
                        return filter.push(res[0]),
                            obj.children.splice(foundObj, 1),
                            obj.children.push({ id: res[0].id, label: res[0].label, value: res[0].value, checked: true }),
                            obj.children.sort((a, b) => a.id - b.id)
                    } else {
                        return filter.push(res[0]),
                        obj.children.splice(foundObj, 1),
                        obj.children.splice(foundObj, 1, { id: res[0].id, label: res[0].label, value: res[0].value, checked: res[0].checked }, { id: res[0].id, label: res[0].label, value: res[0].value, checked: false }),
                        obj.children.sort((a, b) => a.id - b.id)
                    }
                }
            })
        } else {
            array?.filter((el: string) => categoriesList.map((obj) => {
                const res = obj.children.filter((item) => item.value === el), foundObj = obj.children.findIndex((item) => item.value === el);
                if (res.length !== 0) {
                    return filter.push(res[0]),
                        obj.children.splice(foundObj, 1),
                        obj.children.push({ id: res[0].id, label: res[0].label, value: res[0].value, checked: true }),
                        obj.children.sort((a, b) => a.id - b.id)
                }
            }));
        }
        console.log(filter)
        if (tagsList.length == 0) {
            return filter.map((item) => tagsList.push({ id: item.id, label: item.label }))
        } else {
            filter.map((item) => updateTagsList(item.id))
        }
    };

    onMounted(() => {
        console.log(search, categories)
        if (categories?.length !== 0 && typeof categories !== undefined) {
            updateCheckedStateToCategories(categories);
        }
    })

    onUpdated(() => {
        if (useCategoriesStore().category) {
            updateCheckedStateToCategories(categories);
        }
        console.log(useCategoriesStore().category, categories)
    })
</script>

<template>
    <div class="flex flex-col items-center w-full h-full gap-2">
        <h1 class="text-5xl font-semibold">Products</h1>
        <section class="flex flex-col items-center w-full h-auto gap-6">
            <div class="flex flex-col items-center mt-6 gap-4">
                <div class="flex flex-row items-center">
                </div>
                <div class="flex flex-row items-center w-full h-full gap-6">
                    <ProductsComponentsProductsFilterModal :tags-list="categoriesList" />
                    <div class="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
                        <span class="text-base">Products: <span class="font-semibold">{{ productNumber }}</span></span>
                    </div>
                </div>
                <ProductsComponentsProductsTagsList :tags-list="tagsList" @id="updateTagsList" />
            </div>
            <div>
                <ul
                    class="grid grid-cols-2 items-center w-full h-auto gap-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
                    <li v-for="(item, i) of productsList" :key="i">
                        <ProductsItem :product="item" />
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>