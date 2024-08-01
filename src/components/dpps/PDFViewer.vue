<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    // import * as pdfjsLib from 'pdfjs-dist';
    import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs';
    // import * as pdfjsLib from 'pdfjs-dist/build/pdf';
    // import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs';
    const pdfContainer = ref(null);
    const props = defineProps({
        pdfUrl: String
    });
    // await import('pdfjs-dist/build/pdf.worker.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs';
    // pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.mjs'; // Path to the worker file in the public folder
    // pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
    const renderPDF = async (url) => {
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;
        const container = pdfContainer.value;

        // Clear the container if there's existing content
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise;
            container.appendChild(canvas);
        }
    };
    watch(
        () => props.pdfUrl,
        (newUrl) => {
            console.log('Received pdfURL');
            console.log(newUrl);
            if (newUrl) {
                renderPDF(newUrl);
            }
        }
    );

    onMounted(() => {
        console.log('Received pdfURL');
        console.log(props.pdfUrl);
        if (props.pdfUrl) {
            renderPDF(props.pdfUrl);
        }
    });
</script>

<template>
    <div ref="pdfContainer" style="width: 100%; height: 100%; overflow: auto"></div>
</template>
