<script setup lang="ts">
import { UIcon } from '#components';
import { capitalize } from 'vue';

const { getImageUrl, getImageDescription, getImageDimensions } = useProductImage();

const props = defineProps<{
    product: Product,
}>();

// Computed for accessibility
const imageAlt = computed(() => {
    const description = getImageDescription(props.product.image_id);
    return description || props.product.title
}), imageDimensions = computed(() => getImageDimensions(props.product.image_id));
</script>

<template>
    <article class="relative group/blog-post rounded-lg overflow-hidden flex flex-col bg-default ring ring-default">
        <div class="relative overflow-hidden aspect-video w-full pointer-events-none">
            <NuxtPicture :src="getImageUrl(product.image_id, {
                width: 400, height: 400, fit: 'cover', format: 'webp', quality: 90
            }) || `directus/${product.image_id}`" class="object-cover object-top w-full h-full rounded-lg" :alt="imageAlt"
                :width="imageDimensions.width || 400" :height="imageDimensions.height || 400" loading="lazy" />
            <!-- <NuxtPicture :src="`directus/${product.image.id}`"
                class="object-cover object-top w-full h-full rounded-lg" :alt="product.image.description"
                :width="product.image.width" :height="product.image.height" /> -->
            <!-- <NuxtImg
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg/960px-Center_of_the_Milky_Way_Galaxy_IV_%E2%80%93_Composite.jpg"
                class="object-cover object-top w-full h-full  rounded-lg"
                alt="NASA/JPL-Caltech/ESA/CXC/STScI, Public domain, via Wikimedia Commons" /> -->
        </div>
        <div class="min-w-0 flex-1 flex flex-col p-4 sm:p-6">
            <a :href="`/product/${product.id}/${product.slug}`" tabindex="-1" :aria-label="product.title"
                class="focus:outline-none peer">
                <span class="absolute inset-0" aria-hidden="true"></span>
            </a>
            <div class="flex flex-row justify-between items-center w-full mb-2">
                <div class="flex flex-row items-center w-auto gap-4">
                    <UIcon name="fa6-solid:circle"
                        :style="`color: ${(
                            product.stock > 0 && product.availability == 'in_stock') || product.availability == 'not_available' 
                                ? (product.stock > 0 && product.availability == 'in_stock') 
                                    ? 'green' 
                                    : 'orange' 
                                : 'red'}`" />
                    <span>{{ 
                    product.stock > 0 || product.availability == 'in_stock' 
                        ? `${capitalize($t('main.product.availability.in_stock'))} (${product.stock})` 
                        : (product.stock >= 0) && product.availability == 'not_available' 
                            ? `${capitalize($t('main.product.availability.not_available'))}` 
                            : `${capitalize($t('main.product.availability.out_of_stock'))}` 
                    }}</span>
                </div>
                <!-- <ProductsMoleculesProductsMoleculeItemFooter :product="product" /> -->
            </div>
            <h2 class="text-xl text-pretty font-semibold text-highlighted">{{ product.title }}</h2>
            <div class="mt-1 text-base text-pretty text-muted">{{ product.description }}</div>
        </div>
    </article>
</template>