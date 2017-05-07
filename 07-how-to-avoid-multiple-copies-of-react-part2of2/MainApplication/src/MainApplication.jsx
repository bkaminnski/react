import React from 'react';
import ReactDOM from 'react-dom';
import MainApplicationStore from './MainApplicationStore.js';

class MainApplication extends React.Component {

    constructor() {
        super();
        this.mainApplicationStore = new MainApplicationStore(this);
        this.state = { formComponent: null };
    }

    componentDidMount() {
        this.mainApplicationStore.subscribeToEvents();
    }

    componentWillUnmount() {
        this.mainApplicationStore.unsubscribeFromEvents();
    }

    render() {
        return <div>
            {this.state.formComponent}
        </div>
    }
}

ReactDOM.render(<MainApplication />, document.getElementById('mainApplication'));