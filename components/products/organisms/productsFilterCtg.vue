<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';
import type { CategoryGroup } from '~/config/categories';
import { useStorage } from '@vueuse/core';
import ProductsMoleculeCollapsible from '../molecules/productsMoleculeCollapsible.vue';

const props = defineProps<{
    categoriesList: CategoryGroup[],
    categoriesQuery: LocationQueryValue[],
}>();

const emit = defineEmits<{
    (e: 'submit', values: string[]): void
    (e: 'reset'): void
}>();

const filterStore = useFilterStore(), route = useRoute(), router = useRouter();
const selected = ref<Set<string>>(new Set(filterStore.categories));

// Flat all category values
const allCategoryValues = computed(() => props.categoriesList.flatMap(group => group.children.map(c => c.value)))

// Focus management
const focusFirstCheckbox = (id: number) => {
    nextTick(() => {
        const el = document.querySelector(`#group-${id}-panel input[type="checkbox"]`) as HTMLElement | null

        el?.focus()
    })
};

// Expand / collapse groups
const expandedGroups = useStorage<number[]>('products:expanded-groups', [1]) // default open group
// ref<Set<number>>(new Set([1])); // Group 1 is expanded by default
const expandedGroupsSet = computed({
    get: () => new Set(expandedGroups.value),
    set: (v: Set<number>) => {
        expandedGroups.value = [...v]
    }
});

const syncExpandedFromRoute = () => {
    const q = route.query.openGroups

    expandedGroupsSet.value = q
        ? new Set(
            (Array.isArray(q) ? q[0] : q)
                ?.split(',')
                .map(Number)
                .filter(Boolean)
        )
        : new Set()
};

let openGroupsTimer: ReturnType<typeof setTimeout> | null = null

const syncExpandedToRoute = () => {
    if (import.meta.server) return
    if (openGroupsTimer) clearTimeout(openGroupsTimer)

    openGroupsTimer = setTimeout(() => {
        router.replace({
            query: {
                ...route.query,
                openGroups: expandedGroupsSet.value.size
                    ? [...expandedGroups.value].join(',')
                    : undefined
            }
        })
    }, 200)
};

const toggleGroupExpansion = (id: number) => {
    const set = new Set(expandedGroupsSet.value)

    set.has(id) ? set.delete(id) : set.add(id) && focusFirstCheckbox(id)
    expandedGroupsSet.value = set

    syncExpandedFromRoute();
    syncExpandedToRoute();
};

// Toggle/Untoggle a whole group
const toggleGroup = (group: CategoryGroup) => {
    const allSelected = isGroupFullySelected(group)

    return group.children.forEach(c => {
        allSelected
            ? selected.value.delete(c)
            : selected.value.add(c)
    })
};

// Group state helpers
const isGroupFullySelected = (group: CategoryGroup) => {
    return group.children.every(childId => props.categoriesQuery?.includes(String(childId)))
    // group.children.every(c => selected.value.has(c.value))
};

const isGroupPartiallySelected = (group: CategoryGroup) => {
    return group.children.some(c => selected.value.has(c)) && !isGroupFullySelected(group)
};

// Global selection helpers
const isAllSelected = computed(() => allCategoryValues.value.length > 0 && allCategoryValues.value.every(v => selected.value.has(v)))

const isPartiallySelected = computed(() => allCategoryValues.value.some(v => selected.value.has(v)) && !isAllSelected.value)

/* const isGroupActive = (group: typeof categoryGroups[0]) => {
    return group.children.some(childId => props.categoriesQuery?.includes(String(childId)))
}; */

// Toggle a single category
const toggleCategory = (value: string) => {
    return selected.value.has(value)
        ? selected.value.delete(value)
        : selected.value.add(value)
};

// Toggle all categories
const toggleAllCategories = () => {
    return isAllSelected.value
        ? selected.value.clear()
        : allCategoryValues.value.forEach(v => selected.value.add(v))
};

// Submit & reset
const submitFilters = () => {
    emit('submit', Array.from(selected.value))
},
    clearFilters = () => {
        selected.value.clear()
        emit('reset')
    };

watch(() => route.query.openGroups, syncExpandedFromRoute, { immediate: true });

watchEffect(() => {
    props.categoriesList.forEach(group => {
        if (isGroupPartiallySelected(group) || isGroupFullySelected(group)) {
            expandedGroupsSet.value.add(group.id)
        }
    })
});
</script>

<template>
    <form class="flex flex-col items-center" name="categories" action="" method="post" role="search"
        aria-labelledby="filters-title" @submit.prevent="submitFilters" @reset.prevent="clearFilters">
        <h2 id="filters-title" class="sr-only">Filtres produits</h2>
        <fieldset class="flex flex-col items-center gap-4 my-6 xl:flex-row">
            <UButton type="submit" label="Filtrer les catégories" color="neutral" variant="solid" size="xl"
                icon="i-fa6-solid:filter" class="justify-center w-[90%] px-6 py-4 text-xl"
                @click.stop.prevent="submitFilters" />
            <UButton type="reset" :disabled="filterStore.categories.length !== 0 ? false : true"
                label="Réinitialiser les filtres" color="error" variant="soft" size="xs" icon="i-fa6-solid:trash"
                class="justify-center w-[90%] px-6 py-4 text-xl" @click.stop.prevent="clearFilters" />
        </fieldset>
        <fieldset>
            <!-- <ProductsSelectMenu :select-value="productSelectValue" @change="updateSelectValue" /> -->
        </fieldset>
        <fieldset class="grid grid-cols-1 w-full gap-3">
            <span>{{ filterStore.categories.length }} filtre{{ filterStore.categories.length > 1 ? 's' : '' }}
                sélectionné{{ filterStore.categories.length > 1 ? 's' : '' }}</span>
            <UCheckbox label="Toutes les catégories" :model-value="isAllSelected" :indeterminate="isPartiallySelected"
                aria-describedby="select-all-help" size="xl" @update:model-value="toggleAllCategories" />
            <p id="select-all-help" class="sr-only">Sélectionne ou désélectionne toutes les catégories disponibles</p>
            <div v-if="categoriesList.length > 0">
                <ProductsMoleculeCollapsible :categories-list="categoriesList" :expanded-groups-set="expandedGroupsSet"
                    :toggle-group="toggleGroup" :toggle-group-expansion="toggleGroupExpansion"
                    :toggle-category="toggleCategory" :is-group-fully-selected="isGroupFullySelected"
                    :is-group-partially-selected="isGroupPartiallySelected" :selected="selected"
                    :is-all-selected="isAllSelected" :is-partially-selected="isPartiallySelected" />
            </div>
        </fieldset>
    </form>
</template>