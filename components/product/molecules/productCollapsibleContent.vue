<script setup lang="ts">
import { capitalize } from 'vue';

const props = defineProps<{
    title: string,
    productId?: string | number,
    loader: () => Promise<any>,
    fields?: string[]
}>();

const isOpen = ref<boolean>(false),
    isLoading = ref<boolean>(false),
    isLoaded = ref<boolean>(false),
    data = shallowRef<any>(null);

const loadData = async () => {
    if (isLoaded.value || isLoading.value) return

    isLoading.value = true
    try {
        data.value = await props.loader()
        isLoaded.value = true
    } catch (error) {
        console.error('Collapsible fetch error: ', error)
    } finally {
        isLoading.value = false
    }
};
</script>

<template>
    <UCollapsible v-model:open="isOpen" class="flex flex-col items-baseline gap-2 mx-6 my-3">
        <UButton class="group" color="neutral" variant="ghost" trailing-icon="fa6-solid:chevron-down" :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }" @click.prevent="!isLoaded && loadData()" block>
            <span class="text-base font-semibold">{{ capitalize(title) }}</span>
        </UButton>

        <template #content>
            <div v-if="!isLoaded" class="py-4">Loading...</div>

            <div v-else-if="isLoaded">
                <slot :data="data"></slot>
            </div>
        </template>
    </UCollapsible>
</template>