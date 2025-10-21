<script setup lang="ts">

</script>

<template>
    <UCard class="flex flex-col items-center w-full h-auto" :ui="{
        root: 'flex w-72 h-[26.675rem] mx-3 border-none no-hunderline bg-(--color-semi-transparent) ring-transparent',
        header: 'mt-auto',
        body: 'h-full mt-auto',
        footer: 'mt-auto'
    }">
        <template #header>
            <div class="flex flex-row items-center w-full gap-4">
                <USkeleton class="w-5 h-5 rounded-full" /> <!-- Icon -->
                <USkeleton class="w-30 h-6" /> <!-- Stock -->
            </div>
        </template>

        <div class="flex flex-col items-center w-full h-full gap-4">
            <USkeleton class="w-60 h-45 rounded-lg" /> <!-- Picture -->
            <USkeleton class="text-3xl" /> <!-- Title -->
        </div>

        <template #footer>
            <div class="flex flex-row items-center gap-6">
                <USkeleton class="w-19 h-6" />
                <USkeleton class="w-10 h-6" />
            </div>
        </template>
    </UCard>
</template>