<script setup lang="ts">
import CarouselPromotedProductsMolecule from '../molecules/CarouselPromotedProductsMolecule.vue';

const config = useRuntimeConfig(),
    apiPublicEndpoint = config.public.apiBase;

const carouselProduct = reactive<{
    id: string;
    label: string;
    slug: string;
    image?: {
        id: string,
        description: string,
        width: number,
        height: number,
    },
}[]>([]);

const getNewProducts = async () => {
    const images = reactive<{
            id: string,
            description: string,
            width: number,
            height: number,
        }[]>([]);

    const { data: products } = await fetch(`${apiPublicEndpoint}/items/PromotedProducts`, {}).then(res => res.json()),
        readImage = await Promise.all(
                products.map(async (item: { Image_id: string; }) => {
                    await fetch(`${apiPublicEndpoint}/files?filter[id][_eq]=${item.Image_id}&fields=id,description,width,height`, {})
                        .then(res => res.json())
                        .then(res => res.data)
                        .then(res => images.push(res.reduce((acc: any, value: any) => acc + value)))
                })
            ),
        productAssemble = () => {
            products.map((item: { id: string; title: string; description: string; slug: string; label: string; }, i: any) => {
                carouselProduct.push({
                    id: item.id,
                    label: item.label,
                    slug: item.slug,
                    image: images[i],
                })
            })
        }

    if (products) {
        readImage
        if(products && images) productAssemble();

        console.log(' PromotedProducts: ', products, ' Images: ', images);
    }
}

onMounted(() => {
    getNewProducts();
})
</script>

<template>
    <UContainer class="flex flex-row items-center w-full h-auto mt-0 mb-6 gap-3">
        <CarouselUiCarouselPromotedProductsSkeleton v-if="carouselProduct.length == 0" />
        <CarouselPromotedProductsMolecule v-else :products="carouselProduct" />
    </UContainer>
</template>