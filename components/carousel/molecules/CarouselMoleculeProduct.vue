<script setup lang="ts">
    defineProps<{
        product: Array<{
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
        }>,
        productTitle: Array<{
            id: number,
            name: string,
            value: string,
            icon: string,
            product_id: string[],
        }>,
    }>();
</script>

<template>
    <CarouselAtomsCarouselAtomProductTitle :array="productTitle" />
    <section class="flex flex-col justify-center items-center mb-auto">
        <UCarousel v-if="product.length !== 0" v-slot="{ item }" loop arrows dots :items="product" :ui="{
            root: 'mb-6',
            viewport: 'overflow-hidden',
            container: 'transition-[height]',
            controls: '',
            dots: 'text-black',
            dot: 'w-6 h-1',
            item: 'xl:basis-1/3',
        }" :prev-icon="'fa6-solid:chevron-left'" :next-icon="'fa6-solid:chevron-right'"
            class="w-md max-w-xs md:w-xl md:max-w-xl lg:w-3xl lg:max-w-3xl xl:w-6xl xl:max-w-6xl mx-auto z-1">
            <a :href="`/product/${item.id}/${item.slug}`"
                class="flex flex-col items-center h-(calc(100% + 4px)) m-4 rounded-xl bg-(--color-bg) teaser">
                <img v-if="item.image_id"
                    class="w-[100% + 2px] h-[100% + 2px] max-w-[15rem] min-h-[11.25rem] rounded-t-xl"
                    :src="`/directus/assets/${item.image_id.id}`" :alt="item.image_id.description"
                    :width="item.image_id.width" :height="item.image_id.height">
                <h3 class="w-full h-auto text-3xl text-center font-semibold p-4">{{ item.title }}</h3>
            </a>
        </UCarousel>
        <span v-else v-for="(title, i) of productTitle" class="text-base font-semibold" :key="i">
            Aucunes {{ title.name.toLocaleLowerCase() }} disponibles
        </span>
    </section>
</template>