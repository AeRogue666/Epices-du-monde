<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
    productsList: Array<{
        id: string | number,
        title: string,
        description: string,
        ingredients: string,
        slug: string,
        origine: string,
        marque: string,
        poids_net?: number,
        price: number,
        price_per_kg: number,
        reduction_rate?: number,
        old_price?: number,
        stock: number,
        availability?: {
            name: string,
            value: string,
            color: string,
        },
        image: {
            id: string,
            description: string,
            width?: number,
            height?: number,
        },
        tags?: [],
        allergies?: [],
        nutrition?: [],
        labels?: Label[],
    }>,
    cartNumber: number,
}>();

const emit = defineEmits<{
    changeProductsNumber: [value: number]
}>(),
    productNumber = defineModel({ default: 1 }),
    updateProductsNumber = (nb: number) => {
        emit('changeProductsNumber', nb)
    };
</script>

<template>
    <article v-for="(product, i) of productsList"
        class="relative group/blog-post rounded-lg overflow-hidden flex flex-col w-full h-auto mt-3 bg-default gap-2"
        :key="i">
        <UContainer class="flex flex-col lg:flex-row">
            <div class="relative overflow-hidden w-full pointer-events-none">
                <NuxtPicture v-for="(image, i) of product.image"
                    :src="`http://localhost:3000/directus/assets/${image?.id}`"
                    class="object-cover object-top w-full h-full rounded-lg" legacy-format="image"
                    :img-attrs="{ id: image?.id, class: 'rounded-xl' }" :alt="image?.description" :width="image?.width"
                    :height="image?.height" :key="i" />
            </div>
            <UContainer class="flex flex-col items-baseline my-3">
                <UContainer class="flex flex-col items-baseline">
                    <div class="flex items-baseline w-full">
                        <h1 class="text-2xl text-pretty font-semibold text-highlighted">{{ capitalize(product.title) }}
                        </h1>
                    </div>
                    <div class="flex flex-row justify-between items-center w-full my-3">
                        <div class="flex flex-row items-baseline w-auto gap-6">
                            <span class="text-lg font-semibold h-7">{{ product.price }} €</span>
                            <span v-if="product.reduction_rate"
                                class="absolute top-[96%] left-[11.3%] text-lg text-(--secondary-color-3) font-semibold h-7">-{{
                                    product.reduction_rate }}%</span>
                            <span class="text-sm line-through h-7">{{ product.old_price }} €</span>
                        </div>
                        <div class="flex flex-col items-baseline w-auto">
                            <span v-if="product.availability" class="flex flex-row items-center text-base h-7 gap-2">
                                <UIcon name="i-fa6-solid:circle" class="size-5" :class="product.availability?.color" />
                                {{ capitalize($t('main.product.availability.' + product.availability.value)) }}: {{
                                    product.stock }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-row items-center">
                        <NuxtPicture v-for="(label, i) of product.labels"
                            :src="`http://localhost:3000/directus/assets/${label?.image_id}`"
                            class="object-cover object-top w-full h-full rounded-lg" legacy-format="image"
                            :img-attrs="{ id: label?.id, class: 'rounded-xl' }" :alt="label?.name" width="60" height="60" :key="i" />
                    </div>
                </UContainer>
                <ProductOrganismsProductAddToCartForm :product="product" :cart-number="cartNumber"
                    v-model="productNumber" @change="updateProductsNumber" />
            </UContainer>
        </UContainer>
        <UContainer class="flex flex-col">
            <ProductMoleculesProductCollapsibleContent :title="capitalize($t('main.product.collapsible.description'))"
                :description="product.description" />
            <ProductMoleculesProductCollapsibleContent :title="capitalize($t('main.product.collapsible.ingredient'))"
                :ingredients="product.ingredients" :allergies="product.allergies" :nutrition="product.nutrition" />
            <ProductMoleculesProductCollapsibleContent
                :title="capitalize($t('main.product.collapsible.technical-informations'))" :brand="product.marque"
                :origin="product.origine" :tags="product.tags" />
        </UContainer>
    </article>
</template>