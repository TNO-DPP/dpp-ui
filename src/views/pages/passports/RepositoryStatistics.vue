<!-- <template>
    <div className="card">
        <h5>Empty Page</h5>
        <p>Use this page to start from scratch and place your custom content.</p>
        <p>Passport control -> Aggregate statistics</p>
    </div>
</template> -->
<script setup lang="ts">
    import { useDppStore } from '@/store/dpp';
    // import { Colors } from 'chart.js';
    // import Chart from 'primevue/chart';
    // Chart.register(Colors);
    import { onMounted, ref } from 'vue';
    import Card from 'primevue/card';
    const store = useDppStore();

    const passportsByBatchChartData = ref();
    const passportsByBatchTableData = ref();
    const passportsByTagChartData = ref();
    const passportsByTypeChartData = ref();
    const eventsByTypeChartData = ref();
    const eventsByTypeTableData = ref();
    const passportsCreatedAllTime = ref();
    const passportsCreatedLast5Years = ref();
    const passportsCreatedLastYear = ref();
    const passportsCreatedLastMonth = ref();
    const eventsAllTime = ref();
    const passportData = ref();
    const eventData = ref();
    const metadata = ref();

    onMounted(async () => {
        metadata.value = await store.getMetadata();
        console.log(metadata.value);
        let localMetadata = metadata.value;
        console.log('metadata value loaded');
        console.log(localMetadata);
        passportData.value = localMetadata.passport;
        eventData.value = localMetadata.event;
        passportsByBatchTableData.value = Object.entries(localMetadata.passport.passports_by_batch)
            .map(([key, value]) => ({
                type: key,
                count: value
            }))
            .sort((a, b) => b.count - a.count); // Descending order;

        // Function to generate random pastel colors
        const generatePastelColor = () => {
            const r = Math.floor(Math.random() * 127 + 127);
            const g = Math.floor(Math.random() * 127 + 127);
            const b = Math.floor(Math.random() * 127 + 127);
            return `rgb(${r}, ${g}, ${b})`;
        };

        // Function to generate an array of pastel colors based on the length of the data
        const generatePastelColorsArray = (length) => {
            return Array.from({ length }, generatePastelColor);
        };
        passportsByBatchChartData.value = {
            labels: Object.keys(localMetadata.passport.passports_by_batch),
            datasets: [
                {
                    label: 'Number of Passports',
                    data: Object.values(localMetadata.passport.passports_by_batch),
                    backgroundColor: '#42A5F5'
                }
            ]
        };

        passportsByTagChartData.value = {
            labels: Object.keys(localMetadata.passport.passports_by_tag),
            datasets: [
                {
                    data: Object.values(localMetadata.passport.passports_by_tag),
                    backgroundColor: generatePastelColorsArray(Object.keys(localMetadata.passport.passports_by_tag).length)
                    // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039', '#900C3F', '#581845']
                }
            ]
        };

        passportsByTypeChartData.value = {
            labels: Object.keys(localMetadata.passport.passports_by_type),
            datasets: [
                {
                    data: Object.values(localMetadata.passport.passports_by_type),
                    backgroundColor: generatePastelColorsArray(Object.keys(localMetadata.passport.passports_by_type).length)
                    // backgroundColor: '#FFC107'
                }
            ]
        };

        eventsByTypeChartData.value = {
            labels: Object.keys(localMetadata.event.number_event_types),
            datasets: [
                {
                    label: 'Number of Events',
                    data: Object.values(localMetadata.event.number_event_types),
                    backgroundColor: '#66BB6A'
                }
            ]
        };
        eventsByTypeTableData.value = Object.entries(localMetadata.event.number_event_types)
            .map(([key, value]) => ({
                type: key,
                count: value
            }))
            .sort((a, b) => b.count - a.count); // Descending order;

        passportsCreatedAllTime.value = localMetadata.passport.passports_created_all_time;
        passportsCreatedLast5Years.value = localMetadata.passport.passports_created_last_5_years;
        passportsCreatedLastYear.value = localMetadata.passport.passports_created_last_year;
        passportsCreatedLastMonth.value = localMetadata.passport.passports_created_last_month;

        eventsAllTime.value = localMetadata.event.events_all_time;
        console.log(eventsByTypeChartData.value);
        console.log('Found all data');
    });
