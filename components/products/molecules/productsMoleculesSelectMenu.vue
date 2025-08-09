<script setup lang="ts">
    import { USelect } from '#components';

    const props = defineProps<{
        selectValue: string,
    }>(),
        emit = defineEmits<{
            change: [value: string],
        }>();

    const items = ref([
        {
            id: 'pertinence',
            label: 'Pertinence',
        },
        {
            id: 'old_to_new',
            label: '+ ancien au + récent',
        },
        {
            id: 'new_to_old',
            label: '+ récent au + ancient',
        },
        {
            id: 'cost_to_costless',
            label: '+ cher au - cher',
        },
        {
            id: 'costless_to_cost',
            label: '- cher au + cher',
        }
    ]), value = ref<string>(props.selectValue);

    watch(value, (newValue) => {
        emit('change', newValue);
    })
</script>

<template>
    <div class="flex flex-row items-center gap-2">
        <span>Trier par: </span>
        <USelect v-model="value" color="neutral" variant="soft" size="md" value-key="id" :items="items" highlight :ui="{
            base: 'flex flex-row items-center',
            value: 'mx-4 text-base',
            viewport: 'p-2 bg-(--color-bg) rounded-xl shadow-[0 4px 32px 0 rgba(0, 0, 0, 0.1)] gap-2',
            itemLabel: 'text-base',
            trailing: 'relative',
        }" class="justify-center w-auto py-4 text-base bg-(--color-bg) text-(--color-text)" />
    </div>
</template>