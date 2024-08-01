import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'Home',
                    component: () => import('@/views/pages/Home.vue')
                },
                {
                    path: '/about',
                    name: 'About',
                    component: () => import('@/views/pages/AboutTNO.vue')
                },
                {
                    path: '/technical-intro',
                    name: 'Technical Introduction',
                    component: () => import('@/views/pages/TechnicalIntro.vue')
                },
                {
                    path: '/config',
                    name: 'Configuration',
                    component: () => import('@/views/pages/Configuration.vue')
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () => import('@/views/pages/Profile.vue')
                },
                {
                    path: '/dpps/statistics',
                    name: 'DPP Statistics',
                    component: () => import('@/views/pages/passports/RepositoryStatistics.vue')
                },
                {
                    path: '/dpps/list',
                    name: 'List DPPs by category',
                    component: () => import('@/views/pages/passports/DPPList.vue')
                },
                {
                    path: '/dpps/visualize',
                    name: 'Visualize a specific DPP',
                    component: () => import('@/views/pages/passports/DPPVisualization.vue')
                },
                {
                    path: '/dpps/visualize/:uuid?',
                    name: 'Visualize a specific DPP with UUID',
                    component: () => import('@/views/pages/passports/DPPVisualization.vue')
                },
                {
                    path: '/dpps/update',
                    name: 'Update a specific DPP',
                    component: () => import('@/views/pages/passports/DPPUpdate.vue')
                },
                {
                    path: '/dpps/update/:uuid?',
                    name: 'Update a specific DPP with UUID',
                    component: () => import('@/views/pages/passports/DPPUpdate.vue')
                },
                {
                    path: '/dpps/create',
                    name: 'Create a DPP',
                    component: () => import('@/views/pages/passports/DPPCreate.vue')
                },

                // {
                //     path: '/passportControl/uuidView',
                //     name: 'UUID View',
                //     component: () => import('@/views/pages/passportControl/uuidView.vue')
                // },
                // {
                //     path: '/passportControl/visualiseRandom',
                //     name: 'Visualise Random',
                //     component: () => import('@/views/pages/passportControl/visualiseRandom.vue')
                // },
                {
                    path: '/templates/list',
                    name: 'List DPP templates by category',
                    component: () => import('@/views/pages/templates/TemplateList.vue')
                },
                {
                    path: '/templates/statistics',
                    name: 'DPP Template Statistics',
                    component: () => import('@/views/pages/templates/TemplateStatistics.vue')
                },
                // {
                //     path: '/eventControl/eventLifecycleList',
                //     name: 'Event Lifecycle List',
                //     component: () => import('@/views/pages/eventControl/eventLifecycleList.vue')
                // },
                // {
                //     path: '/eventControl/addEventType',
                //     name: 'Add Event Type',
                //     component: () => import('@/views/pages/eventControl/addEventType.vue')
                // },
                {
                    path: '/credentials/list',
                    name: 'List available credentials from known wallets',
                    component: () => import('@/views/pages/credentials/CredentialList.vue')
                }
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
