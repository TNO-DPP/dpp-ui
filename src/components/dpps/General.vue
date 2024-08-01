<script setup lang="ts">
    import Card from 'primevue/card';
    import { ref, toRefs, watch } from 'vue';
    import { onMounted } from 'vue';
    // import { Panel } from 'primevue/panel';

    const props = defineProps({
        generalData: Object
    });

    const localGeneralData = ref();
    const instantiatedFrom = ref(null);
    const currentOwner = ref(null);
    const manufacturer = ref(null);
    const knownPastOwners = ref(null);
    const economicOperator = ref(null);
    const tags = ref([]);

    const generalData = toRefs(props);
    watch(generalData.generalData, (newVal) => {
        console.log('General Data Loaded:', newVal);
        localGeneralData.value = newVal;
        manufacturer.value = localGeneralData.value?.manufacturer;
        instantiatedFrom.value = localGeneralData.value?.instantiated_from;
        currentOwner.value = localGeneralData.value?.current_owner;
        knownPastOwners.value = localGeneralData.value?.known_past_owners;
        economicOperator.value = localGeneralData.value?.economic_operator;
        tags.value = localGeneralData.value?.tags;
    });

    // const manufacturer = computed(() => localGeneralData.value?.manufacturer || {});
    // // const instantiatedFrom = computed(() => localGeneralData.value?.instantiated_from || {});

    // const currentOwner = computed(() => localGeneralData.value?.current_owner || {});
    // const knownPastOwners = computed(() => localGeneralData.value?.known_past_owners || []);
    // const economicOperator = computed(() => localGeneralData.value?.economic_operator || []);
    // const tags = computed(() => localGeneralData.value?.tags || []);

    onMounted(() => {
        console.log('General Data in Component (mounted):', props.generalData);
    });
</script>

<template>
    <div v-if="localGeneralData">
        <Card>
            <template #content>
                <!-- <div class="col-12 md:col-12"> -->
                <h4>{{ localGeneralData.title }}</h4>

                <h5>Product Information</h5>
                <p><strong>ID: </strong> {{ localGeneralData.id }}</p>
                <p><strong>Registration ID: </strong> {{ localGeneralData.registration_id }}</p>
                <p><strong>Creation Timestamp: </strong> {{ new Date(localGeneralData.creation_timestamp).toLocaleString() }}</p>
                <div>
                    <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
            </template>

            <Fieldset v-if="instantiatedFrom" legend="Template Information" toggleable collapsed>
                <Card>
                    <template #content>
                        <h5>Template Information</h5>
                        <p><strong>Template ID:</strong> {{ instantiatedFrom.template_id }}</p>
                        <p><strong>Version:</strong> {{ instantiatedFrom.version }}</p>
                    </template>
                </Card>
            </Fieldset>
        </Card>
    </div>
    <div v-if="currentOwner">
        <Card>
            <template #content>
                <h5>Current Owner</h5>
                <div>
                    <p><strong>Name:</strong> {{ currentOwner.name }}</p>
                    <p><strong>Full Name:</strong> {{ currentOwner.full_name }}</p>
                    <p><strong>Facility:</strong> {{ currentOwner.facility.map((f) => f.name).join(', ') }}</p>
                    <p><strong>Batch ID:</strong> {{ currentOwner.batch_id || 'unknown' }}</p>
                </div>
            </template>
        </Card>
    </div>
    <div v-if="manufacturer">
        <Card>
            <template #content>
                <h5>Manufacturer Information</h5>
                <div>
                    <p><strong>Name:</strong> {{ manufacturer.name }}</p>
                    <p><strong>Full Name:</strong> {{ manufacturer.full_name }}</p>
                    <p><strong>Facility:</strong> {{ manufacturer.facility.map((f) => f.name).join(', ') }}</p>
                    <p><strong>Batch ID:</strong> {{ manufacturer.batch_id }}</p>
                </div>
            </template>
        </Card>
    </div>
    <div v-if="economicOperator">
        <Card>
            <template #content>
                <h5>Known economic operators</h5>
                <div class="p-grid">
                    <div class="p-col-12 lg:p-col-6" v-for="operator in economicOperator" :key="operator.id">
                        <Card>
                            <template #content>
                                <div>
                                    <p><strong>ID: </strong> {{ operator.id }}</p>
                                    <p><strong>Name: </strong> {{ operator.name }}</p>
                                    <p><strong>Full Name: </strong> {{ operator.full_name }}</p>
                                    <p><strong>Repository Address:</strong> {{ operator.repository_address.map((ra) => ra.hostname).join(', ') }}</p>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </template>
        </Card>
    </div>
    <div v-if="knownPastOwners">
        <Card>
            <template #content>
                <h5>Known past owners</h5>
                <div class="p-grid">
                    <div class="p-col-12 lg:p-col-6" v-for="owner in knownPastOwners" :key="owner.id">
                        <Card>
                            <template #content>
                                <div>
                                    <p><strong>ID: </strong> {{ owner.id }}</p>
                                    <p><strong>Name: </strong> {{ owner.name }}</p>
                                    <p><strong>Full Name: </strong> {{ owner.full_name }}</p>
                                    <p><strong>Facility:</strong> {{ owner.facility.map((f) => f.name).join(', ') }}</p>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
    .tag {
        display: inline-block;
        background: #e0e0e0;
        color: #333;
        padding: 0.25em 0.5em;
        margin: 0.25em;
        border-radius: 4px;
    }
    .p-grid {
        margin-bottom: 1em;
    }
    .p-card {
        margin-bottom: 1em;
    }
</style>
<!-- <ScrollPanel style="height: 200px">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
    </p>
    <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia
        deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
    </p>
    <p class="m-0">
        Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non
        recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
    </p>
</ScrollPanel> -->
