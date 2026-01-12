<script setup lang="ts">
import { capitalize } from 'vue';

defineProps<{
    nutritions: Nutrition[];
}>();

const dailyEnergy = ref<number>(8400); // Energy in kJ needed per day (8400 kJ - 2000 kCal)
</script>

<template>
    <table class="min-w-full overflow-clip">
        <caption>{{ capitalize($t('main.product.nutrition.title')) }}</caption>
        <thead class="relative">
            <tr class="data-[selected=true]:bg-elevated/50">
                <td colspan="2"></td>
                <th scope="col"
                    class="px-4 py-3.5 text-sm text-highlighted text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.per_100g')) }}
                </th>
                <th scope="col"
                    class="px-4 py-3.5 text-sm text-highlighted text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.rnj')) }}
                </th>
            </tr>
            <tr class="absolute z-1 left-0 w-full h-px bg-(--ui-border-accented)"></tr>
        </thead>
        <tbody v-for="(nutrition, i) of nutritions"
            class="[&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary divide-y divide-default">
            <tr v-if="nutrition.energie" class="data-[selected=true]:bg-elevated/50" :key="i">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    Energie</th>
                <td>{{ nutrition.energie }} kJ ({{ Math.round(nutrition.energie / 4.184) }} kCal)</td>
                <td>{{ Math.round(nutrition.energie * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.fat')) }}
                </th>
                <td>{{ nutrition.matieres_grasses || 0 }} g</td>
                <td>{{ Math.round(nutrition.matieres_grasses * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.satured_fat')) }}
                </th>
                <td>{{ nutrition.acide_gras_satures || 0 }} g</td>
                <td>{{ Math.round(nutrition.acide_gras_satures * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.glucides')) }}
                </th>
                <td>{{ nutrition.glucides || 0 }} g</td>
                <td>{{ Math.round(nutrition.glucides * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.sugar')) }}
                </th>
                <td>{{ nutrition.sucres || 0 }} g</td>
                <td>{{ Math.round(nutrition.sucres * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.fiber')) }}
                </th>
                <td>{{ nutrition.fibres || 0 }} g</td>
                <td>{{ Math.round(nutrition.fibres * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.proteine')) }}
                </th>
                <td>{{ nutrition.proteines || 0 }} g</td>
                <td>{{ Math.round(nutrition.proteines * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.salt')) }}
                </th>
                <td>{{ nutrition.sel || 0 }} g</td>
                <td>{{ Math.round(nutrition.sel * 100 / dailyEnergy) }} %</td>
            </tr>
            <tr class="data-[selected=true]:bg-elevated/50">
                <td class="w-4 border-t-0"></td>
                <th colspan="2" scope="rowgroup"
                    class="flex justify-start p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0">
                    {{ capitalize($t('main.product.nutrition.edulcorant')) }}
                </th>
                <td>{{ nutrition.edulcorants || 0 }}</td>
            </tr>
        </tbody>
    </table>
</template>