import React from 'react';
import PubSub from 'pubsub-js';

export default class Publisher extends React.Component {

    publish() {
        PubSub.publish('aMessage', { messageContent: this.refs.message.value });
    }

    render() {
        return <div>Type a message to publish: <input type="text" onChange={this.publish.bind(this)} ref="message" /></div>
    }
}
