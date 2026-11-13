<script setup lang="ts">
import type { Transition } from 'vue';
import type { CategoryGroup } from '~/config/categories';

const props = defineProps<{
    categoriesList: CategoryGroup[],
    expandedGroupsSet: Set<number>,
    toggleGroup: (group: CategoryGroup) => void,
    toggleGroupExpansion: (id: number) => void,
    toggleCategory: (value: string) => boolean | (Set<string> & Omit<Set<string>, keyof Set<any>>),
    isGroupFullySelected: (group: CategoryGroup) => boolean,
    isGroupPartiallySelected: (group: CategoryGroup) => boolean,
    selected: Set<string> & Omit<Set<string>, keyof Set<any>>,
    isAllSelected: boolean,
    isPartiallySelected: boolean
}>();
</script>

<template>
    <UCollapsible v-for="group in categoriesList" :key="group.id">
        <!-- Group header -->
        <div>
            <UButton type="button" :id="`group-${group.id}-button`" :label="group.label" color="neutral" size="xl"
                variant="outline"
                :trailing-icon="props.expandedGroupsSet.has(group.id) ? 'i-fa6-solid:chevron-down' : 'i-fa6-solid:chevron-up'"
                class="justify-center w-full py-4 text-xl" :aria-expanded="props.expandedGroupsSet.has(group.id)"
                :aria-label="`${props.expandedGroupsSet.has(group.id) ? 'Réduire' : 'Développer'} ${group.label}`"
                :aria-controls="`group-${group.id}-panel`" @click="props.toggleGroupExpansion(group.id)"
                @keydown.enter.prevent="props.toggleGroupExpansion(group.id)"
                @keydown.space.prevent="props.toggleGroupExpansion(group.id)">
            </UButton>

            <UIcon v-if="group.icon" :name="`i-fa6-solid:${group.icon}`" />
        </div>
        <template #content>
            <!-- <UCheckbox :label="`Sélectionner ${group.label}`" :model-value="isGroupFullySelected(group)"
                :indeterminate="isGroupPartiallySelected(group)" :aria-checked="isGroupFullySelected(group)
                    ? 'true'
                    : isGroupPartiallySelected(group)
                        ? 'mixed'
                        : 'false'" @update:model-value="() => toggleGroup(group)" /> -->
            <!-- <label :for="`toggle${group.label}`"></label>
                        <input :name="`toggle${group.label}`" type="checkbox" :checked="isGroupActive(group)"
                            :aria-label="`Sélectionner toutes les catégories de ${group.label}`"
                            @change="toggleGroup(group)" /> -->
            <div class="max-h-120 overflow-y-scroll xl:max-h-86">
                <Transition class="flex flex-col justify-center items-start mt-6 mb-6 gap-3">
                    <ul class="grid grid-cols-1 mt-6 gap-3 xl:grid-cols-5" :id="`group-${group.id}-panel`" role="region"
                        :aria-labelledby="`group-${group.id}-button`">
                        <li v-for="category in group.children" :key="category.id">
                            <UCheckbox :label="category.name" :model-value="props.selected.has(category.value)"
                                color="success" size="xl" variant="card" :value="category.value + category.id" :ui="{
                                    root: 'w-full h-full',
                                    wrapper: '',
                                    label: 'text-base font-semibold',
                                }" @update:model-value="() => props.toggleCategory(category.value)" />
                        </li> <!-- v-bind:checked="categoriesQuery.includes(String(category.id))" -->
                    </ul>
                </Transition>
            </div>
        </template>
    </UCollapsible>
</template>