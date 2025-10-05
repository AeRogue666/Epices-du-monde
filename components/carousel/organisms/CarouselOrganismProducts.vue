<script setup lang="ts">
const props = defineProps<{
    categorieParams: string,
}>(),
    config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase,
    carouselProduct = reactive<{
        id: number;
        title: string;
        description: string;
        slug: string;
        price: number;
        price_per_kg: number;
        reduction_rate?: number;
        old_price?: number;
        stock: number;
        availability: string;
        image_id: {
            id: string,
            description: string,
            width: number,
            height: number,
        },
    }[]>([]),
    carouselProductTitle = reactive<{
        id: number,
        name: string,
        value: string,
        icon: string,
        product_id: string[],
    }[]>([]);

const getProductIdByCategorie = async () => {
    const productsCategories = reactive<{
        id: number,
        Categorie_id: number,
        Product_id: string,
    }[]>([]),
        tempProducts = reactive<{
            id: number;
            title: string;
            description: string;
            slug: string;
            price: number;
            price_per_kg: number;
            reduction_rate?: number;
            old_price?: number;
            stock: number;
            availability: string;
            image_id: Array<string>;
        }[]>([]),
        images = reactive<{
            id: string,
            description: string,
            width: number,
            height: number,
        }[]>([]);

    const { data: categorie } = await fetch(`${apiPublicEndpoint}/items/Categorie?filter[value][_eq]=${props.categorieParams}&filter[status][_eq]=published&fields=id,name,value,icon,product_id`, {}).then(res => res.json()),
        readProductCategorie = await Promise.all(
            categorie.map(async (obj: { product_id: number[]; }) => {
                await Promise.all(
                    obj.product_id.map(async (value: number) => {
                        await fetch(`${apiPublicEndpoint}/items/Product_Categorie?filter[id][_eq]=${value}`, {})
                            .then(res => res.json())
                            .then(res => res.data)
                            .then(res => productsCategories.push(res.reduce((acc: any, value: any) => acc + value)))
                    })
                )
            })
        ),
        readProduct = await Promise.all(
            productsCategories.map(async (item: { Product_id: string; }) => {
                await fetch(`${apiPublicEndpoint}/items/Product?filter[id][_eq]=${item.Product_id}&filter[status][_eq]=published&sort[-date_updated]`, {})
                    .then(res => res.json())
                    .then(res => res.data)
                    .then(res => tempProducts.push(res.reduce((acc: any, value: any) => acc + value)))
            })
        ),
        readImage = await Promise.all(
            tempProducts.map(async (item: { image_id: string[]; }) => {
                await fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${item.image_id}&fields=id,description,width,height`, {})
                    .then(res => res.json())
                    .then(res => res.data)
                    .then(res => images.push(res.reduce((acc: any, value: any) => acc + value)))
            })
        ),
        productAssemble = () => {
            tempProducts.map((item, i) => {
                carouselProduct.push({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    slug: item.slug,
                    price: item.price,
                    price_per_kg: item.price_per_kg,
                    reduction_rate: item.reduction_rate,
                    old_price: item.old_price,
                    stock: item.stock,
                    availability: item.availability,
                    image_id: images[i],
                })
            })
        }
    if (categorie) {
        categorie.map((obj: { id: number; name: string; value: string; icon: string; product_id: string[]; }) => {
            carouselProductTitle.push(obj);
            obj.product_id.length !== 0 ? readProductCategorie : ''
        })
        productsCategories.length !== 0 ? readProduct : ''
        tempProducts ? readImage : ''
        tempProducts && images ? productAssemble() : ''
    }
}
onMounted(() => {
    getProductIdByCategorie();
})
</script>

<template>
    <UContainer class="flex flex-col justify-center items-center w-full h-auto my-12 gap-6">
        <CarouselUiCarouselProductsSkeleton v-if="carouselProduct.length == 0 && carouselProductTitle.length == 0" />
        <CarouselMoleculesCarouselMoleculeProduct v-else :product="carouselProduct"
            :product-title="carouselProductTitle" />
    </UContainer>
</template>