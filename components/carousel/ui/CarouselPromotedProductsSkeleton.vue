<script setup lang="ts">

</script>

<template>
    <div class="w-full lg:max-w-6xl mx-auto mb-6 relative focus:outline-none z-1">
        <div class="flex flex-row items-start -ms-4">
            <USkeleton class="flex w-full h-auto min-h-[25rem] max-h-[30rem] lg:min-h-[30rem] lg:max-h-[34rem] rounded-t-xl" /> <!-- Title -->
        </div>
        <div class="flex justify-center items-center w-full absolute inset-x-0 -bottom-7 gap-3">
            <USkeleton class="w-full h-2 bg-accented rounded-full transition" /> <!-- Content -->
        </div>
    </div>
</template>