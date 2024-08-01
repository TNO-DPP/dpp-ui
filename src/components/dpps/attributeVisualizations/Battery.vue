<script setup lang="ts">
    import { onMounted, toRefs, ref, watch } from 'vue';
    // import { Card } from 'primevue/card';
    // import { Chart } from 'primevue/chart';
    // import { DataTable, Column } from 'primevue/datatable';

    const props = defineProps({
        attributeData: Object
    });

    // Initialize references for the battery data and charts
    const localBatteryData = ref();
    const batteryID = ref();
    const manufacturingDate = ref();
    const serviceDate = ref();
    const placeOfManufacturing = ref();
    const cO2Footprint = ref();

    const encounteredNegativeEvents = ref();
    const warrantyPeriod = ref();
    const performanceClass = ref();
    const carbonFootprintStudyLink = ref();
    const declarationOfConformityID = ref();
    const remainingPowerCapability = ref();
    const extinguishingAgent = ref();

    // Table
    const physicalDimensions = ref();

    const carbonFootprintData = ref();
    const efficiencyData = ref();
    const materialCompositionData = ref();
    const cycleLifeData = ref();

    // Energy
    // Another Table
    const internalResistance = ref();
    const voltageProperties = ref();
    const batteryPowerProperties = ref();
    const temperatureProperties = ref();

    const electrochemicalProperties = ref();
    const energyProperties = ref();
    const cycleLifeProperties = ref();
    const stateOfBattery = ref();
    const compositionProperties = ref();
    const supplierInformation = ref();

    const attachmentsList = ref();
    const temperatureRanges = ref();
    const cellChemicalProperties = ref();
    const batteryCategory = ref();
    const hasRenewableContentShare = ref();

    const attributeData = toRefs(props);

    // Watch for the prop changes and set up local data
    watch(attributeData.attributeData, (newVal) => {
        localBatteryData.value = newVal;
        let data = localBatteryData.value;

        // Tab 1 - Basic
        // Basic stuff
        // Card stuff at top
        batteryID.value = data.batteryIDDMCCode;
        manufacturingDate.value = data.dateOfManufacturing;
        serviceDate.value = data.dateOfService;
        placeOfManufacturing.value = data.placeOfManufacturing;
        cO2Footprint.value = data.cO2FootprintTotal;

        // Advanced stuff
        encounteredNegativeEvents.value = data.encounteredNegativeEvents;
        batteryCategory.value = data.batteryCategory;
        warrantyPeriod.value = data.warrantyPeriod;
        performanceClass.value = data.carbonFootprintPerformanceClass;
        carbonFootprintStudyLink.value = data.carbonFootprintStudyLink;
        declarationOfConformityID.value = data.declarationOfConformityID;
        remainingPowerCapability.value = data.remainingPowerCapability;
        extinguishingAgent.value = data.extinguishingAgent;

        // Physical Dimensions table
        physicalDimensions.value = data.hasPhysicalDimensionsProperties;

        // Tab 2 - Energy and temperature details
        // General energy properties available
        electrochemicalProperties.value = data.hasElectrochemicalProperties;

        // Internal resistance properties table
        internalResistance.value = data.hasElectrochemicalProperties.internalResistanceProperties;

        // Voltage Properties table
        voltageProperties.value = data.hasElectrochemicalProperties.voltageProperties;

        // Battery power properties
        batteryPowerProperties.value = data.hasElectrochemicalProperties.batteryPowerProperties;

        // batteryStats
        // energy properties
        energyProperties.value = data.hasBatteryEnergyProperties;
        // cycle properties
        cycleLifeProperties.value = data.hasBatteryCycleLifeProperties;
        // state of battery properties
        stateOfBattery.value = data.hasStateOfBatteryProperties;

        // Temperature properties
        temperatureProperties.value = data.hasElectrochemicalProperties.temperatureProperties;
        temperatureRanges.value = {
            idle: data.temperatureRangeIdleState,
            extremeEvents: data.timeSpentInExtremeTemperatures,
            chargingExtreme: data.timeSpentChargingDuringExtremeTemperatures
        };

        // Tab 3 - Cell chemical properties
        // Contains cathodeActive, recyclateContentActive, anodeActive
        // cathodeOther, anodeOther, electrolyte composition
        // conformity declaration
        // test report results
        cellChemicalProperties.value = data.hasCellChemistryProperties;

        // simple composition details
        // Tab 4- Material composition properties
        compositionProperties.value = data.hasCompositionProperties.componentsProperties;
        hasRenewableContentShare.value = data.hasRenewableContentShare;
        // part of information inside composition
        supplierInformation.value = data.hasCompositionProperties.componentsProperties.involvedSupplierComponents;

        attachmentsList.value = {
            declarationOfConformity: data.hasCellChemistryProperties.declarationOfConformity.attachmentName,
            cellChemistryTestResults: data.hasCellChemistryProperties.testReportsResults.attachmentName,
            safetyMeasures: data.safetyMeasures.attachmentName,
            compositionOfBattery: data.hasCompositionProperties.compositionOfBattery.attachmentName,
            meaningLabelsAndSymbols: data.meaningLabelsAndSymbols.attachmentName,
            separateCollectionSymbol: data.separateCollectionSymbol.attachmentName,
            manualDissasemblyAndDismantlingBatteryPack: data.manualDissasemblyAndDismantlingBatteryPack.attachmentName,
            manualRemovalBatteryFromAppliance: data.manualRemovalBatteryFromAppliance.attachmentName,
            dueDiligenceReport: data.dueDiligenceReport.attachmentName,
            roleOfEndUsersInWastePrevention: data.roleOfEndUsersInWastePrevention.attachmentName,
            roleOfEndUsersInSeparateCollectionOfWasteBatteries: data.roleOfEndUsersInSeparateCollectionOfWasteBatteries.attachmentName,
            informationOnSeparateCollectionTakeBackCollectionPointsPreparingForReusePreparingForRepurposingAndRecyclingOperations:
                data.informationOnSeparateCollectionTakeBackCollectionPointsPreparingForReusePreparingForRepurposingAndRecyclingOperations.attachmentName
        };

        // Setup charts and tables based on above variables and data
        setupChartData();
        setupTableData();
    });

    const setupChartData = () => {
        carbonFootprintData.value = {
            labels: ['Total CO2 Footprint'],
            datasets: [
                {
                    label: 'CO2 Footprint (kg CO2e)',
                    backgroundColor: '#42A5F5',
                    data: [cO2Footprint.value]
                }
            ]
        };

        efficiencyData.value = {
            labels: ['Round-trip Energy Efficiency', 'Remaining Round-trip Energy Efficiency'],
            datasets: [
                {
                    label: 'Energy Efficiency',
                    backgroundColor: ['#42A5F5', '#66BB6A'],
                    data: [energyProperties.value.energyRoundtripEfficiency, energyProperties.value.remainingRoundTripEnergyEfficiency]
                }
            ]
        };
        let temp = electrochemicalProperties.value;
        console.log(temp);
        materialCompositionData.value = {
            labels: ['Cathode', 'Anode', 'Electrolyte'],
            datasets: [
                {
                    data: [
                        cellChemicalProperties.value.cathodeActiveMaterials[0]?.materialWeight || 0,
                        cellChemicalProperties.value.anodeActiveMaterials[0]?.materialWeight || 0,
                        cellChemicalProperties.value.electrolyteComposition[0]?.materialWeight || 0
                    ],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }
            ]
        };

        cycleLifeData.value = {
            labels: ['Charge/Discharge Cycles', 'Capacity Throughput'],
            datasets: [
                {
                    label: 'Cycle Life Metrics',
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    data: [cycleLifeProperties.value.chargeDischargeCycles, cycleLifeProperties.value.capacityThroughput]
                }
            ]
        };
    };
    const setupTableData = () => {};

    onMounted(async () => {
        console.log('Attribute Data in Battery Component (mounted):', props.attributeData);
    });
