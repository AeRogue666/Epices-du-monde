<script lang="ts">
    const { currentRoute } = useRouter(),
        { search, categories } = currentRoute.value.query,
        { $directus, $readItems, $readFile, } = useNuxtApp(),
        image = reactive<{
            id: string,
            description: string,
            width?: number,
            height?: number,
        }[]>([]);

    const { data: products } = await useAsyncData('Product', () => {
        return $directus.request($readItems('Product'))
    }),
        { data: categorie } = await useAsyncData('Categorie', () => {
            return $directus.request($readItems('Categorie'))
        }),
        readFiles = async () => {
            products.value?.map(async (obj) => {
                console.log(`http://localhost:3000/directus/files?filter[id][_eq]=${obj.image_id}&fields=id,description,width,height`)
                return await fetch(`http://localhost:3000/directus/files?filter[id][_eq]=${obj.image_id}&fields=id,description,width,height`)
                    .then(res => res.json())
                    .then(res => res.data)
                    .then(res => image.push(res.reduce((acc: any, value: any) => acc + value)))
            })
            return image
        };

    const availabilityTypeList = reactive<{
        name: string,
        value: string,
        color: string,
    }[]>([
        {
            name: 'Available soon',
            value: 'soon',
            color: 'black',
        },
        {
            name: 'In stock',
            value: 'in_stock',
            color: 'green',
        },
        {
            name: 'Out of stock',
            value: 'out_of_stock',
            color: 'red',
        },
    ]),
        categoriesList = reactive<{
            id: number,
            label: string,
            children: Array<{
                id: number,
                label: string,
                value: string,
                icon?: string,
                checked?: boolean,
            } | number>
        }[]>([
            {
                id: 1, label: 'Tous les drapeaux', children: [1, 2, 3, 4, 5, 6]
            },
            {
                id: 2, label: 'Epices et Sauces', children: [7, 8, 9, 10, 11, 12, 13, 14, 15]
            },
            {
                id: 3, label: 'Assaisonnements', children: [16]
            },
            {
                id: 4, label: 'Boissons alcoolisées', children: [17, 18]
            },
            {
                id: 5, label: 'Boissons sucrées & Soda', children: [19, 20, 21]
            },
            {
                id: 6, label: 'The, Tisane & Boissons chaudes', children: [22, 23, 24]
            },
            {
                id: 7, label: 'Aperitifs & Collations', children: [25, 26, 27, 28]
            },
            {
                id: 8, label: 'Sucre & Miel', children: [29]
            },
            {
                id: 9, label: 'Feculents, Sauces, & Preparations', children: [30, 31, 32, 33, 34]
            },
            {
                id: 10, label: 'Fruits & Legumes', children: [35, 36, 37, 38, 39]
            },
            {
                id: 11, label: 'Produits de la mer', children: [40, 41, 42, 43]
            },
            {
                id: 12, label: 'Insectes comestibles', children: [44]
            },
            {
                id: 13, label: 'Cosmétiques', children: [45, 46]
            },
            {
                id: 14, label: 'Ustensiles de cuisine', children: [47]
            },
            {
                id: 15, label: 'Encens, Baguettes & Decorations', children: [48, 49, 50]
            },
        ]),
        tagsList = reactive<{
            id: number,
            label: string,
        }[]>([]),
        productsList = reactive<{
            id: number,
            title: string,
            description: string,
            image: object,
            slug: string,
            price: number,
            reduction_rate?: number,
            old_price?: number,
            availability: {
                name: string,
                value: string,
                color: string,
            },
        }[]>([]);

    const productsAssemble = () => {
        products.value?.map((obj) => {
            const type = availabilityTypeList.filter((type) => type.value === obj.availability)[0];
            return productsList.unshift({
                id: obj.id,
                title: obj.title,
                description: obj.description,
                image: image,
                slug: obj.slug,
                price: obj.price,
                reduction_rate: obj.reduction_rate,
                old_price: obj.old_price,
                availability: type,
            })
        })
    };

    const productNumber = ref<number>(productsList.length);

    const updateTagsList = (v: number) => {
        const find = tagsList.findIndex((obj) => obj.id === v);
        // console.log(v, tagsList, find), updateCheckedStateToCategories(tagsList[find].label)
        tagsList.splice(find, 1);
    };

    const updateCategoriesList = () => {
        categoriesList.map((obj) => obj.children.map((item, i) => {
            if (typeof item === 'number') {
                const ctgvalue = categorie.value?.filter((ctg) => ctg.id === item);
                if (ctgvalue) {
                    obj.children.splice(i, 1)
                    return ctgvalue.map((content) => obj.children.push({ id: content.id, label: content.name, value: content.value, icon: content.icon }))
                }
            }
        }))
    }

    /* const updateCheckedStateToCategories = (array: any) => {
        let filter = reactive<{ id: number, label: string, value: string }[]>([]);
        if (typeof array == 'string') {
            categoriesList.map((obj) => {
                const res = obj.children.filter((item) => item.value === array), foundObj = obj.children.findIndex((item) => item.value === array);
                if (res.length !== 0) {
                    console.log(res[0])
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
    }; */

    onMounted(() => {
        readFiles();
        console.log(products.value, image)
        if(image.length !== 0) productsAssemble();
        /* updateCategoriesList();
        if (categories?.length !== 0 && typeof categories !== undefined) {
            updateCheckedStateToCategories(categories);
        } */
    })

    onUpdated(() => {
        /* if (useCategoriesStore().category) {
            updateCheckedStateToCategories(categories);
        } */
        // console.log(useCategoriesStore().category, categories)
    })
</script>