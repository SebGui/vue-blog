import { inject } from 'vue'

export const postCreatedEvent = () => {
    console.log("Sending event");
    inject('postCreated');
}