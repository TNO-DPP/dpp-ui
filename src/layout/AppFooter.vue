<script setup lang="ts"></script>

<template>
    <div class="layout-footer">
        <span class="font-medium ml-2"
            >Digital Product Passport by
            <a href="https://www.tno.nl/en" target="_blank" rel="noopener noreferrer">TNO</a>
        </span>
        <span class="ml-auto">&copy; {{ new Date().getFullYear() }} TNO. All rights reserved.</span>
    </div>
</template>

<style lang="scss" scoped>
    .layout-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        // background-color: #f8f9fa;
        border-top: 1px solid #dee2e6;
        font-size: 0.875rem;
        color: #6c757d;
    }

    .font-medium {
        font-weight: 500;
    }

    .ml-2 {
        margin-left: 0.5rem;
    }

    .ml-auto {
        margin-left: auto;
    }
</style>
