import { defineStore } from 'pinia';
import axiosInstance from '../axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        axios: axiosInstance,
        users: [],
        isLoggedIn: false
    }),
    getters: {
        getUsers(state) {
            return state.users;
        }
    },
    actions: {
        async fetchUsers() {
            try {
                const data = await this.axios.get('users');
                this.users = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async findCredentials() {
            try {
                await this.axios.get('credentials/available').then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        checkLoggedInStatus() {
            if (localStorage.getItem('user')) {
                this.isLoggedIn = true;
            }
        }
    }
});
