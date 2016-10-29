import React from 'react';
import Description from './Description.jsx';
import DescriptionsClient from './DescriptionsClient.js';

export default class DescriptionSlice {

    constructor() {
        this.descriptionsClient = new DescriptionsClient();
    }

    loadTransformAndPublish() {
        this.descriptionsClient
            .loadDescriptions()
            .then(this.transformIntoSlice)
            .then(this.publish);
    }

    transformIntoSlice(descriptions) {
        return {
            name: 'description',
            priority: 200,
            fragments: descriptions.map(description => ({
                linkId: description.linkId,
                component: <Description key={'description-' + description.linkId} description={description.description} />
            }))
        };
    }

    publish(slice) {
        PubSub.publish('uiEvent.linksSlice.wasLoaded', slice)
    }
}

let descriptionSlice = new DescriptionSlice();
descriptionSlice.loadTransformAndPublish();