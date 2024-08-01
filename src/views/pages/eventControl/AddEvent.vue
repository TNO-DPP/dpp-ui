<script setup lang="ts">
    import { ref, toRefs, watch } from 'vue';
    import { onMounted } from 'vue';
    // import { Button } from 'primevue/button';
    // import { Card } from 'primevue/card';
    // import { InputText } from 'primevue/inputtext';
    // import { Textarea } from 'primevue/textarea';
    import { useToast } from 'primevue/usetoast';
    import { useDppStore } from '@/store/dpp';

    const props = defineProps({
        uuidValue: Object
    });
    const uuidValue = toRefs(props);
    const localUuidValue = ref();

    const store = useDppStore();
    const eventType = ref('');
    const eventId = ref(`urn:AIMattersTEF:events:activity:${generateRandomId()}`);
    const timestamp = ref('');
    const description = ref('');
    const generatedJson = ref();

    watch(uuidValue.uuidValue, (newVal) => {
        console.log('General Data Loaded:', newVal);
        localUuidValue.value = newVal;
    });
    onMounted(() => {
        console.log('UUIDValue in Component (mounted):', props.uuidValue);
        localUuidValue.value = props.uuidValue;
    });

    function generateRandomId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function setCurrentTimestamp() {
        const now = new Date().toISOString();
        timestamp.value = now;
    }
    function handleDateChange(event) {
        if (event.value) {
            timestamp.value = new Date(event.value).toISOString();
        }
    }

    // function setCurrentTimestamp() {
    //     timestamp.value = new Date().toISOString();
    // }
    const eventTypes = ref([
        { name: 'InspectionEvent', value: 'InspectionEvent' },
        { name: 'RepairEvent', value: 'RepairEvent' }
    ]);
    // const eventTypes = ref(['InspectionEvent', 'RepairEvent']);
    const toast = useToast();

    function createEvent() {
        const context = {
            prov: 'http://www.w3.org/ns/prov#',
            dpp: 'http://www.tno.nl/digitalproductpassport#',
            xsd: 'http://www.w3.org/2001/XMLSchema#',
            aitef: 'http://tno.ai-matters-tef.nl#'
        };
        console.log(eventType.value);
        if (eventType.value == undefined || eventType.value == '') {
            toast.add({ severity: 'error', summary: 'Event ID not valid or empty', detail: 'Message Content', life: 3150 });
        } else if (timestamp.value == undefined || timestamp.value == '') {
            toast.add({ severity: 'error', summary: 'Timestamp not valid or empty', detail: 'Message Content', life: 3150 });
        } else {
            const newEvent = {
                '@context': context,
                '@type': `aitef:${eventType.value.name}`,
                '@id': eventId.value,
                'prov:atTime': {
                    '@type': 'xsd:dateTime',
                    '@value': timestamp.value
                },
                'prov:description': description.value,
                'prov:used': {
                    '@id': localUuidValue.value,
                    '@type': 'dpp:DigitalProductPassport'
                }
            };

            generatedJson.value = newEvent;
            console.log(newEvent);
        }
    }
    function clearForm() {
        eventType.value = '';
        eventId.value = `urn:AIMattersTEF:events:activity:${generateRandomId()}`;
        description.value = '';
        timestamp.value = undefined;
        generatedJson.value = undefined;
    }
    const submitEvent = async () => {
        try {
            await store.addDppActivityEvent(localUuidValue.value, generatedJson.value);
            toast.add({ severity: 'success', summary: 'Published event!', detail: 'Message Content', life: 3150 });
            clearForm();
        } catch {
            toast.add({ severity: 'error', summary: 'Backend not available!', detail: 'Message Content', life: 3150 });
        }
    };
</script>

<template>
    <Toast />

    <Card>
        <template #content>
            <h4>Add Event</h4>
            <!-- <div class="p-fluid grid"> -->
            <!-- <div>
                <div class="card p-fluid">
                    <div class="field col-12 md:col-6">
                        <label for="eventType">Event Type</label>
                        <InputText id="eventType" v-model="eventType" placeholder="InspectionEvent or RepairEvent" />
                    </div>

                    <div class="field col-12 md:col-6">
                        <label for="eventId">Event ID</label>
                        <InputText id="eventId" v-model="eventId" :disabled="true" />
                    </div>
                </div>
            </div> -->
            <div class="grid p-fluid">
                <div class="field col-12 md:col-6">
                    <label for="eventType">Event Type</label>
                    <!-- <InputText id="eventType" v-model="eventType" placeholder="InspectionEvent or RepairEvent" /> -->
                    <Dropdown v-model="eventType" editable :options="eventTypes" optionLabel="name" placeholder="Select or type an Event type" />
                    <!-- class="w-full md:w-14rem" -->
                </div>

                <div class="field col-12 md:col-6">
                    <label for="eventId">Event ID</label>
                    <InputText id="eventId" v-model="eventId" :disabled="true" />
                </div>
            </div>
            <div class="grid p-fluid">
                <div class="field col-12 md:col-6">
                    <label for="timestamp">Timestamp</label>
                    <div class="p-inputgroup">
                        <Calendar id="timestamp" v-model="timestamp" :showTime="true" showSeconds="true" dateFormat="yy-mm-dd" hourFormat="24" @change="handleDateChange" class="timestamp-input" />
                    </div>

                    <div class="flex align-items-end">
                        <Button @click="setCurrentTimestamp" label="Now" class="timestamp-button" />
                    </div>
                </div>
            </div>
            <div>
                <div class="field p-fluid">
                    <label for="description">Description</label>
                    <Textarea id="description" v-model="description" rows="4" />
                </div>
            </div>
            <div class="grid p-fluid">
                <div class="field col-12 md:col-6">
                    <Button @click="createEvent" label="Create Event" />
                </div>
                <div class="field col-12 md:col-6">
                    <Button @click="clearForm" label="Clear Form" class="p-button-outlined" />
                </div>
            </div>
        </template>
    </Card>

    <Card v-if="generatedJson">
        <template #content>
            <div>
                <h4>Generated JSON</h4>
                <pre>{{ generatedJson }}</pre>
            </div>
            <div class="grid p-fluid">
                <div class="field col-12 md:col-6">
                    <Button @click="submitEvent" label="Publish Event" />
                </div>
            </div>
        </template>
    </Card>
</template>
<style scoped>
    .p-field {
        margin-bottom: 1rem;
    }

    Button {
        padding-top: 0.5rem;
        margin-top: 0.5rem;
    }
    .timestamp-input .p-inputtext {
        width: 100%;
        padding-right: 0.5rem;
    }

    .timestamp-button {
        flex: 0 0 auto;
    }
</style>
