<script setup lang="ts">
    import { ref, watch, toRefs } from 'vue';
    import PDFViewer from './PDFViewer.vue';
    import pdfIcon from '/src/assets/images/PDF_file_icon.svg';
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '/api/';

    const props = defineProps({
        attachmentEvents: Object
    });
    const displayModal = ref(false);
    const documentUrl = ref('');

    const attachmentEvents = toRefs(props);
    const attachmentsList = ref([]);

    const imageDialogVisible = ref(false);

    const showFileDialog = (attachment) => {
        if (attachment.type === 'document') {
            documentUrl.value = attachment.image_url; // PDF URL
            displayModal.value = true;
        } else {
            imageDialogVisible.value = { visible: true, image_url: attachment.image_url };
        }
    };

    const imageLoadError = () => {
        console.log('Image failed to load');
    };

    watch(attachmentEvents.attachmentEvents, (json) => {
        attachmentsList.value = [];
        // var key = Object.keys(json)[0];
        // const desiredJsonValue = json[key];
        const desiredJsonValue = json;
        desiredJsonValue.forEach((element) => {
            // Slice the id only to display number.
            // var sourceIdMatch = element.source_id.match(/[^:]+$/);
            // var sourceIdValue = sourceIdMatch ? sourceIdMatch[0] : null;
            // if (element.type == 'template') {
            //     sourceIdValue = element.template_id ? null : sourceIdValue;
            // }
            // TODO: Fix base URL to not only resolve local metadata, but also to gather information from other sources.
            let image_url = `${apiEndpoint}dpps/${element.source_id}/attachments/${element.attachment_id}`;
            let image_thumbnail_url = '';
            if (element.type == 'document') {
                // image_thumbnail_url = new URL(`../assets/images/PDF_file_icon.svg`, import.meta.url).href;
                image_thumbnail_url = pdfIcon;
            } else {
                image_thumbnail_url = `${apiEndpoint}dpps/${element.source_id}/attachments/${element.attachment_id}/thumbnail`;
            }
            var row = {
                id: element.attachment_id,
                type: element.type,
                source: element.source,
                // source_id: sourceIdValue,
                source_id: element.source_id,
                description: element.description,
                file_name: element.file_name,
                image_url: image_url,
                image_thumbnail_url: image_thumbnail_url
            };

            attachmentsList.value.push(row);
        });
    });
</script>

<template>
    <div class="container">
        <DataTable :value="attachmentsList" tableStyle="min-width: 50rem">
            <Column field="description" header="Name"></Column>
            <Column field="id" header="Id"></Column>
            <Column field="type" header="Category"></Column>
            <Column field="source" header="Source"></Column>
            <!-- <Column field="source_id" header="Source Id"></Column> -->
            <Column header="File">
                <template #body="slotProps">
                    <!-- <img :src="getImagePath(`${slotProps.data}`)" :alt="slotProps.data.file_name" class="w-6rem border-round" @click="showFileDialog(slotProps.data)" @error="imageLoadError" /> -->
                    <img :src="slotProps.data.image_thumbnail_url" :alt="slotProps.data.file_name" class="w-6rem border-round" @click="showFileDialog(slotProps.data)" @error="imageLoadError" />
                </template>
            </Column>
        </DataTable>
        <!-- <Dialog v-model:visible="imageDialogVisible.visible" modal> -->
        <!-- <Dialog v-model:visible="imageDialogVisible.visible" modal :style="{ width: '30vw', maxWidth: '500px' }" :contentStyle="{ padding: '20px' }"> -->
        <!-- <Image :src="getImagePath(`${imageDialogVisible.file_name}`)" alt="Full-size Image" /> -->
        <!-- <Image :src="imageDialogVisible.image_path" alt="Full-size Image" /> -->
        <!-- </Dialog> -->
        <Dialog v-model:visible="imageDialogVisible.visible" modal dismissableMask :style="{ width: 'auto', height: 'auto', maxWidth: '80vw', maxHeight: '80vh', overflow: 'hidden' }" :contentStyle="{ padding: '0' }" class="image-dialog">
            <img :src="imageDialogVisible.image_url" alt="Full-size Image" class="dialog-image" />
        </Dialog>
        <Dialog header="PDF Viewer" v-model:visible="displayModal" modal dismissableMask :style="{ width: 'auto', height: 'auto', maxWidth: '80vw', maxHeight: '80vh', overflow: 'hidden' }">
            <PDFViewer v-if="documentUrl" :pdfUrl="documentUrl" />
        </Dialog>
    </div>
</template>
<style scoped>
    .image-dialog {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dialog-image {
        max-width: 95%;
        max-height: 95%;
        /* object-fit: fill; */
    }
</style>
