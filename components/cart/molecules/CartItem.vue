<script setup lang="ts">
import { UCard } from '#components';
import { capitalize } from 'vue';

const props = defineProps<{
    product: any | null,
    quantity: number,
    unavailable: boolean,
}>();

defineEmits<{
    removeProductFromCart: [value: string]
}>();

const { getImageUrl, getImageDescription, getImageDimensions } = useProductImage(),
    cartStore = useCartStore();

// Computed for accessibility
const imageAlt = computed(() => { props.product ? getImageDescription(props.product.image_id) || props.product.title : capitalize('produit indisponible') }),
    imageDimensions = computed(() => getImageDimensions(props.product.image_id));

const productQuantity = ref<number>(props.quantity | 1);

watch(productQuantity, (qty) => {
    if (props.product) {
        cartStore.updateQuantity(props.product.id, qty, props.product.stock);
    }
});
</script>

<template>
    <UCard class="flex flex-col md:flex-row items-center w-full h-auto my-4" :ui="{
        header: 'my-4 p-0 sm:p-0',
        body: 'w-full h-auto md:mx-6',
        footer: 'flex flex-row justify-between items-center w-full px-6 py-0'
    }">
        <!-- IMAGE -->
        <template #header>
            <a :href="`/product/${product.id}/${product.slug}`"
                class="w-full h-auto no-underline gap-4 hover:text-blue-600">
                <NuxtPicture v-if="product.image_id" :src="getImageUrl(product.image_id, {
                    width: 240, height: 135, fit: 'cover', format: 'webp', quality: 90
                }) || `directus/${product.image_id}`"
                    class="object-cover object-top aspect-video w-full max-w-90 min-w-24 max-h-auto min-h-12 rounded-lg"
                    :alt="imageAlt" :width="240" :height="135" loading="lazy" decoding="async" fetchpriority="low" />
                <div v-else class="flex items-center justify-center w-26 h-22 bg-gray-200 rounded-lg">
                    <span>Image indisponible</span>
                </div>
            </a>
        </template>

        <template #default>
            <UContainer class="flex flex-col items-baseline w-full h-full p-0 no-underline gap-4">
                <a :href="`/product/${product.id}/${product.slug}`" class="no-underline hover:text-blue-600">
                    <span class="text-base font-semibold">{{ capitalize(product.title) }}</span>
                </a>
                <UContainer class="flex flex-col md:flex-row justify-between items-baseline w-full h-full gap-6">
                    <UFormField label="Nombre de produits" help="" class="my-3 p-0" required>
                        <UInputNumber v-if="product.stock > 0" v-model="productQuantity" :default-value="1" :min="1"
                            :max="product.stock" size="xl" placeholder="Spécifier le nombre de produits"
                            :increment="{ color: 'neutral', variant: 'solid', size: 'xl' }"
                            :decrement="{ color: 'neutral', variant: 'solid', size: 'xl' }" :ui="{
                                increment: 'pe-0',
                                decrement: 'ps-0',
                            }" />
                    </UFormField>
                    <span class="text-md font-semibold">{{ capitalize('price') }}: {{ product.price }}€ </span>
                </UContainer>
            </UContainer>
        </template>

        <template #footer>
            <div class="flex flex-row items-center w-full">
                <!-- absolute top-[5%] left-[90%] gap-4 md:top-[9%] md:left-[90%] xl:top-[7.9%] xl:left-[90%] 2xl:top-[9%] -->
                <LazyUIcon name="fa7-solid:circle" :style="`color: ${(
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
            <UButton color="error" variant="ghost" size="xl" icon="fa7-solid:trash-can" class="relative"
                @click.prevent="$emit('removeProductFromCart', product?.id)" />
        </template>
    </UCard>
</template>