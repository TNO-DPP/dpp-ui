<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    onMounted(() => {
        carbonData.value = setCarbonData();
        carbonOptions.value = setCarbonOptions();

        waterData.value = setWaterData();
        waterOptions.value = setWaterOptions();

        wasteData.value = setWasteData();
        wasteOptions.value = setWasteOptions();
    });

    const carbonData = ref();
    const carbonOptions = ref();

    const waterData = ref();
    const waterOptions = ref();

    const wasteData = ref();
    const wasteOptions = ref();

    const setCarbonOptions = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        return {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    };

    const setWaterOptions = () => {
        return {
            title: {
                display: true,
                text: 'Water Usage'
            }
        };
    };

    const setWasteOptions = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        return {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    };

    const setCarbonData = () => {
        return {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Carbon Emissions',
                    backgroundColor: '#007ad9',
                    data: [30, 35, 28, 32, 29]
                }
            ]
        };
    };

    const setWasteData = () => {
        const documentStyle = getComputedStyle(document.body);
        return {
            labels: ['Plastic', 'Paper', 'Glass', 'Metal'],
            datasets: [
                {
                    backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--gray-500'), documentStyle.getPropertyValue('--red-700')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400'), documentStyle.getPropertyValue('--red-600')],
                    data: [30, 20, 15, 35]
                }
            ]
        };
    };

    const setWaterData = () => {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Water Usage',
                    data: [100, 120, 110, 105, 115, 105, 105],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    tension: 0.4
                }
            ]
        };
    };
</script>

<template>
    <div class="graph-container">
        <div class="card">
            <h2>Carbon Emissions</h2>
            <Chart type="bar" :options="carbonOptions" :data="carbonData" />
        </div>

        <div class="card">
            <h2>Water Usage</h2>
            <Chart type="line" :data="waterData" :options="waterOptions" />
        </div>

        <div class="card">
            <h2>Waste Generation</h2>
            <Chart type="pie" :data="wasteData" :options="wasteOptions" class="w-full md:w-40rem" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .h2 {
        align-items: center;
    }
</style>
