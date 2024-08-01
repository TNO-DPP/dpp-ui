<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const menu = ref();
    const items = ref([
        {
            label: 'Users',
            items: [
                {
                    name: 'Alice',
                    icon: 'pi pi-user',
                    role: 'Admin'
                },
                {
                    name: 'Bob',
                    icon: 'pi pi-user',
                    role: 'Viewer'
                },
                {
                    name: 'Liam',
                    icon: 'pi pi-user',
                    role: 'Editor'
                }
            ]
        },
        {
            separator: true
        },
        {
            label: 'Profile',
            items: [
                {
                    name: 'Settings',
                    icon: 'pi pi-cog',
                    command: () => {
                        router.push('/profile');
                    }
                },
                {
                    name: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        router.push('/');
                    }
                }
            ]
        }
    ]);

    const toggle = (event) => {
        menu.value.toggle(event);
    };

    const selectedItem = ref(null);
    const handleMenuItemClick = (item) => {
        if (item.role) {
            selectedItem.value = item;
        }
    };
</script>

<template>
    <div class="flex justify-content-center">
        <button @click="toggle" aria-haspopup="true" aria-controls="dropdown-menu" class="p-link layout-topbar-button">
            <i class="pi pi-user"></i>
            <span class="inline-flex flex-column pl-3 pt-2">
                <span v-if="selectedItem" class="font-bold">{{ selectedItem.name }}</span>
                <span v-else class="font-bold">{{ items[0].items[0].name }}</span>
                <span v-if="selectedItem" class="text-sm">{{ selectedItem.role }}</span>
                <span v-else class="text-sm">{{ items[0].items[0].role }}</span>
            </span>
        </button>
        <Menu ref="menu" id="dropdown-menu" :model="items" :popup="true">
            <template #submenuheader="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <a v-ripple :key="item.id" @click="handleMenuItemClick(item)" v-bind="props.action">
                    <i :class="item.icon"></i>
                    <span class="ml-2">{{ item.name }}</span>
                    <span v-if="item.role" class="ml-2">({{ item.role }})</span>
                </a>
            </template>
        </Menu>
    </div>
</template>

<style scoped></style>
