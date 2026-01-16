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

const productQuantity = ref<number>(props.quantity);

watch(productQuantity, (qty) => {
    if (props.product) {
        cartStore.updateQuantity(props.product.id, qty, props.product.stock);
    }
});
</script>

<template>
    <UCard v-if="product" class="flex flex-col items-center w-full h-auto gap-2" :ui="{
        header: 'p-0 sm:p-0',
        body: 'flex flex-col justify-left w-full p-0 sm:p-0 md:mx-auto',
        footer: 'p-0 ml-auto mr-2 sm:p-0'
    }">
        <!-- IMAGE -->
        <template #header>
            <NuxtLink :to="`/product/${product.id}/${product.slug}`"
                class="w-full h-auto no-underline gap-4 hover:text-blue-600">
                <NuxtPicture v-if="product.image_id" :src="getImageUrl(product.image_id, {
                    width: 800, height: 450, fit: 'cover', format: 'webp', quality: 90
                }) || `directus/${product.image_id}`" class="object-cover object-top aspect-video rounded-lg"
                    :alt="imageAlt" :width="imageDimensions.width || 800" :height="imageDimensions.height || 450"
                    loading="lazy" decoding="async" fetchpriority="low" />
                <!-- <div v-else class="flex items-center justify-center w-26 h-22 bg-gray-200 rounded-lg">
                    <span>{{ capitalize('image indisponible') }}</span>
                </div> -->
            </NuxtLink>
        </template>

        <!-- CONTENT -->
        <template #default>
            <UContainer class="flex flex-col justify-start items-baseline">
                <NuxtLink :to="`/product/${product.id}/${product.slug}`"
                    class="flex flex-col justify-start items-baseline w-full h-full no-underline hover:text-blue-600">
                    <UContainer class="flex flex-row justify-between items-center w-full h-full">
                        <span class="text-base font-bold">{{ product ? `${product.price}` : '-' }} € </span>
                        <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can"
                            @click.prevent="$emit('removeProductFromCart', product?.id)" />
                    </UContainer>
                </NuxtLink>
                <UContainer>
                    <UFormField label="Nombre de produits" help="" class="my-3" required>
                        <UInputNumber v-if="product.stock > 0" v-model="productQuantity" :default-value="1" :min="1"
                            :max="product.stock" size="xl" placeholder="Spécifier le nombre de produits"
                            :increment="{ color: 'neutral', variant: 'solid', size: 'xl' }"
                            :decrement="{ color: 'neutral', variant: 'solid', size: 'xl' }" :ui="{
                                increment: 'pe-0',
                                decrement: 'ps-0',
                            }" />
                    </UFormField>
                </UContainer>
            </UContainer>
        </template>

        <!-- ACTION -->
        <!-- <template #footer>
            <div class="flex flex-col items-center">
                <UButton color="error" variant="ghost" size="xl" icon="i-fa6-solid:trash-can"
                    @click.prevent="$emit('removeProductFromCart', product?.id)" />
            </div>
        </template> -->
    </UCard>
    <UCard v-else class="opacity-60">
        <span>{{ capitalize('produit indisponible') }}</span>
    </UCard>
</template>