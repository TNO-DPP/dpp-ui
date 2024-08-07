<script setup lang="ts">
import { ref } from 'vue';
// import {onMounted} from 'vue';
import { useDppStore } from '@/store/dpp';
// import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import AddEvent from '../eventControl/AddEvent.vue';
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import type { PassportType } from '@/types/dpp';
const toast = useToast();
const uuidValue = ref<string | undefined>();
const store = useDppStore();

const inputPlaceholder = ref('Enter Product UUID');
const selectedPassportType = ref<PassportType[]>([]);
const selectedTags = ref<string[]>([]);
const selectedBatchIds = ref<string[]>([]);
const registrationId = ref('');
const currentCountryCodes = ref<string[]>([]);
const originCountryCodes = ref<string[]>([]);

const filteredSuggestions = ref([]);

const passportTypes = ref<PassportType[]>([]);
const tags = ref<string[]>([]);
const batches = ref<string[]>([]);
const countryCodes = ref<string[]>([]);

// const router = useRouter();
// const route = useRoute();

const selectedDpp = ref();

const searchUUID = async (event: AutoCompleteCompleteEvent) => {
    console.log({ event });
    console.log('Typed something inside event');
    // items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
    console.log(event.query);
    const filterConditions = {
        name_contains: uuidValue.value,
        passport_type: selectedPassportType.value.map((item) => item.label),
        tags: selectedTags,
        batch_id: selectedBatchIds,
        registration_id: registrationId.value,
        current_country_code: currentCountryCodes,
        origin_country_code: originCountryCodes
    };
    try {
        let responseData = await store.searchBackend(filterConditions);
        // filteredSuggestions.value = responseData.map((item) => item.label);
        filteredSuggestions.value = responseData;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
};

const fetchMetadata = async () => {
    const metadata = await store.getMetadata();
    passportTypes.value = Object.keys(metadata.passport.passports_by_type).map((type) => ({ label: type, value: type }));
    tags.value = Object.keys(metadata.passport.passports_by_tag);
    batches.value = Object.keys(metadata.passport.passports_by_batch);

    // Populate country codes with standard values
    countryCodes.value = [
        'US',
        'CA',
        'MX',
        'DE',
        'NL',
    ];
};
fetchMetadata();

const confirmDpp = async () => {
    console.log('Clicked confirm dpp');

    if (uuidValue.value == undefined || uuidValue.value == '') {
        toast.add({ severity: 'error', summary: 'UUID not valid or empty', detail: 'Message Content', life: 3150 });

        return;
    }

    try {
        selectedDpp.value = await store.getCompactDpp(uuidValue.value);
    } catch (error) {
        toast.add({ severity: 'error', summary: 'DPP with UUID not valid or not found at server', detail: 'Message Content', life: 3150 });
        throw error;
    }
};
const clearUuid = () => {
    uuidValue.value = '';
    selectedDpp.value = undefined;
};

// const onTabChange = (e) => {
//     activeTabIndex.value = e.index;
// };
</script>

<template>
    <Toast />
    <Card>
        <template #content>
            <h3>Update Digital Product Passports</h3>
            <Message severity="warn" :closable="false">Work in progress! This page is not yet complete.</Message>
            <div id="id-panel" class="pb-3">
                <Panel>
                    <div class="p-fluid grid">
                        <div class="field col-12 md:col-12">
                            <label for="productUuid">Product UUID</label>
                            <InputGroup>
                                <AutoComplete id="productUuid" v-model="uuidValue" :suggestions="filteredSuggestions"
                                    @complete="searchUUID" field="label" :placeholder="inputPlaceholder"
                                    aria-describedby="productUuid-help" />
                                <Button icon="pi pi-search" @click="confirmDpp" />
                                <Button icon="pi pi-times" class="p-button-danger" @click="clearUuid" />
                            </InputGroup>
                        </div>
                        <!-- <div class="field col-12 md:col-3 flex align-items-end">
                            <Button title="Fetch random!" label="Random" @click="randomDpp" />
                            <Button title="Fetch last published" label="Last created" @click="latestDpp" />
                            </div> -->
                    </div>
                    <small id="starting-text">Start typing to immediately get recommendations for DPP IDs known in the
                        database. Use the filters to get filtered suggestions!</small>
                    <Fieldset legend="Additional Filters" toggleable collapsed>
                        <div class="p-fluid grid">
                            <div class="field col-12 md:col-4">
                                <label for="passportType">Passport Type</label>
                                <MultiSelect id="passportType" v-model="selectedPassportType" :options="passportTypes"
                                    optionLabel="label" placeholder="Select Passport Type" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="tags">Tags</label>
                                <MultiSelect id="tags" v-model="selectedTags" :options="tags" optionLabel="label"
                                    placeholder="Select Tags" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="batchId">Batch ID</label>
                                <MultiSelect id="batchId" v-model="selectedBatchIds" :options="batches"
                                    optionLabel="label" placeholder="Select Batch IDs" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="registrationId">Registration ID</label>
                                <InputText id="registrationId" v-model="registrationId"
                                    placeholder="Enter Registration ID" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="currentCountryCode">Current Country Code</label>
                                <MultiSelect id="currentCountryCode" v-model="currentCountryCodes"
                                    :options="countryCodes" optionLabel="label" placeholder="Select Country Codes" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="originCountryCode">Origin Country Code</label>
                                <MultiSelect id="originCountryCode" v-model="originCountryCodes" :options="countryCodes"
                                    optionLabel="label" placeholder="Select Country Codes" />
                            </div>
                        </div>
                    </Fieldset>
                </Panel>
            </div>
            <!-- <div className="card">
                <h5>Empty Page</h5>
                <p>Use this page to start from scratch and place your custom content.</p>
                <p>Passport control -> Aggregate statistics</p>
            </div> -->
            <div class="pb-3" v-if="selectedDpp">
                <Panel header="Details" toggleable>
                    <!-- <TabView :activeIndex="activeTabIndex" @tab-change="onTabChange"> -->
                    <TabView>
                        <!-- <TabPanel header="General" :disabled="true">
                            <div>
                                <pre>{{ generalData }}</pre>
                            </div>
                        </TabPanel> -->
                        <TabPanel header="Events">
                            <AddEvent :uuidValue="uuidValue"></AddEvent>
                            <!-- <TabView>
                                <TabPanel header="">
                                    <Textarea v-model="createEvent" autoResize rows="5" cols="30" />
                                </TabPanel>
                                <TabPanel header="Create">
                                    <Textarea v-model="addEvent" autoResize rows="5" cols="30" />
                                </TabPanel>
                            </TabView> -->
                        </TabPanel>
                        <TabPanel header="Attributes" :disabled="true">
                            <div>
                                <!-- <pre>{{ attributeDisplayData }}</pre> -->
                                <!-- <LifecycleAssessment></LifecycleAssessment> -->
                            </div>
                        </TabPanel>
                        <TabPanel header="Credentials" :disabled="true">
                            <!-- <CredentialsTable :credentialEvents="credentialData"></CredentialsTable> -->
                        </TabPanel>
                        <TabPanel header="Attachments" :disabled="true">
                            <!-- <AttachmentsTable :attachmentEvents="attachmentData"></AttachmentsTable> -->
                        </TabPanel>
                        <TabPanel header="Subpassports" :disabled="true"> </TabPanel>
                    </TabView>
                </Panel>
            </div>
        </template>
    </Card>
</template>
