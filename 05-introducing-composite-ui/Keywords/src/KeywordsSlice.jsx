import React from 'react';
import Keywords from './Keywords.jsx';
import KeywordsClient from './KeywordsClient.js';

export default class KeywordsSlice {

    constructor() {
        this.keywordsClient = new KeywordsClient();
    }

    loadTransformAndPublish() {
        this.keywordsClient
            .loadKeywords()
            .then(this.transformIntoSlice)
            .then(this.publish);
    }

    transformIntoSlice(keywordsList) {
        return {
            name: 'keywords',
            priority: 100,
            fragments: keywordsList.map(keywords => ({
                linkId: keywords.linkId,
                component: <Keywords key={'keywords-' + keywords.linkId} keywords={keywords.keywords} />
            }))
        };
    }

    publish(slice) {
        PubSub.publish('uiEvent.linksSlice.wasLoaded', slice)
    }
}

let keywordsSlice = new KeywordsSlice();
keywordsSlice.loadTransformAndPublish();