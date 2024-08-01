<script setup lang="ts">
    import { onMounted, toRefs, ref, watch } from 'vue';
    const props = defineProps({
        attributeData: Object
    });

    const localAttributeData = ref();
    const articleNumber = ref();
    const size = ref();
    const color = ref();
    const fabric = ref();
    const supplierName = ref();
    const manufacturerName = ref();
    const manufacturerAddress = ref();
    const originCountry = ref();
    const productState = ref();
    const waterUsage = ref();
    const textileWaste = ref();
    const packagingWaste = ref();
    const carbonEmissionsData = ref();
    const materialCompositionData = ref();

    const attributeData = toRefs(props);

    watch(attributeData.attributeData, (newVal) => {
        console.log('Attribute Data Loaded:', newVal);
        localAttributeData.value = newVal;
        articleNumber.value = localAttributeData.value.article_number;
        size.value = localAttributeData.value.size;
        color.value = localAttributeData.value.color;
        fabric.value = localAttributeData.value.fabric;
        supplierName.value = localAttributeData.value.supplier?.name;
        manufacturerName.value = localAttributeData.value.manufacturer?.name;
        manufacturerAddress.value = localAttributeData.value.manufacturer?.address;
        originCountry.value = localAttributeData.value.country_of_origin;
        productState.value = localAttributeData.value.product_state;
        waterUsage.value = localAttributeData.value.water_usage.value + ' ' + localAttributeData.value.water_usage.unit;
        textileWaste.value = localAttributeData.value.waste_generation.textile_waste.value + ' ' + localAttributeData.value.waste_generation.textile_waste.unit;
        packagingWaste.value = localAttributeData.value.waste_generation.packaging_waste.value;
        +' ' + localAttributeData.value.waste_generation.packaging_waste.unit;
        // Setup carbon emissions data
        carbonEmissionsData.value = {
            labels: ['Manufacture', 'Factory to Port', 'Port to Warehouse', 'Warehouse to Store'],
            datasets: [
                {
                    label: 'Carbon Emissions (kg CO2e)',
                    backgroundColor: '#42A5F5',
                    data: [
                        localAttributeData.value.carbon_emissions.manufacture.value,
                        localAttributeData.value.carbon_emissions.transport.factory_to_port.value,
                        localAttributeData.value.carbon_emissions.transport.port_to_warehouse.value,
                        localAttributeData.value.carbon_emissions.transport.warehouse_to_store.value
                    ]
                }
            ]
        };

        // Setup material composition data
        materialCompositionData.value = {
            labels: ['Cotton', 'Dyes and Chemicals', 'Thread'],
            datasets: [
                {
                    data: [localAttributeData.value.material_composition.cotton.value, localAttributeData.value.material_composition.dyes_and_chemicals.value, localAttributeData.value.material_composition.thread.value],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }
            ]
        };
    });
    onMounted(async () => {
        console.log('Attribute Data in TShirt Component (mounted):', props.attributeData);
    });
</script>
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
                                <span class="block text-500 font-medium mb-3">Size</span>
                                <div class="text-900 font-medium text-xl">{{ size }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Color</span>
                                <div class="text-900 font-medium text-xl">{{ color }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Fabric</span>
                                <div class="text-900 font-medium text-xl">{{ fabric }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Product Status</span>
                                <div class="text-900 font-medium text-xl">{{ productState }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Country of Origin</span>
                                <div class="text-900 font-medium text-xl">{{ originCountry }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h5>Supplier & Manufacturer Info</h5>
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Supplier Name</span>
                                <div class="text-900 font-medium text-xl">{{ supplierName }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Manufacturer Name</span>
                                <div class="text-900 font-medium text-xl">{{ manufacturerName || 'unknown' }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Manufacturer Address</span>
                                <div class="text-900 font-medium text-xl">{{ manufacturerAddress }}</div>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div class="col-12 lg:col-6 xl:col-3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Water Usage (Liters)</span>
                                <div class="text-900 font-medium text-xl">2700</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h5>Material Composition</h5>
            <div class="grid">
                <div class="col-12 lg:col-6 xl:6">
                    <div class="card">
                        <Chart
                            v-if="materialCompositionData"
                            type="pie"
                            :data="materialCompositionData"
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

            <h5>Waste Generation</h5>
            <div class="grid">
                <div class="col-12 lg:col-6 xl:3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Textile Waste (grams)</span>
                                <div class="text-900 font-medium text-xl">{{ textileWaste }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:3">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3">Packaging Waste (grams)</span>
                                <div class="text-900 font-medium text-xl">{{ packagingWaste }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
