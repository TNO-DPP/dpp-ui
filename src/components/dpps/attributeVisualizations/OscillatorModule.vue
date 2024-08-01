<script setup lang="ts">
    import { toRefs, ref, watch } from 'vue';
    import { onMounted } from 'vue';
    const props = defineProps({
        attributeData: Object
    });
    const localAttributeData = ref();

    const attributeData = toRefs(props);

    const articleNumber = ref('');
    const supplierName = ref('');
    const materialComposition = ref([]);
    const reparability = ref();
    const carbonEmissionsData = ref({});
    const waterUsageData = ref({});

    watch(attributeData.attributeData, (newVal) => {
        console.log('Attribute Data Loaded:', newVal);
        localAttributeData.value = newVal;
        if (newVal) {
            articleNumber.value = newVal.article_number;
            supplierName.value = newVal.supplier.name;
            materialComposition.value = newVal.material_composition;
            reparability.value = newVal.reparability;
            createChartData(newVal.material_composition);
        }
    });

    onMounted(() => {
        console.log('General Data in Component (mounted):', props.attributeData);
        localAttributeData.value = props.attributeData;
        if (props.attributeData) {
            articleNumber.value = props.attributeData.article_number;
            supplierName.value = props.attributeData.supplier.name;
            materialComposition.value = props.attributeData.material_composition;
            reparability.value = props.attributeData.reparability;
            createChartData(props.attributeData.material_composition);
        }
    });

    const createChartData = (materialData) => {
        const labels = materialData.map((item) => item.name);
        const emissions = materialData.map((item) => item.carbon_emissions_cost_kg_CO2);
        const waterUsage = materialData.map((item) => item.water_usage_liters);

        carbonEmissionsData.value = {
            labels: labels,
            datasets: [
                {
                    label: 'Carbon Emissions (kg CO2e)',
                    backgroundColor: '#42A5F5',
                    data: emissions
                }
            ]
        };

        waterUsageData.value = {
            labels: labels,
            datasets: [
                {
                    label: 'Water Usage (liters)',
                    backgroundColor: '#66BB6A',
                    data: waterUsage
                }
            ]
        };
    };
</script>
<!-- <template>
    <pre>{{ localAttributeData }}</pre>
</template> -->
<template>
    <Card>
        <template #content>
            <h4>Product Information</h4>
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Article Number</span>
                                <div class="text-900 font-medium text-xl">{{ articleNumber }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Supplier</span>
                                <div class="text-900 font-medium text-xl">{{ supplierName }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Reparability</span>
                                <div class="text-900 font-medium text-xl">{{ reparability }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Add more cards here as needed -->
            </div>

            <h5>Environmental Impact</h5>
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-6">
                    <div class="card">
                        <h5>Carbon Emissions (kg CO2e)</h5>
                        <Chart
                            v-if="carbonEmissionsData"
                            type="bar"
                            :data="carbonEmissionsData"
                            :options="{
                                plugins: {
                                    legend: {
                                        position: 'right'
                                    }
                                }
                            }"
                        />
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-6">
                    <div class="card">
                        <h5>Water Usage (liters)</h5>
                        <Chart
                            v-if="waterUsageData"
                            type="bar"
                            :data="waterUsageData"
                            :options="{
                                plugins: {
                                    legend: {
                                        position: 'right'
                                    }
                                }
                            }"
                        />
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
