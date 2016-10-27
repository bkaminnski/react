import React from 'react';
import PubSub from 'pubsub-js';

export default class Subscriber extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    componentDidMount() {
        this.aMessageToken = PubSub.subscribe('aMessage', function (msg, data) {
            this.setState({ message: data.messageContent });
        }.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.aMessageToken);
    }

    render() {
        return <div>A message received by a subscriber: {this.state.message}</div>
    }
}
