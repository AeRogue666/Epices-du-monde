<script setup lang="ts">
    defineProps<{
        filteredCategories: Array<string>,
        categoriesList: Array<{
            id: number,
            label: string,
            children: Array<{
                id: number,
                label: string,
                value: string,
                checked?: boolean,
            }>
        }>,
    }>();

    defineEmits<{
        tag: [value: string],
    }>();

    const isFilterCtgMenuOpen = ref(false),
        openFilterCtgMenu = () => {
            isFilterCtgMenuOpen.value = !isFilterCtgMenuOpen.value
        };
</script>

<template>
    <ul class="grid grid-cols-1 w-full gap-3">
        <li class="mx-4">
            <span>Filtrer par catégories: </span>
            <span v-if="filteredCategories" class="text-green-600">{{ filteredCategories.length
            }}</span>
            <UCollapsible>
                <UButton type="button" label="Categories" color="neutral" size="xl"
                    variant="outline" trailing-icon="i-fa6-solid:chevron-down"
                    class="justify-center w-full py-4 text-xl" @click="openFilterCtgMenu" />
                <template #content>
                    <div class="max-h-120 overflow-y-scroll xl:max-h-86">
                        <section v-for="(obj, i) of categoriesList"
                            class="flex flex-col justify-center items-start mt-6 gap-3" :key="i">
                            <h3 class="text-xl font-semibold">{{ obj.label }}</h3>
                            <ul class="grid grid-cols-2 mt-6 gap-3 xl:grid-cols-5">
                                <li v-for="(tag, i) of obj.children" :key="i">
                                    <UCheckbox v-model="tag.checked" :label="tag.label" color="success" size="xl"
                                        variant="card" :value="tag.value + tag.id" :ui="{
                                            root: 'w-full h-full',
                                            wrapper: '',
                                            label: 'text-base font-semibold',
                                        }" @click.stop.prevent="$emit('tag', tag.value.toLocaleLowerCase())" />
                                </li>
                            </ul>
                        </section>
                    </div>
                </template>
            </UCollapsible>
        </li>
    </ul>
</template>