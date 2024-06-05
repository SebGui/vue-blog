import { inject } from 'vue'
import cfg from '../../config.js'

export const postCreatedEvent = () => {
    console.log("Sending event");
    inject('postCreated');
}