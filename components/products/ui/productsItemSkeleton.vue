<script setup lang="ts">

</script>

<template>
    <UCard class="flex flex-col items-center w-full h-auto" :ui="{
            header: 'mt-auto',
            body: 'h-full mt-auto',
            footer: 'mt-auto'
        }">
        <template #header>
            <USkeleton class="" /> <!-- Stock -->
        </template>

        <div class="flex flex-col items-center w-full h-full gap-4">
            <USkeleton class="max-w-60 min-w-52 max-h-48 min-h-44 rounded-lg" /> <!-- Picture -->
            <USkeleton class="text-3xl" /> <!-- Title -->
        </div>

        <template #footer>
            <div class="flex flex-row items-center gap-6">
                <USkeleton class="" />
                <USkeleton class="" />
            </div>
        </template>
    </UCard>
</template>