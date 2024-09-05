import { defineStore } from "pinia";

export const useAppStore = defineStore('appStore', {
    state: () => ({
        myMessage: ''
    }),

    getters: {
        myCompleteMessage: (state) => {'this is the message: '+state.myMessage},

    },

    actions: {
        changeMessage(msg: string) {
            this.myMessage = msg
        }
    }
})