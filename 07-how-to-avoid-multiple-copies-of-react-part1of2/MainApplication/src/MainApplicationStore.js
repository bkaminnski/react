export default class MainApplicationStore {

    constructor(mainApplicationComponent) {
        this.mainApplicationComponent = mainApplicationComponent;
    }

    subscribeToEvents() {
        this.subscriptionToken = PubSub.subscribe('uiEvent.applicationForm.wasLoaded', (msg, formComponent) => {
            this.mainApplicationComponent.setState({ formComponent: formComponent });
        });
    }

    unsubscribeFromEvents() {
        PubSub.unsubscribe(this.subscriptionToken);
    }
}