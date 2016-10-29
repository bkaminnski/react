import DescriptionsClient from './DescriptionsClient.js';

export default class Descriptions {

    constructor() {
        this.descriptionsClient = new DescriptionsClient();
    }

    loadTransformAndPublish() {
        this.descriptionsClient
            .descriptions()
            .then(this.transformIntoMessage)
            .then(this.publish);
    }

    transformIntoMessage(descriptions) {
        return { messageContent: 'aMessage' };
    }

    publish(message) {
        PubSub.publish('uiEvent.linkFragment.wasLoaded', message)
    }
}