</script>

<template>
    <div class="grid">
        <Card class="col-12">
            <template #title>Battery ID: {{ batteryID }}</template>
            <template #content>
                <div class="grid">
                    <div class="col-12 md:col-4">
                        <Card>
                            <span class="block text-500 font-medium mb-3">Manufacturing Date</span>
                            <div class="text-900 font-medium text-xl">{{ manufacturingDate }}</div>
                        </Card>
                    </div>
                    <div class="col-12 md:col-4">
                        <Card>
                            <span class="block text-500 font-medium mb-3">Service Date</span>
                            <div class="text-900 font-medium text-xl">{{ serviceDate }}</div>
                        </Card>
                    </div>
                    <div class="col-12 md:col-4">
                        <Card>
                            <span class="block text-500 font-medium mb-3">Manufactured At</span>
                            <div class="text-900 font-medium text-xl">{{ placeOfManufacturing }}</div>
                        </Card>
                    </div>
                </div>
                <h5>Carbon Footprint</h5>
                <Chart v-if="carbonFootprintData" type="bar" :data="carbonFootprintData" :options="{ plugins: { legend: { position: 'right' } } }" />
                <h5>Efficiency</h5>
                <Chart v-if="efficiencyData" type="pie" :data="efficiencyData" :options="{ plugins: { legend: { position: 'right' } } }" />
                <h5>Material Composition</h5>
                <Chart v-if="materialCompositionData" type="doughnut" :data="materialCompositionData" :options="{ plugins: { legend: { position: 'right' } } }" />
                <h5>Cycle Life Properties</h5>
                <Chart v-if="cycleLifeData" type="bar" :data="cycleLifeData" :options="{ plugins: { legend: { position: 'right' } } }" />
                <h5>Physical Dimensions</h5>
                <DataTable :value="[physicalDimensions.value]" v-if="physicalDimensions">
                    <Column field="length" header="Length (mm)" />
                    <Column field="width" header="Width (mm)" />
                    <Column field="height" header="Height (mm)" />
                    <Column field="diameter" header="Diameter (mm)" />
                    <Column field="weight" header="Weight (kg)" />
                </DataTable>
                <h5>Internal Resistance Properties</h5>
                <DataTable :value="internalResistance" v-if="internalResistance">
                    <Column field="cellInternalResistance" header="Cell Internal Resistance" />
                    <Column field="cellInternalResistanceCurrent" header="Cell Internal Resistance (Current)" />
                    <Column field="cellInternalResistanceIncrease" header="Cell Internal Resistance Increase" />
                    <Column field="packInternalResistance" header="Pack Internal Resistance" />
                    <Column field="packInternalResistanceIncrease" header="Pack Internal Resistance Increase" />
                    <Column field="packInternalResistanceCurrent" header="Pack Internal Resistance (Current)" />
                    <Column field="deepDischargeEvents" header="Deep Discharge Events" />
                    <Column field="overchargeEvents" header="Overcharge Events" />
                    <Column field="moduleInternalResistanceInitial" header="Module Internal Resistance (Initial)" />
                    <Column field="moduleInternalResistanceIncrease" header="Module Internal Resistance Increase" />
                    <Column field="moduleInternalResistanceCurrent" header="Module Internal Resistance (Current)" />
                </DataTable>

                <h5>Voltage Properties</h5>
                <DataTable :value="plateVoltages" v-if="plateVoltages">
                    <Column field="minVoltage" header="Min Voltage" />
                    <Column field="nomimalVoltage" header="Nominal Voltage" />
                    <Column field="maxVoltage" header="Max Voltage" />
                    <Column field="minimalOperatinCurrent" header="Minimal Operating Current" />
                    <Column field="maximumOperatingCurrent" header="Maximum Operating Current" />
                </DataTable>

                <h5>Temperature Properties</h5>
                <DataTable :value="temperatureProperties" v-if="temperatureProperties">
                    <Column field="environmentalOperatingTemperature" header="Environmental Operating Temperature" />
                    <Column field="averageTemperatureUsage" header="Average Temperature (Usage)" />
                    <Column field="minimalTemperatureUsage" header="Minimal Temperature (Usage)" />
                    <Column field="maximumTemperatureUsage" header="Maximum Temperature (Usage)" />
                    <Column field="averageTemperatureCharging" header="Average Temperature (Charging)" />
                    <Column field="minimalTemperatureCharging" header="Minimal Temperature (Charging)" />
                    <Column field="maximumTemperatureCharging" header="Maximum Temperature (Charging)" />
                </DataTable>

                <h5>State of Battery</h5>
                <DataTable :value="stateOfBattery" v-if="stateOfBattery">
                    <Column field="statusBattery" header="Battery Status" />
                    <Column field="stateOfHealth" header="State of Health (%)" />
                    <Column field="stateOfCharge" header="State of Charge (%)" />
                </DataTable>

                <h5>Energy Properties</h5>
                <DataTable :value="energyProperties" v-if="energyProperties">
                    <Column field="energyRoundtripEfficiency" header="Round-trip Efficiency (%)" />
                    <Column field="energyRoundtripEfficiencyChange" header="Efficiency Change (%)" />
                    <Column field="maximumAllowedBatteryEnergy" header="Max Allowed Energy (kWh)" />
                    <Column field="initialSelfDischargingRate" header="Initial Self-Discharge Rate (%)" />
                    <Column field="currentSelfDischargingRate" header="Current Self-Discharge Rate (%)" />
                    <Column field="evolutionSelfDischargingRate" header="Self-Discharge Rate Evolution (%)" />
                    <Column field="certifiedUsableBatteryEnergy" header="Certified Usable Energy (kWh)" />
                    <Column field="remainingUsableBatteryEnergy" header="Remaining Usable Energy (kWh)" />
                    <Column field="stateOfCertifiedEnergy" header="State of Certified Energy (%)" />
                    <Column field="roundTripEnergyEfficiencyAt50CycleLife" header="Efficiency at 50% Cycle Life (%)" />
                    <Column field="remainingRoundTripEnergyEfficiency" header="Remaining Round-trip Efficiency (%)" />
                </DataTable>

                <h5>Cycle Life Properties</h5>
                <DataTable :value="cycleLifeProperties" v-if="cycleLifeProperties">
                    <Column field="expectedLifetime" header="Expected Lifetime (Years)" />
                    <Column field="cycleLifeTestCRate" header="Cycle Life Test C-Rate" />
                    <Column field="cycleLifeTestDepthOfDischarge" header="Depth of Discharge (%)" />
                    <Column field="chargeDischargeCycles" header="Charge/Discharge Cycles" />
                    <Column field="energyThroughput" header="Energy Throughput (MWh)" />
                    <Column field="capacityThroughput" header="Capacity Throughput (kWh)" />
                    <Column field="cycleLifeReferenceTest" header="Cycle Life Reference Test" />
                </DataTable>

                <h5>Supplier Information</h5>
                <div v-if="supplierInformation">
                    <DataTable :value="supplierInformation">
                        <Column field="manufacturerWebsite" header="Website" />
                        <Column field="manufacturerEmail" header="Email" />
                        <Column field="manufacturerName" header="Name" />
                        <Column field="manufacturerAddress" header="Address" />
                        <Column field="manufacturerPhoneNumber" header="Phone Number" />
                        <Column field="manufacturerTradeDetails" header="Trade Details" />
                    </DataTable>
                </div>

                <h5>Safety Measures</h5>
                <p>To be added</p>
                <!-- <div v-if="safetyMeasures.value">
                    <a :href="'/path/to/documents/' + safetyMeasures.value" target="_blank">View Safety Measures Document</a>
                </div> -->

                <h5>Warranty Period</h5>
                <div v-if="warrantyPeriod">
                    <span>{{ warrantyPeriod }} Years</span>
                </div>

                <h5>Performance Class</h5>
                <div v-if="performanceClass">
                    <span>Performance Class: {{ performanceClass }}</span>
                </div>

                <h5>Manuals and Documentation</h5>
                <p>To be added</p>
                <!-- <v-if ="manualDocuments.value">
                    <a :href="'/path/to/documents/' + manualDocuments.value.attachementName" target="_blank">View Disassembly and Dismantling Manual</a>
                </v-if> -->

                <h5>Temperature Ranges and Events</h5>
                <DataTable :value="temperatureRanges" v-if="temperatureRanges">
                    <Column field="idle.lowerBound" header="Idle State Lower Bound" />
                    <Column field="idle.upperBound" header="Idle State Upper Bound" />
                    <Column field="extremeEvents.lowerBound" header="Extreme Events Lower Bound" />
                    <Column field="extremeEvents.upperBound" header="Extreme Events Upper Bound" />
                    <Column field="chargingExtreme.lowerBound" header="Charging Extreme Lower Bound" />
                    <Column field="chargingExtreme.upperBound" header="Charging Extreme Upper Bound" />
                </DataTable>

                <h5>Encountered Negative Events</h5>
                <div v-if="encounteredNegativeEvents">
                    <span>{{ encounteredNegativeEvents }} events</span>
                </div>

                <h5>Battery Category</h5>
                <div v-if="batteryCategory">
                    <span>Category: {{ batteryCategory }}</span>
                </div>

                <h5>Carbon Footprint Study Link</h5>
                <div v-if="carbonFootprintStudyLink">
                    <a :href="carbonFootprintStudyLink" target="_blank">{{ carbonFootprintStudyLink }}</a>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
    .card {
        margin-bottom: 2rem;
    }
</style>
