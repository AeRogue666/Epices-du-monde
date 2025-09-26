<script setup lang="ts">

</script>

<template>
    <UContainer class="flex flex-col items-center w-full h-full gap-2">
        <USkeleton class="w-[24rem] h-12" /> <!-- Title -->
        <section class="flex flex-col items-center w-full h-auto gap-6">
            <USkeleton class="w-[15rem] h-[10rem] rounded-xl" /> <!-- Picture -->
            <UContainer class="flex flex-col w-96 h-full border border-solid border-(--color-text)">
                <div class="flex flex-col items-start my-6 gap-4">
                    <USkeleton class="w-[6rem] h-3" /> <!-- Price -->
                    <USkeleton class="w-[6rem] h-3" /> <!-- Net weight -->
                    <USkeleton class="w-[6rem] h-3" /> <!-- Price per kg -->
                </div>
                <div class="flex flex-col items-start my-6 gap-4">
                    <USkeleton class="w-[133px] h-6" /> <!-- Stock -->
                    <UContainer class="flex flex-col items-center">
                        <USkeleton class="w-[6rem] h-2.5 relative left-[-30%]" />
                        <USkeleton class="w-[270px] h-10 mt-1 mb-9" /> <!-- Product number -->
                        <USkeleton class="w-auto h-[3.8rem] min-w-[14rem] text-xl p-4 rounded-lg" /> <!-- Add to cart button -->
                    </UContainer>
                </div>
            </UContainer>
            <USkeleton class="w-[30rem] h-[30rem]" /> <!-- Description -->
        </section>
    </UContainer>
</template>