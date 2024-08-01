import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT || '/api/'
    // Due to a minor hack, this is reused in /src/components/dpps/AttachmentsTable.vue
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;
