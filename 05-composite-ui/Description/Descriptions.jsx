import React from 'react';
import Description from './Description.jsx';
import DescriptionsClient from './DescriptionsClient.js';

export default class Descriptions {

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
            name: 'descriptions',
            priority: 200,
            fragments: descriptions.map(d => ({
                linkId: d.linkId,
                component: <Description key={d.linkId} description={d.description} />
            }))
        };
    }

    publish(slice) {
        PubSub.publish('uiEvent.linksSlice.wasLoaded', slice)
    }
}

let descriptions = new Descriptions();
descriptions.loadTransformAndPublish();