<script setup lang="ts">
    import { ref, toRefs, watch } from 'vue';
    import { useDppStore } from '@/store/dpp';

    const props = defineProps({
        timelineEvents: Object
    });
    const store = useDppStore();
    const timelineEvents = toRefs(props);
    const localTimelineEvents = ref([]);
    const showTimeline = ref(true);

    const allEvents = ref();
    const allActivityEvents = ref();
    const allOwnershipEvents = ref();
    const directEvents = ref();
    const directActivityEvents = ref();
    const directOwnershipEvents = ref();

    // Define the options for the SelectButton
    const options = ref([
        { name: 'Activity', value: 'activity' },
        { name: 'Ownership', value: 'ownership' }
    ]);

    // Set the initial selected values
    // const selectedEventTypes = ref(['activity', 'ownership', 'all']);
    const selectedEventTypes = ref([
        { name: 'Activity', value: 'activity' },
        { name: 'Ownership', value: 'ownership' }
    ]);
    const displayEventModal = ref(false);
    const eventContent = ref({ placeholder: 'text' });
    const fullEventTimelineToggle = ref(false);

    // Function to be triggered on change
    const updateTimelineEvents = () => {
        console.log('Something in the filters changed.');
        console.log('Selected types');
        console.log(selectedEventTypes.value);
        console.log('Full?');
        console.log(fullEventTimelineToggle.value);

        // Add your custom logic here
        if (selectedEventTypes.value.length === 0) {
            console.log('No event types selected.');
            // Assign value for no selection
            localTimelineEvents.value = [];
        } else if (selectedEventTypes.value.length === 1) {
            console.log('One event type selected:', selectedEventTypes.value[0].value);
            // Assign value for one selection
            if (selectedEventTypes.value[0].value == 'activity') {
                if (fullEventTimelineToggle.value == false) {
                    localTimelineEvents.value = directActivityEvents.value;
                } else {
                    localTimelineEvents.value = allActivityEvents.value;
                }
            } else {
                if (fullEventTimelineToggle.value == false) {
                    localTimelineEvents.value = directOwnershipEvents.value;
                } else {
                    localTimelineEvents.value = allOwnershipEvents.value;
                }
            }
        } else {
            console.log('Both event types selected.');
            // Assign value for both selections
            if (fullEventTimelineToggle.value == false) {
                localTimelineEvents.value = directEvents.value;
            } else {
                localTimelineEvents.value = allEvents.value;
            }
        }
    };

    // Watcher to trigger the function when selectedEventTypes changes
    watch(selectedEventTypes, () => {
        // onSelectedEventTypesChange(newValue);
        updateTimelineEvents();
    });

    watch(fullEventTimelineToggle, () => {
        updateTimelineEvents();
    });

    const processEvent = (event) => {
        // Determine the date field to use
        const date = event['prov:endedAtTime'] ? event['prov:endedAtTime']['@value'] : event['prov:atTime'] ? event['prov:atTime']['@value'] : null;

        // Determine the color based on the event type
        const color = event['@type'].startsWith('dpp:') ? '#ADD8E6' : event['@type'].startsWith('aitef:') ? '#FFDAB9' : '#90EE90'; // pastel blue for dpp, pastel orange for AI TEF, pastel green otherwise

        // Determine the icon based on the event type
        let icon;
        if (event['@type'].startsWith('dpp:')) {
            switch (event['@type']) {
                case 'dpp:CreationEvent':
                    icon = 'pi pi-plus';
                    break;
                case 'dpp:TransferEvent':
                    icon = 'pi pi-truck';
                    break;
                case 'dpp:DestructionEvent':
                    icon = 'pi pi-trash';
                    break;
                default:
                    icon = 'pi pi-cog';
            }
        } else {
            const typeSuffix = event['@type'].split(':').pop();
            switch (typeSuffix) {
                case 'BatchReceivingEvent':
                    icon = 'pi pi-inbox';
                    break;
                case 'ShippingEvent':
                    icon = 'pi pi-truck';
                    break;
                case 'ManufacturingEvent':
                    icon = 'pi pi-cog';
                    break;
                default:
                    icon = 'pi pi-cog';
            }
        }

        const eventTypeParts = event['@type'].split(':');
        let tag = eventTypeParts[0];
        let statusValue = eventTypeParts[1];

        return {
            status: statusValue,
            date: date,
            icon: icon,
            color: color,
            content: event['prov:description'] ?? '',
            tag: tag,
            id: event['@id'],
            json: event
        };
    };
    const constructEventArray = (jsonArrayValue) => {
        console.log(jsonArrayValue);
        return jsonArrayValue.map((event) => processEvent(event));
    };

    const showEventDialog = (event) => {
        console.log('clicked event-> ' + event);
        eventContent.value = event.json;
        displayEventModal.value = true;
    };
    watch(timelineEvents.timelineEvents, async (json) => {
        let uuidID = json.id || json['@id'];
        console.log(uuidID);
        let localAllEvents = await store.getDppEventsFull(uuidID);
        let localAllActivityEvents = await store.getDppActivityEventsFull(uuidID);
        let localAllOwnershipEvents = await store.getDppOwnershipEventsFull(uuidID);
        let localDirectEvents = await store.getDppEvents(uuidID);
        let localDirectActivityEvents = await store.getDppActivityEvents(uuidID);
        let localDirectOwnershipEvents = await store.getDppOwnershipEvents(uuidID);

        allEvents.value = constructEventArray(localAllEvents);
        allActivityEvents.value = constructEventArray(localAllActivityEvents);
        allOwnershipEvents.value = constructEventArray(localAllOwnershipEvents);
        directEvents.value = constructEventArray(localDirectEvents);
        directActivityEvents.value = constructEventArray(localDirectActivityEvents);
        directOwnershipEvents.value = constructEventArray(localDirectOwnershipEvents);

        // Reset events in timelines to empty.
        localTimelineEvents.value = [];

        // var key = Object.keys(json)[0];
        // const desiredJsonValue = json[key];
        // const desiredJsonValue = json;

        // loopthroughPassports(desiredJsonValue);
        updateTimelineEvents();

        // if (checked.value) {
        //     determineAddingSubpassportEvents(desiredJsonValue);
        // }

        // timeLineKey.value = key;
        // timeLineKey.value = 'undefined';
        // showTimeline.value = events.value.length > 0;
    });
