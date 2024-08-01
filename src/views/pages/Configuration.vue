<script setup lang="ts">
    import { usePrimeVue } from 'primevue/config';
    import { useLayout } from '@/layout/composables/layout';

    defineProps({
        simple: {
            type: Boolean,
            default: false
        }
    });

    const $primevue = usePrimeVue();

    const { layoutConfig } = useLayout();

    const onChangeTheme = (theme, mode) => {
        $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
            layoutConfig.theme.value = theme;
            layoutConfig.darkTheme.value = mode;
        });
    };

    const onDarkModeChange = (value) => {
        const newThemeName = value ? layoutConfig.theme.value.replace('light', 'dark') : layoutConfig.theme.value.replace('dark', 'light');

        layoutConfig.darkTheme.value = value;
        onChangeTheme(newThemeName, value);
    };
</script>

<template>
    <div class="main-div">
        <h1>Settings</h1>
        <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
            <span :class="['text-xl font-semibold']">Dark Mode</span>
            <InputSwitch :modelValue="layoutConfig.darkTheme.value" @update:modelValue="onDarkModeChange" />
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .main-div {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
</style>
