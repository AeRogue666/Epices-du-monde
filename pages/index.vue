<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-5xl font-semibold">Un large choix de produits</h1>
        <section class="flex flex-col items-center w-full my-6 gap-4">
            <h2 class="text-4xl font-semibold">Catégories</h2>
            <CarouselCtg />
            <h2 class="text-4xl font-semibold">Les promotions <a
                    class="m-1.5 p-1.5 text-base text-white bg-(--secondary-color-3) rounded-lg"
                    href="/products?filter=all-promos">Toutes les promotions</a></h2>
            <section>
                <CarouselProducts />
            </section>
            <h2 class="text-4xl font-semibold">Les nouveautés <a
                    class="m-1.5 p-1.5 text-base text-white bg-(--secondary-color-3) rounded-lg"
                    href="/products?filter=all-news">Toutes les nouveautés</a></h2>
            <section>
                <CarouselProducts />
            </section>
        </section>
    </div>
</template>