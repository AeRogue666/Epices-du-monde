<script setup lang="ts">
    const props = defineProps<{
        categoriesList: Array<{
            id: number,
            label: string,
            children: Array<{
                id: number,
                label: string,
                value: string,
                checked?: boolean,
            }>
        }>
    }>();
    const emit = defineEmits<{
        id: [value: string]
    }>();

    const { currentRoute, push } = useRouter();
    const filteredCategories = reactive<{}[]>([]),
        isFilterCtgMenuOpen = ref(false),
        productSelectValue = ref<string>('pertinence');

    const openFilterCtgMenu = () => {
        isFilterCtgMenuOpen.value = !isFilterCtgMenuOpen.value
    },
        updateSelectValue = (v: string) => {
            productSelectValue.value = v
        }

    const submitCategories = (value: string) => {
        const index = filteredCategories.indexOf(value);
        index > -1 ? filteredCategories.splice(index, 1) : filteredCategories.push(value);
    };

    const updateCategoriesState = (parameter: string, value: any) => {
        if (filteredCategories.length == 0) {
            resetQuery()
        } else {
            push({
                query: {
                    ...currentRoute.value.query,
                    [parameter]: value,
                }
            })
        }
    },
        resetQuery = () => {
            push({
                query: {}
            })
        }, resetCategoriesState = () => {
            resetQuery();
            console.log(filteredCategories)
        },
        checkCategoriesCheckedState = (array: { children: any[]; }[]) => {
            array.map((obj: { children: any[]; }) => {
                const findIndex = obj.children.findIndex((item: { checked: boolean; }) => item.checked == true );
                if(findIndex > -1) {
                    return filteredCategories.push(obj.children[findIndex]?.value), useCategoriesStore().category = obj.children[findIndex]?.value
                }
            })
        };

    onMounted(() => {
        checkCategoriesCheckedState(props.categoriesList)
    })

    onUpdated(() => {
        console.log(filteredCategories)
    })
</script>

<template>
    <form class="flex flex-col items-center" name="categories" action="" method="post">
        <fieldset class="flex flex-col items-center gap-4 my-6 xl:flex-row">
            <UButton type="submit" label="Filtrer les catégories" color="neutral" variant="solid" size="xl"
                icon="i-fa6-solid:filter" class="justify-center w-[90%] px-6 py-4 text-xl"
                @click.stop.prevent="updateCategoriesState('categories', filteredCategories)" />
            <UButton type="reset" label="Déselectionner toutes les catégories" color="error" variant="soft" size="xs"
                icon="i-fa6-solid:trash" class="justify-center w-[90%] px-6 py-4 text-xl"
                @click.stop.prevent="resetCategoriesState" />
        </fieldset>
        <fieldset>
            <ProductsComponentsProductsSelectMenu :select-value="productSelectValue" @change="updateSelectValue" />
        </fieldset>
        <ul class="grid grid-cols-1 w-full gap-3">
            <li class="mx-4">
                <span>Filtrer par catégories: </span>
                <span v-if="filteredCategories.length !== 0" class="text-green-600">{{ filteredCategories.length
                }}</span>
                <UCollapsible>
                    <UButton v-model="filteredCategories" type="button" label="Categories" color="neutral" size="xl"
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
                                            }" @click.stop.prevent="submitCategories(tag.value.toLocaleLowerCase())" />
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </template>
                </UCollapsible>
            </li>
        </ul>
    </form>
</template>