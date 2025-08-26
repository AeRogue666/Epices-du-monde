<script setup lang="ts">
    import { UButton } from '#components';
    import ProductsSelectMenu from '../molecules/productsMoleculesSelectMenu.vue';

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

    const { currentRoute, push } = useRouter();
    const filteredCategories = reactive<Array<string>>([]),
        productSelectValue = ref<string>('pertinence');

    const updateSelectValue = (v: string) => {
        productSelectValue.value = v
    }

    const submitCategories = (value: string) => {
        const index = filteredCategories.indexOf(value);
        index > -1 ? filteredCategories.splice(index, 1) : filteredCategories.push(value)
    };

    const updateCategoriesState = (parameter: string, value: any) => {
        if (!filteredCategories) {
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
                query: {},
            })
        },
        resetCategoriesState = () => {
            resetQuery();
            console.log(filteredCategories)
        },
        checkCategoriesCheckedState = (array: { children: Array<{ id: number, label: string, value: string, checked?: boolean }> }[]) => {
            array.map((obj: { children: any[]; }) => {
                const findIndex = obj.children.findIndex((item: { checked: boolean; }) => item.checked == true);
                if (findIndex > -1) {
                    return filteredCategories.push(obj.children[findIndex]?.value), useCategoriesStore().category = obj.children[findIndex]?.value
                }
            })
        };

    onMounted(() => {
        checkCategoriesCheckedState(props.categoriesList)
    })

    watch(filteredCategories, (newValue) => {
        console.log(newValue)
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
            <ProductsSelectMenu :select-value="productSelectValue" @change="updateSelectValue" />
        </fieldset>
        <ProductsMoleculesProductsMoleculeCollapsible :filtered-categories="filteredCategories" :categories-list="categoriesList"
            @tag="submitCategories" />
    </form>
</template>