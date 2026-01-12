<script setup lang="ts">
const props = defineProps<{
    loader: () => Promise<any>,
}>();

const isLoading = ref<boolean>(false),
    isLoaded = ref<boolean>(false),
    data = shallowRef<any>(null);

const loadData = async () => {
    if (isLoaded.value || isLoading.value) return

    isLoading.value = true
    try {
        data.value = await props.loader()
        isLoaded.value = true
    } catch (error) {
        console.error('Label fetch error: ', error)
    } finally {
        isLoading.value = false
    }
};

onMounted(() => {
    loadData()
});
</script>

<template>
    <UIcon v-for="(label, i) of data" :name="label.name" role="img" :aria-label="label.description" focusable="false"
        class="size-5" :key="i + label.id" />
</template>