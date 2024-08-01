<script setup lang="ts">
    import { onMounted, toRefs, ref, watch } from 'vue';

    const props = defineProps({
        attributeData: Object
    });
    const attributeData = toRefs(props);
    const localAttributeData = ref();
    // Watch for the prop changes and set up local data
    watch(attributeData.attributeData, (newVal) => {
        localAttributeData.value = newVal;
    });

    onMounted(() => {
        console.log('Attribute Data in template Component (mounted):', props.attributeData);
    });
</script>

<template>
    <div>
        <pre>{{ localAttributeData }}</pre>
    </div>
</template>
