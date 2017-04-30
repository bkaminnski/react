import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

export default class HelloWorld extends React.Component {
  render() {
    return <Message title="React app says:">Hello World!</Message>
  }
}

ReactDOM.render(<HelloWorld/>, document.getElementById('helloWorld'));