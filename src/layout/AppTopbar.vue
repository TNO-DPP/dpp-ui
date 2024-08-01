<script setup lang="ts">
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
    import { useLayout } from '@/layout/composables/layout';
    import { useRouter } from 'vue-router';
    import ProfileButton from '../components/ProfileButton.vue';

    const { onMenuToggle } = useLayout();

    const outsideClickListener = ref(null);
    const topbarMenuActive = ref(false);
    const router = useRouter();

    onMounted(() => {
        bindOutsideClickListener();
    });

    onBeforeUnmount(() => {
        unbindOutsideClickListener();
    });

    const onTopBarMenuButton = () => {
        topbarMenuActive.value = !topbarMenuActive.value;
    };
    const onSettingsClick = () => {
        topbarMenuActive.value = false;
        router.push('/config');
    };

    // const onVisualiseRandomClick = () => {
    //     topbarMenuActive.value = false;
    //     router.push({ path: '/passportControl/visualiseRandom' });
    // };

    const topbarMenuClasses = computed(() => {
        return {
            'layout-topbar-menu-mobile-active': topbarMenuActive.value
        };
    });

    const bindOutsideClickListener = () => {
        if (!outsideClickListener.value) {
            outsideClickListener.value = (event) => {
                if (isOutsideClicked(event)) {
                    topbarMenuActive.value = false;
                }
            };
            document.addEventListener('click', outsideClickListener.value);
        }
    };
    const unbindOutsideClickListener = () => {
        if (outsideClickListener.value) {
            document.removeEventListener('click', outsideClickListener);
            outsideClickListener.value = null;
        }
    };
    const isOutsideClicked = (event) => {
        if (!topbarMenuActive.value) return;

        const sidebarEl = document.querySelector('.layout-topbar-menu');
        const topbarEl = document.querySelector('.layout-topbar-menu-button');

        return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
    };
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img src="../assets/project-logo.svg" alt="logo" class="logo" />
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <h1 class="layout-topbar-title">DPP Dashboard</h1>
        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <!-- <button @click="onVisualiseRandomClick()" class="p-link layout-topbar-button">
                <i class="pi pi-chart-pie"></i>
                <span class="hide-span">Dashboard</span>
            </button> -->
            <button @click="onSettingsClick()" class="p-link layout-topbar-button pr-4">
                <i class="pi pi-cog"></i>
                <span class="hide-span">Settings</span>
            </button>
            <ProfileButton></ProfileButton>
        </div>
    </div>
</template>

<!-- <style lang="scss" scoped>
    .logo {
        height: 5dvh;
    }

    @media (min-width: 992px) {
        .hide-span {
            font-size: 1rem !important;
            display: none !important;
        }
    }
</style> -->

<style lang="scss" scoped>
    .logo {
        height: 5dvh;
    }

    .layout-topbar-title {
        margin: 0 1rem;
        font-size: 1.5rem;
        line-height: 5dvh;
        text-align: center;
        // color: #fff; /* Change this to match your design */
        flex-grow: 1;
    }

    @media (min-width: 992px) {
        .hide-span {
            font-size: 1rem !important;
            display: none !important;
        }
    }

    .layout-topbar {
        display: flex;
        align-items: center;
    }

    .layout-topbar-menu {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
</style>
