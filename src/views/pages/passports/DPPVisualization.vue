<script setup lang="ts">
    // import Card from 'primevue/card';
    import Timeline from '@/components/dpps/Timeline.vue';
    import TShirt from '@/components/dpps/attributeVisualizations/TShirt.vue';
    import OscillatorModule from '@/components/dpps/attributeVisualizations/OscillatorModule.vue';
    // import Battery from '@/components/dpps/attributeVisualizations/Battery.vue';
    // import LifecycleAssessment from '@/components/dpps/LifecycleAssessment.vue';
    // import MaterialComposition from '@/components/dpps/MaterialComposition.vue';
    import AttachmentsTable from '@/components/dpps/AttachmentsTable.vue';
    import General from '@/components/dpps/General.vue';
    import { useDppStore } from '@/store/dpp';
    // import dppData from '@/models/templates.json';
    import { useToast } from 'primevue/usetoast';
    const toast = useToast();
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    // import CredentialsTable from '@/components/dpps/CredentialsTable.vue';

    const uuidValue = ref(null);
    const store = useDppStore();
    const loading = ref(false);
    const jsonDisplayData = ref();
    const attributeDisplayData = ref();
    const route = useRoute();
    const router = useRouter();
    // const uuid = ref();
    const treeTableDataList = ref();

    const timelineData = ref();
    const attachmentData = ref();
    const generalData = ref();
    const credentialData = ref();

    const isHierarchyPanelVisible = ref(true);
    const isVisualizationPanelVisible = ref(true);

    const selectedDppType = ref();
    const clickedTableItem = ref();
    const activeTabIndex = ref(0);

    const inputPlaceholder = ref('Enter Product UUID');
    const selectedPassportType = ref([]);
    const selectedTags = ref([]);
    const selectedBatchIds = ref([]);
    const registrationId = ref('');
    const currentCountryCodes = ref([]);
    const originCountryCodes = ref([]);

    const passportTypes = ref([]);
    const tags = ref([]);
    const batches = ref([]);
    const countryCodes = ref([]);

    const filteredSuggestions = ref([]);

    onMounted(() => {
        getUrlQueryParams().then(() => {
            // Code for visible panels, based on what is available.
            isHierarchyPanelVisible.value = false;
            isVisualizationPanelVisible.value = false;
        });
    });

    const getUrlQueryParams = async () => {
        //router is async so we wait for it to be ready
        await router.isReady();
        //once its ready we can access the query params
        uuidValue.value = route.params['uuid'];
        console.log('Got a uuid from URL');
        console.log(uuidValue.value);
        if (!(uuidValue.value === undefined || uuidValue.value === '')) {
            confirmDpp();
        }
        // router.replace({ path: '/dpps/visualize' });
    };

    const randomDpp = async () => {
        console.log('Clicked random dpp');
        let id = await store.getRandomDpp();
        console.log('Received id -> ' + id);
        clearUuid();
        uuidValue.value = id;
    };

    const latestDpp = async () => {
        console.log('Clicked latest dpp');
        let id = await store.getLatestDpp();
        console.log('Received id -> ' + id);
        clearUuid();
        uuidValue.value = id;
    };
    const searchUUID = async (event) => {
        console.log('Typed something inside event');
        // items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
        console.log(event.query);
        const filterConditions = {
            name_contains: uuidValue.value,
            passport_type: selectedPassportType.value.map((item) => item.label),
            tags: selectedTags.value.map((item) => item.label),
            batch_id: selectedBatchIds.value.map((item) => item.label),
            registration_id: registrationId.value,
            current_country_code: currentCountryCodes.value.map((item) => item.label),
            origin_country_code: originCountryCodes.value.map((item) => item.label)
        };
        try {
            let responseData = await store.searchBackend(filterConditions);
            // filteredSuggestions.value = responseData.map((item) => item.label);
            filteredSuggestions.value = responseData;
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    const confirmDpp = async () => {
        console.log('Clicked confirm dpp');
        // console.log(`Value ${uuidValue.value}`);

        if (uuidValue.value == undefined || uuidValue.value == '') {
            router.replace({ path: '/dpps/visualize' });
            toast.add({ severity: 'error', summary: 'UUID not valid or empty', detail: 'Message Content', life: 3150 });
        } else {
            let valueToCheck = uuidValue.value;
            // Check if valueToCheck is an object
            if (typeof valueToCheck === 'object' && valueToCheck !== null) {
                // Access the value property of the object
                valueToCheck = valueToCheck.value;
            }
            loading.value = true;
            try {
                var treeTableData = await recursivelyCreateTreeTableData(valueToCheck, '0');

                isHierarchyPanelVisible.value = true;
                treeTableDataList.value = treeTableData;
            } catch {
                toast.add({ severity: 'error', summary: 'Try again with valid UUID.', detail: 'Message Content', life: 3150 });
            }
            loading.value = false;
        }
    };
    const recursivelyCreateTreeTableData = async (dppUUID, prefix) => {
        let output = [];

        // Fetch data using axios
        try {
            var test = await store.getCompactDpp(dppUUID);
        } catch (error) {
            console.log('Testing');
            console.log(test);
            toast.add({ severity: 'error', summary: 'DPP with UUID not valid or not found at server', detail: 'Message Content', life: 3150 });
            throw error;
        }
        // var key = Object.keys(test)[0];
        // var node = test[key];
        var node = test;

        // Define the current node with the required columns
        let customNode = {
            key: prefix,
            data: {
                Type: node.title || null,
                Manufacturer: node.manufacturer?.name || null,
                ID: node.id || node['@id'],
                Owner: node.current_owner?.name || null
            },
            children: []
        };

        // Handle subpassports recursively
        if (node.subpassports && node.subpassports.length > 0) {
            customNode.children = await Promise.all(
                node.subpassports.map(async (childNodeUUID, index) => {
                    let current_prefix = `${prefix}-${index}`;
                    let childNodes = await recursivelyCreateTreeTableData(childNodeUUID, current_prefix);

                    return childNodes[0];
                })
            );
        }

        output.push(customNode);
        return output;
    };

    const fetchMetadata = async () => {
        let metadata;
        try {
            metadata = await store.getMetadata();
        } catch {
            toast.add({ severity: 'error', summary: 'Backend not available!', detail: 'Message Content', life: 3150 });
            metadata = {};
        }
        passportTypes.value = Object.keys(metadata?.passport.passports_by_type).map((type) => ({ label: type, value: type }));
        tags.value = Object.keys(metadata?.passport.passports_by_tag).map((tag) => ({ label: tag, value: tag }));
        batches.value = Object.keys(metadata?.passport.passports_by_batch).map((batch) => ({ label: batch, value: batch }));
        // Populate country codes with standard values
        countryCodes.value = [
            { label: 'US', value: 'US' },
            { label: 'CA', value: 'CA' },
            { label: 'MX', value: 'MX' },
            { label: 'DE', value: 'DE' },
            { label: 'NL', value: 'NL' }
            // Add more country codes here
        ];
    };

    fetchMetadata();

    const clearUuid = () => {
        uuidValue.value = '';
        clickedTableItem.value = undefined;
        isHierarchyPanelVisible.value = false;
        isVisualizationPanelVisible.value = false;
    };
    const onClickId = async (item) => {
        if (clickedTableItem.value != undefined && clickedTableItem.value == item) {
            console.log('Same item was clicked on as before.');
            clickedTableItem.value = undefined;
        } else {
            console.log('Either nothing was selected at this point, or previously');
            console.log('or a different item was clicked on this time.');
            console.log('Clearing values to prevent Attributes section from loading too quickly');
            jsonDisplayData.value = undefined;
            attributeDisplayData.value = undefined;
            generalData.value = undefined;
            credentialData.value = undefined;

            clickedTableItem.value = item;
            let data = await store.getFullDpp(item.data.ID);
            selectedDppType.value = data.type || data['@type'];
            console.log(selectedDppType.value);
            let attributeData = await store.getDppAttributes(item.data.ID);
            let genData = await store.getDppGeneralData(item.data.ID);
            let credData = await store.getDppCredentials(item.data.ID);

            jsonDisplayData.value = data;
            attributeDisplayData.value = attributeData;
            generalData.value = genData;
            credentialData.value = credData;
            console.log(jsonDisplayData.value);
            console.log(attributeDisplayData.value);
            console.log(generalData.value);
            console.log(credentialData.value);

            // Pass through the json data to the timeline component
            // itemIDforTimeline.value = item.data.ID;
            timelineData.value = data;

            // fill attachmentData reference
            attachmentData.value = data.attachments;
        }
        // } else {
        //     isVisualizationPanelVisible.value = false;
        // }
    };

    const onTabChange = (e) => {
        activeTabIndex.value = e.index;
    };
</script>

<template>
    <Toast />
    <Card>
        <template #content>
            <h3>Visualize Digital Product Passports</h3>
            <Message severity="warn" :closable="false">Work in progress! This page is not yet complete.</Message>
            <div id="id-panel" class="pb-3">
                <Panel>
                    <div class="p-fluid grid">
                        <div class="field col-12 md:col-9">
                            <label for="productUuid">Product UUID</label>
                            <InputGroup>
                                <AutoComplete id="productUuid" v-model="uuidValue" :suggestions="filteredSuggestions" @complete="searchUUID" field="label" :placeholder="inputPlaceholder" aria-describedby="productUuid-help" />
                                <Button icon="pi pi-search" @click="confirmDpp" />
                                <Button icon="pi pi-times" class="p-button-danger" @click="clearUuid" />
                            </InputGroup>
                        </div>
                        <div class="field col-12 md:col-3 flex align-items-end">
                            <Button title="Fetch random!" label="Random" @click="randomDpp" />
                            <Button title="Fetch last published" label="Last created" @click="latestDpp" />
                        </div>
                    </div>
                    <small id="starting-text"><p>Start typing to immediately get recommendations for DPP IDs known in the database. Use the filters to get filtered suggestions!</p></small>
                    <Fieldset legend="Additional Filters" toggleable collapsed>
                        <div class="p-fluid grid">
                            <div class="field col-12 md:col-4">
                                <label for="passportType">Passport Type</label>
                                <MultiSelect id="passportType" v-model="selectedPassportType" :options="passportTypes" optionLabel="label" placeholder="Select Passport Type" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="tags">Tags</label>
                                <MultiSelect id="tags" v-model="selectedTags" :options="tags" optionLabel="label" placeholder="Select Tags" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="batchId">Batch ID</label>
                                <MultiSelect id="batchId" v-model="selectedBatchIds" :options="batches" optionLabel="label" placeholder="Select Batch IDs" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="registrationId">Registration ID</label>
                                <InputText id="registrationId" v-model="registrationId" placeholder="Enter Registration ID" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="currentCountryCode">Current Country Code</label>
                                <MultiSelect id="currentCountryCode" v-model="currentCountryCodes" :options="countryCodes" optionLabel="label" placeholder="Select Country Codes" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="originCountryCode">Origin Country Code</label>
                                <MultiSelect id="originCountryCode" v-model="originCountryCodes" :options="countryCodes" optionLabel="label" placeholder="Select Country Codes" />
                            </div>
                        </div>
                    </Fieldset>
                </Panel>
            </div>
            <!--
                <small id="productUuid-help"
                ><p>Enter product UUID.</p>
                <p>&lt;urn:manufacturer:TNO:<i>unique-identifier</i>&gt; is automatically appended for the purposes of this demo.</p></small
            >
            -->
            <div class="pb-3" v-if="isHierarchyPanelVisible">
                <Panel header="Product Hierarchy" toggleable>
                    <TreeTable :value="treeTableDataList" :loading="loading" :resizableColumns="true" dataKey="key">
                        <Column field="Type" header="Type" :expander="true">
                            <template #body="slotProps">
                                <span class="pointer" @click="onClickId(slotProps.node)">
                                    <template v-if="slotProps.node?.data?.Type">{{ slotProps.node.data.Type }}</template>
                                    <template v-else
                                        ><span class="unknownNode"><em>unknown</em></span></template
                                    >
                                </span>
                            </template>
                        </Column>
                        <Column field="Manufacturer" header="Manufacturer">
                            <template #body="slotProps">
                                <template v-if="slotProps.node?.data?.Manufacturer">{{ slotProps.node.data.Manufacturer }}</template>
                                <template v-else
                                    ><span class="unknownNode"><em>unknown</em></span></template
                                >
                            </template>
                        </Column>
                        <Column field="ID" header="ID">
                            <template #body="slotProps">
                                {{ slotProps.node?.data?.ID }}
                            </template>
                        </Column>
                        <Column field="Owner" header="Owner">
                            <template #body="slotProps">
                                <template v-if="slotProps.node?.data?.Owner">{{ slotProps.node.data.Owner }}</template>
                                <template v-else
                                    ><span class="unknownNode"><em>unknown</em></span></template
                                >
                            </template>
                        </Column>
                    </TreeTable>
                </Panel>
            </div>
            <div class="pb-3" v-if="clickedTableItem">
                <Panel header="Details" toggleable>
                    <!-- <ScrollPanel> -->
                    <TabView :activeIndex="activeTabIndex" @tab-change="onTabChange">
                        <!-- <TabView> -->
                        <TabPanel header="General">
                            <div>
                                <!-- <pre>{{ generalData }}</pre> -->
                                <General :generalData="generalData"></General>
                                <!-- <LifecycleAssessment></LifecycleAssessment> -->
                            </div>
                        </TabPanel>
                        <TabPanel header="Timeline">
                            <div>
                                <Timeline :timelineEvents="timelineData"></Timeline>
                            </div>
                        </TabPanel>
                        <TabPanel header="Attributes">
                            <div>
                                <template v-if="selectedDppType === 'TShirtProductPassport'">
                                    <TShirt :attributeData="attributeDisplayData"></TShirt>
                                </template>
                                <template v-else-if="selectedDppType === 'OscillatorModulePassport'">
                                    <OscillatorModule :attributeData="attributeDisplayData"></OscillatorModule>
                                </template>
                                <!-- <template v-else-if="selectedDppType === 'BatteryProductPassport'">
                                    <Battery :attributeData="attributeDisplayData"></Battery>
                                </template> -->
                                <template v-else>
                                    <pre>{{ attributeDisplayData }}</pre>
                                </template>
                            </div>
                        </TabPanel>
                        <!-- <TabPanel header="Credentials">
                            <CredentialsTable :attachmentEvents="credentialData"></CredentialsTable>
                        </TabPanel> -->
                        <TabPanel header="Attachments">
                            <AttachmentsTable :attachmentEvents="attachmentData"></AttachmentsTable>
                        </TabPanel>
                        <TabPanel header="Raw JSON">
                            <div>
                                <pre>{{ jsonDisplayData }}</pre>
                            </div>
                        </TabPanel>
                        <!-- <TabPanel header="Material Composition">
                            <div>
                                <MaterialComposition></MaterialComposition>
                            </div>
                        </TabPanel> -->
                    </TabView>
                    <!-- </ScrollPanel> -->
                </Panel>
            </div>
        </template>
    </Card>
</template>
<style lang="scss" scoped>
    .tab-panel {
        padding-left: 15px;
    }

    .button-style {
        padding-top: 0.5rem;
        padding-right: 0.5rem;
    }

    .container {
        flex-wrap: wrap;
    }

    pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        text-align: justify;
    }

    .pointer {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .flex {
            flex-direction: column;
            align-items: stretch;
        }

        .button-style {
            padding-top: 1rem;
            padding-right: 0;
            width: 100%;
        }

        #productUuid {
            width: 100% !important;
        }

        .InputGroup {
            width: 100%;
        }
    }
</style>
