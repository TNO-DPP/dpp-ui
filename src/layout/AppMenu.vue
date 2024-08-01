<script setup lang="ts">
    import { ref } from 'vue';

    import AppMenuItem from './AppMenuItem.vue';

    const model = ref([
        {
            label: 'Home',
            items: [
                { label: 'Digital Product Passports', icon: 'pi pi-fw pi-book', to: '/' },
                { label: 'About TNO', icon: 'pi pi-fw pi-info-circle', to: '/about' },
                { label: 'Technical introduction', icon: 'pi pi-fw pi-desktop', to: '/technical-intro' }
            ]
        },
        {
            label: 'Passports',
            items: [
                { label: 'List Passports', icon: 'pi pi-fw pi-id-card', to: '/dpps/list' }, // ID card for representing a "passport".
                { label: 'Visualize', icon: 'pi pi-fw pi-eye', to: '/dpps/visualize' }, // Eye for visualizing.
                { label: 'Update', icon: 'pi pi-fw pi-file-edit', to: '/dpps/update' }, // Refresh for updating.
                { label: 'Create', icon: 'pi pi-fw pi-pencil', to: '/dpps/create' }, // Pencil for creating.
                { label: 'Repository Statistics', icon: 'pi pi-fw pi-chart-bar', to: '/dpps/statistics' } // Chart bar for statistics.
            ]
        },
        {
            label: 'Passport Templates',
            items: [
                { label: 'List Templates', icon: 'pi pi-fw pi-th-large', to: '/templates/list' },
                { label: 'Template Statistics', icon: 'pi pi-fw pi-chart-bar', to: '/templates/statistics' }
            ]
        },
        {
            label: 'Credentials',
            items: [{ label: 'List', icon: 'pi pi-fw pi-id-card', to: '/credentials/list' }]
        },
        {
            label: 'Configuration',
            items: [{ label: 'Edit', icon: 'pi pi-fw pi-cog', to: '/config' }]
        }
    ]);
    // const model = ref([
    //     {
    //         label: 'Home',
    //         items: [
    //             // Core introduction to Digital Product Passports
    //             { label: 'Digital Product Passports', icon: 'pi pi-fw pi-globe', to: '/' },
    //             // Configuration of metadata about the UI. Backend URL, dark-light mode, etc.
    //             { label: 'Configuration', icon: 'pi pi-fw pi-eye', to: '/config' }
    //         ]
    //     },
    //     {
    //         label: 'Passports',
    //         items: [
    //             // Some information about identifying some general information about Passports currently in the repository.
    //             { label: 'List Passports', icon: 'pi pi-fw pi-globe', to: '/dpps/list' },
    //             // Visualize DPP. Get an ID from a modal to a tangible DPP based on some filters.
    //             { label: 'Visualize', icon: 'pi pi-fw pi-globe', to: '/dpps/visualize' },
    //             { label: 'Update', icon: 'pi pi-fw pi-eye', to: '/dpps/update' },
    //             { label: 'Create', icon: 'pi pi-fw pi-eye', to: '/dpps/create' },
    //             { label: 'Repository Statistics', icon: 'pi pi-fw pi-eye', to: '/dpps/statistics' }
    //         ]
    //     },
    //     {
    //         label: 'Passport Templates',
    //         items: [
    //             { label: 'List Templates', icon: 'pi pi-fw pi-home', to: '/templates/list' },
    //             { label: 'Create Template', icon: 'pi pi-fw pi-home', to: '/templates/create' },
    //             { label: 'Template Statistics', icon: 'pi pi-fw pi-home', to: '/templates/statistics' }
    //         ]
    //     },
    //     {
    //         label: 'Credentials',
    //         items: [{ label: 'List', icon: 'pi pi-fw pi-prime', to: '/credentials/list' }]
    //     }
    // ]);
</script>

<!-- // {
    // { label: 'DPP View', icon: 'pi pi-fw pi-eye', to: '/passportControl/uuidView' },
    // { label: 'Visualise Random', icon: 'pi pi-fw pi-globe', to: '/passportControl/visualiseRandom' }
//     label: 'Event',
//     items: [
//         { label: 'Event Lifecycle List', icon: 'pi pi-fw pi-id-card', to: '/eventControl/eventLifecycleList' },
//         { label: 'Add Event Type', icon: 'pi pi-fw pi-check-square', to: '/eventControl/addEventType' }
//     ]
// }, -->
<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
