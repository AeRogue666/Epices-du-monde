<script setup lang="ts">
    const carousel = reactive<{
        title: string,
        link: string,
        img: {
            link: string,
            label: string,
        },
    }[]>([
        {
            title: 'Un titre d\'un element',
            link: '/categories/all-flags',
            img: { label: 'Image of a random element', link: './img/logo.png' },
        },
        {
            title: 'Un titre d\'un element',
            link: '/categories/all-flags',
            img: { label: 'Image of a random element', link: './img/logo.png' },
        },
        {
            title: 'Un titre d\'un element',
            link: '/categories/all-flags',
            img: { label: 'Image of a random element', link: './img/logo.png' },
        }
    ]);

    /* <UCarousel v-slot="{ item }" :items="carousel" class="-z-1" orientation="horizontal" arrows>
            <a class="block h-(calc(100% + 4px)) m-4 rounded-xl bg-(--color-bg) teaser" :href="item.link">
                <img class="w-[100% + 2px] h-[100% + 2px] max-w-[15rem] rounded-t-xl" :src="item.img.link"
                    :alt="item.img.label">
                <span class="block w-full h-auto text-xl font-semibold p-4">Un titre d'un élément</span>
            </a>
        </UCarousel> */
</script>

<template>
    <section class="flex items-center mb-auto">
        <UCarousel v-slot="{ item }" loop arrows :items="carousel" :ui="{
            viewport: 'overflow-hidden',
            container: 'transition-[height]',
            controls: 'carousel-products--controls',
            dots: '-top-7 text-black',
            dot: 'w-6 h-1',
            item: 'm-4',
        }" :prev-icon="'fa6-solid:chevron-left'" :next-icon="'fa6-solid:chevron-right'"
            class="w-full max-w-xs mx-auto z-1">
            <a :href="item.link" class="flex flex-col items-center h-(calc(100% + 4px)) m-4 rounded-xl bg-(--color-bg) teaser">
                <img class="w-[100% + 2px] h-[100% + 2px] max-w-[15rem] rounded-t-xl" :src="item.img.link"
                    :alt="item.img.label">
                <h3 class="w-full h-auto text-3xl text-center font-semibold p-4">{{ item.title }}</h3>
            </a>
        </UCarousel>
    </section>
</template>