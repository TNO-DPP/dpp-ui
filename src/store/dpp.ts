import { defineStore } from 'pinia';
import axiosInstance from '../axios';

export const useDppStore = defineStore('user', {
    state: () => ({
        axios: axiosInstance,
        dppFullData: 15870
    }),
    getters: {
        getDppFullData: (state) => state.dppFullData
    },
    actions: {
        async getMetadata() {
            try {
                const response = await this.axios.get(`dpps/metadata`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },

        async searchBackend(filterConditions) {
            try {
                const response = await this.axios.post(`dpps/search`, filterConditions);
                console.log(response.data);
                return response.data;
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },

        async getCompactDpp(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/compact`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        // Basic compact pull with no signature.
        async getBasicDpp(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}`).then((response) => {
                    console.log(response.data);
                    return response.data;
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Pull dpp with all attachment links and images attached.
        async getFullDpp(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/full`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppAttributes(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/attributes`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppGeneralData(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/general`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppCredentials(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/credentials`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppOwnershipEvents(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/events/ownership`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppActivityEvents(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/events/activity`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppEvents(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/events`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppOwnershipEventsFull(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/events/ownership/full`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppActivityEventsFull(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/events/activity/full`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        async getDppEventsFull(uuid) {
            try {
                const response = await this.axios.get(`dpps/${uuid}/events/full`);
                console.log(response.data);
                return response.data; // Ensure the data is returned here
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },

        // Get the last DPP that was generated.
        async getLatestDpp() {
            try {
                console.log(this.axios.getUri());
                const response = await this.axios.get('dpps/latest');
                console.log(response.data);
                return response.data.result;
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        // Get a random DPP based on available IDs in the graph_db.
        async getRandomDpp() {
            try {
                console.log(this.axios.getUri());
                const response = await this.axios.get('dpps/random');
                console.log(response.data);
                return response.data.result; // Extract and return the `result` field
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        // Add event of type that matches the registered types in the registered version.
        async addDppActivityEvent(uuid, event) {
            try {
                console.log(this.axios.getUri());
                const response = await this.axios.post(`dpps/${uuid}/events/activity`, event);
                console.log(response.data);
                return response.data.result; // Extract and return the `result` field
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    // No response received
                    console.error('Request error:', error.request);
                } else {
                    // Other errors
                    console.error('Error:', error.message);
                }
                throw error; // Rethrow the error to handle it in the calling function
            }
        },
        // Add event of type that matches the registered types in the registered version.
        async addDppOwnershipEvent(uuid, event) {
            try {
                await this.axios.post(`dpps/${uuid}/events/ownership`, event).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        async getDppAttachments(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/attachments`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
        // async putDppAttachments(uuid, attachment_id) {
        //     try {
        //         await this.axios.get(`dpps/${uuid}/attachments/${attachment_id}`).then((response) => {
        //             console.log(response.data);
        //         });
        //     } catch (error) {
        //         alert(error);
        //         console.log(error);
        //     }
        // },

        // // Add a file that is stored with a reference to it added to the DPP itself.
        // async addDppAttachments(uuid, file) {
        //     try {
        //         var formData = new FormData();
        //         formData.append('file', file);
        //         await this.axios
        //             .post(
        //                 `dpps/${uuid}/attachments`,
        //                 {
        //                     name: 'filename',
        //                     attachment: formData
        //                 },
        //                 {
        //                     headers: {
        //                         'Content-Type': 'multipart/form-data'
        //                     }
        //                 }
        //             )
        //             .then((response) => {
        //                 console.log(response.data);
        //             });
        //     } catch (error) {
        //         alert(error);
        //         console.log(error);
        //     }
        // },
        // Get just the activity subset of data about the given DPP uuid.
    }
});
