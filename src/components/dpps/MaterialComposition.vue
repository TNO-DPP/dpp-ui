<script setup lang="ts">
    import { ref } from 'vue';

    const options = ref({
        title: {
            display: true,
            text: 'Material Composition'
        },
        legend: {
            position: 'bottom'
        }
    });

    const data = ref({
        labels: ['Cotton', 'Polyester', 'Nylon', 'Other'],
        datasets: [
            {
                data: [40, 30, 20, 10],
                backgroundColor: ['#007ad9', '#00a65a', '#f39c12', '#dd4b39']
            }
        ]
    });
</script>

<template>
    <div class="material-composition-chart">
        <h2>Material Composition Chart</h2>
        <Chart type="doughnut" :options="options" :data="data" />
    </div>
</template>

<style scoped>
    .material-composition-chart {
        text-align: center;
    }
</style>
