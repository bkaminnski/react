import LinksClient from './LinksClient.js';

export default class LinksStateBuilder {

    constructor(linksComponent22) {
        this.linksComponent = linksComponent22;
        this.linksClient = new LinksClient();
        this.links = [];
        this.fragments = [];
    }

    rebuildState() {
        this.linksComponent.setState({ links: this.links });
    }

    loadLinks() {
        let linksStateBuilder = this;
        this.linksClient
            .links()
            .then(function (l) { this.links = l; this.rebuildState(); }.bind(this));
    }

    subscribeToEvents() {
        this.subscriptionToken = PubSub.subscribe('uiEvent.linkFragment.wasLoaded', function (msg, data) {
            // this.fragments.push(data);
            // this.rebuildState();
        }.bind(this));
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.subscriptionToken);
    }
}