</script>

<template>
    <div class="dashboard">
        <Card title="Summary Dashboard">
            <template #content>
                <h3>Summary Dashboard</h3>
                <Message severity="warn" :closable="false">Work in progress! This page is not yet complete.</Message>
                <Card>
                    <template #content>
                        <h4>Passport statistics</h4>
                        <div class="grid">
                            <div class="col-12 lg:col-6 xl:col-3">
                                <div class="card mb-0">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-500 font-medium mb-3">Passports created (all time)</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                                            <div class="text-900 font-medium text-xl">{{ passportsCreatedAllTime }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 lg:col-6 xl:col-3">
                                <div class="card mb-0">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-500 font-medium mb-3">Passports created (last month)</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                                            <div class="text-900 font-medium text-xl">{{ passportsCreatedLastMonth }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 lg:col-6 xl:col-3">
                                <div class="card mb-0">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-500 font-medium mb-3">Passports created (last year)</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                                            <div class="text-900 font-medium text-xl">{{ passportsCreatedLastYear }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 lg:col-6 xl:col-3">
                                <div class="card mb-0">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-500 font-medium mb-3">Passports created (last 5 years)</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                                            <div class="text-900 font-medium text-xl">{{ passportsCreatedLast5Years }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5>Number of passports in known batches</h5>
                        <div>
                            <DataTable :value="passportsByBatchTableData" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" :size="small" tableStyle="min-width: 50rem">
                                <Column field="type" header="Batch identifier"></Column>
                                <Column field="count" header="Passport count"></Column>
                            </DataTable>
                        </div>
                        <div class="grid">
                            <div class="col-12 lg:col-6 xl:col-6">
                                <div class="card">
                                    <h5>Number of passports per tag</h5>
                                    <Chart
                                        v-if="passportsByTagChartData"
                                        type="pie"
                                        :data="passportsByTagChartData"
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
                                    <h5>Number of passports per type</h5>
                                    <Chart
                                        v-if="passportsByTypeChartData"
                                        type="doughnut"
                                        :data="passportsByTypeChartData"
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
                <Card>
                    <template #content>
                        <h4>Event statistics</h4>
                        <div class="grid">
                            <div class="col-12 lg:col-6 xl:col-3">
                                <div class="card mb-0">
                                    <div class="flex justify-content-between mb-3">
                                        <div>
                                            <span class="block text-500 font-medium mb-3">Events created (all time)</span>
                                        </div>
                                        <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                                            <div class="text-900 font-medium text-xl">{{ eventsAllTime }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <DataTable :value="eventsByTypeTableData" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]" :size="small" tableStyle="min-width: 50rem">
                                <Column field="type" header="Event type"></Column>
                                <Column field="count" header="Count"></Column>
                            </DataTable>
                        </div>
                    </template>
                </Card>
            </template>
        </Card>
    </div>
</template>

<style scoped>
    .p-grid {
        margin-bottom: 1em;
    }
    .p-card {
        margin-bottom: 1em;
    }
    /* .dashboard {\
        padding: 1rem;
    } */

    .grid-container {
        display: grid;
        gap: 1rem;
        /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    }

    .grid-item {
        /* background: var(--surface-card);
        color: var(--text-color); */
        padding: 1rem;
        border-radius: 8px;
        /* box-shadow: var(--box-shadow); */
    }

    .grid-item-wide {
        /* grid-column: span 2; */
        /* background: var(--surface-card);
        color: var(--text-color); */
        padding: 1rem;
        border-radius: 8px;
    }
</style>
