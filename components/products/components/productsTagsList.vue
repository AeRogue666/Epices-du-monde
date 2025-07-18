<script setup lang="ts">
    import { UBadge } from '#components';

    defineProps<{
        tagsList: Array<{
            id: number,
            label: string,
        }>
    }>();
    
    const emit = defineEmits<{
        id: [value: number],
    }>();
</script>

<template>
    <ul class="flex flex-row items-center w-full h-auto overflow-auto gap-2">
        <li v-for="(tag, i) of tagsList" :key="i">
            <UBadge icon="fa6-solid:xmark" size="xl" color="primary" variant="solid" :ui="{
                base: 'bg-(--color-text) text-(--color-bg) text-base px-2.5 py-2 gap-1.5 rounded-xl',
                leadingIcon: 'size-6',
                leadingAvatarSize: '2xs',
                trailingIcon: 'i-fa6-solid:xmark size-6',
            }" @click="emit('id', tag.id)">{{ tag.label }}</UBadge>
        </li>
    </ul>
</template>