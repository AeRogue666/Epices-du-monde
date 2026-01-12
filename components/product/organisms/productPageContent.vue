<script setup lang="ts">
import { LazyUIcon } from '#components';
import { capitalize } from 'vue';
import ProductIconsCard from '../molecules/productIconsCard.vue';
import ProductAddToCartForm from '../molecules/productAddToCartForm.vue';

const props = defineProps<{
    product: Product,
}>();

const emit = defineEmits<{
    changeProductsNumber: [value: number]
}>();

const productNumber = defineModel({ default: 1 }),
    { getImageUrl, getImageDescription, getImageDimensions } = useProductImage(),
    { fetchAllergies } = useProductAllergies(),
    { fetchNutritions } = useProductNutritions(),
    { fetchProductCategories } = useProductCategories(),
    { fetchProductLabels } = useProductLabels(),
    cartStore = useCartStore(),
    isProductInCart = cartStore.isInCart(props.product.id);

// Computed for accessibility
const imageAlt = computed(() => {
    const description = getImageDescription(props.product.image_id);
    return description || props.product.title
}), imageDimensions = computed(() => getImageDimensions(props.product.image_id));

const updateProductsNumber = (nb: number) => {
    emit('changeProductsNumber', nb)
};
</script>

<template>
    <article
        class="relative group/blog-post rounded-lg overflow-hidden flex flex-col w-full h-auto mt-3 bg-default gap-2">
        <UContainer class="flex flex-col lg:flex-row">
            <div class="relative overflow-hidden w-full pointer-events-none">
                <NuxtPicture :src="getImageUrl(product.image_id, {
                    width: 400, height: 400, fit: 'cover', format: 'webp', quality: 90
                }) || `directus/${product.image_id}`" class="object-cover object-top w-full h-full rounded-lg"
                    :alt="imageAlt" :width="imageDimensions.width || 400" :height="imageDimensions.height || 400"
                    loading="lazy" decoding="async" fetchpriority="low" />
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
                            <div class="flex flex-row items-center w-auto gap-4">
                                <LazyUIcon name="fa6-solid:circle" :style="`color: ${(
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
                        </div>
                    </div>
                    <div class="flex flex-row items-center">
                        <ProductIconsCard :loader="() => fetchProductLabels(product.id)" />
                    </div>
                </UContainer>
                <ProductAddToCartForm :product="product" :is-product-in-cart="cartStore.isInCart(props.product.id)"
                    :is-quantity-available="cartStore.isQuantityAvailable(props.product.id, props.product.stock)"
                    v-model="productNumber" @change="updateProductsNumber" />
            </UContainer>
        </UContainer>
        <UContainer class="flex flex-col">
            <div class="flex flex-col items-baseline gap-2 mx-6 my-3">
                <span class="text-base font-semibold">
                    {{ capitalize($t('main.product.collapsible.description')) }}
                </span>
                <ProductMoleculesProductDescriptionMarkdownMolecule :source="product.description" />
            </div>

            <!-- Ingredients & Allergies -->
            <ProductMoleculesProductCollapsibleContent :title="capitalize($t('main.product.collapsible.ingredient'))"
                :product-id="product.id" :loader="() => fetchAllergies(product.id)">
                <template #default="{ data }">
                    <ProductMoleculesProductDescriptionMarkdownMolecule :source="product.ingredients" />
                    <ul v-if="data.allergies" class="list-discs pl-4">
                        <li v-for="a in data" :key="a.id">
                            {{ a.name }}
                        </li>
                    </ul>
                </template>
            </ProductMoleculesProductCollapsibleContent>

            <!-- Nutrition -->
            <ProductMoleculesProductCollapsibleContent :title="capitalize($t('main.product.collapsible.nutrition'))"
                :product-id="product.id" :loader="async () => fetchNutritions(product.nutrition_id)">
                <template #default="{ data }">
                    <ProductMoleculesProductTable :nutritions="data" />
                </template>
            </ProductMoleculesProductCollapsibleContent>

            <!-- Technical info -->
            <ProductMoleculesProductCollapsibleContent
                :title="capitalize($t('main.product.collapsible.technical-informations'))" :product-id="product.id"
                :loader="async () => fetchProductCategories(product.id)">
                <template #default="{ data }">
                    <UCard :ui="{
                        body: 'grid grid-row-3 justify-content items-baseline gap-5'
                    }">
                        <span>{{ capitalize($t('main.product.collapsible.brand')) }}: {{ product.marque }}</span>
                        <span>{{ capitalize($t('main.product.collapsible.origin')) }}: {{ product.origine }}</span>
                        <div v-if="data" class="flex flex-row items-baseline gap-3">
                            <span>{{ capitalize($t('main.product.collapsible.tag')) }}:</span>
                            <ul v-if="data.length !== 0" class="list-discs pl-4">
                                <li v-for="tag in data" :key="tag.id">
                                    <UButton :name="tag.name" :aria-current-value="tag.value" :key="tag.id">
                                        <LazyUIcon :name="tag.icon" :style="`color: ${tag.color}`" :key="tag.id" />
                                    </UButton>
                                </li>
                            </ul>
                            <span v-else>Ce produit ne possède aucun tag</span>
                        </div>
                    </UCard>
                </template>
            </ProductMoleculesProductCollapsibleContent>
        </UContainer>
    </article>
</template>