</script>

<template>
    <div>
        <div>
            <Fieldset legend="Timeline filters" toggleable collapsed>
                <div class="grid">
                    <div class="col-12 lg:col-6">
                        <div class="flex items-center">
                            <label for="selectedEventTypes" class="block text-500 font-medium mb-3 mr-2">Event Types</label>
                            <SelectButton id="selectedEventTypes" v-model="selectedEventTypes" :options="options" optionLabel="name" multiple aria-labelledby="multiple" class="w-full" />
                        </div>
                    </div>
                    <div class="col-12 lg:col-6">
                        <div class="flex justify-content-end items-center">
                            <label for="fullEventToggle" class="block text-500 font-medium mb-3 mr-2">Toggle full timeline</label>
                            <InputSwitch id="fullEventToggle" v-model="fullEventTimelineToggle" />
                        </div>
                    </div>
                </div>
            </Fieldset>
        </div>
        <!-- <div v-show="showTimeline" class="container justify-content-center">
            <div class="flex justify-content-center">
                
            </div>
        </div> -->
        <div>
            <Timeline :value="localTimelineEvents" align="alternate" class="customized-timeline">
                <template #marker="slotProps">
                    <span class="bullet" :style="{ backgroundColor: slotProps.item.color, color: 'black' }">
                        <i :class="slotProps.item.icon"></i>
                    </span>
                </template>
                <template #content="slotProps">
                    <span @click="showEventDialog(slotProps.item)">
                        <Card class="mt-3">
                            <template #title>
                                <Tag :value="slotProps.item.tag" :style="{ backgroundColor: slotProps.item.color, color: 'black' }"></Tag>
                                {{ slotProps.item.status }}
                            </template>
                            <template #subtitle>
                                {{ slotProps.item.date }}
                            </template>
                            <template #content>
                                <p class="m-0">
                                    {{ slotProps.item.content }}
                                </p>
                            </template>
                        </Card>
                    </span>
                </template>
            </Timeline>
        </div>
        <div v-show="!showTimeline">
            <span>There are no event available for this passport</span>
        </div>
        <Dialog header="Event viewer" v-model:visible="displayEventModal" modal dismissableMask :style="{ width: 'auto', height: 'auto', maxWidth: '80vw', maxHeight: '80vh', overflow: 'hidden' }">
            <pre>{{ eventContent }}</pre>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped>
    .bullet {
        width: 2rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 2rem;
        border-radius: 50%;
    }

    // .container {
    //     flex-wrap: wrap;
    //     display: flex;
    //     // justify-content: space-between;
    // }
    .p-field {
        display: flex;
        flex-direction: column;
    }
    // @media screen and (max-width: 960px) {
    //     ::v-deep(.customized-timeline) {
    //         .p-timeline-event:nth-child(even) {
    //             flex-direction: row;

    //             .p-timeline-event-content {
    //                 text-align: left;
    //             }
    //         }

    //         .p-timeline-event-opposite {
    //             flex: 0;
    //         }

    //         .p-card {
    //             margin-top: 1rem;
    //         }
    //     }
    // }
</style>
