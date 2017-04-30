import React from 'react';

export default class Message extends React.Component {
  render() {
    return <div>
        <div>{this.props.title}</div>
        <div>{this.props.children}</div>
    </div>
  }
}