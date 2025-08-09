<script setup lang="ts">
</script>

<template>
    <UCard class="fixed bg-(--color-bg) divide-y divide-default flex flex-col focus:outline-none data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in] top-181 left-1/2 xl:top-172 bottom-0 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-full h-full min-h-[33rem] max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default overflow-hidden z-[1000]">
        <template #header>
            <Placeholder class="flex items-center h-8 gap-1.5 p-4 sm:px-6 min-h-16 justify-between" />
            <div class="">
                <h2 class="text-highlighted font-semibold">Title</h2>
                <p class="mt-1 text-muted text-sm">Description</p>
            </div>
        </template>

        <Placeholder class="flex-1 h-32 overflow-y-auto p-4 sm:p-6" />

        <template #footer>
            <Placeholder class="flex items-center h-8 gap-1.5 p-4 sm:px-6 justify-end" />
        </template>
    </UCard>
</template>