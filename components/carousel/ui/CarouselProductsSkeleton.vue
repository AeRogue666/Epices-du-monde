<script setup lang="ts">
const productSkeleton = ref<number>(3);
</script>

<template>
    <div class="flex flex-col md:flex-row">
        <USkeleton class="w-[20rem] h-9" />
        <USkeleton class="w-[10rem] h-9 ml-1.5 p-0 rounded-lg" />
    </div>
    <div class="flex items-center mb-auto">
        <div
            class="w-md max-w-xs md:w-xl md:max-w-xl lg:w-3xl lg:max-w-3xl xl:w-6xl xl:max-w-6xl mx-auto mb-6 relative focus:outline-none z-1">
            <div class="oveflow-hidden">
                <div class="flex items-start flex-row -ms-4 transition-[height]">
                    <div v-for="i of productSkeleton"
                        class="flex flex-col items-center min-w-0 shrink-0 basis-full ps-4 xl:basis-1/3 gap-6" :key="i">
                        <USkeleton class="flex w-[15rem] h-[10rem] rounded-t-xl" />
                        <USkeleton class="w-[10rem] h-auto text-3xl p-4" />
                    </div>
                </div>
            </div>
            <div>
                <USkeleton
                    class="w-6 h-6 gap-1.5 p-1.5 absolute rounded-full start-4 sm:-start-12 top-1/2 -translate-y-1/2 shrink-0" />
                <USkeleton
                    class="w-6 h-6 gap-1.5 p-1.5 absolute rounded-full end-4 sm:-end-12 top-1/2 -translate-y-1/2 shrink-0" />
            </div>
            <div class="flex justify-center items-center w-full absolute inset-x-0 -bottom-7 gap-3">
                <USkeleton v-for="i of productSkeleton" class="w-6 h-1 rounded-t-xl" :key="i" />
            </div>
        </div>
    </div>
</template>