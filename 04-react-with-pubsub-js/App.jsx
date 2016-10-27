import React from 'react';
import ReactDOM from 'react-dom';
import Publisher from './Publisher.jsx';
import Subscriber from './Subscriber.jsx';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = { numberOfSubscribers: 1 };
    }

    addSubscriber() {
        this.setState({ numberOfSubscribers: this.state.numberOfSubscribers + 1 });
    }

    removeSubscriber() {
        if (this.state.numberOfSubscribers === 0)
            return;

        this.setState({ numberOfSubscribers: this.state.numberOfSubscribers - 1 });
    }

    render() {
        let subscribers = [];
        for (let i = 0; i < this.state.numberOfSubscribers; i++)
            subscribers.push(<Subscriber key={i} />);

        return <div>
            <Publisher />
            <input type="button" onClick={this.addSubscriber.bind(this)} value="+" />
            <input type="button" onClick={this.removeSubscriber.bind(this)} value="-" />
            {subscribers}
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));