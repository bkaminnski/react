import React from 'react';
import ReactDOM from 'react-dom';

export default class WithoutBind extends React.Component {
    constructor() {
        super();
        this.state = { message: 'Hello from a sneek peek to ES7 at the 2nd stage level. No call to .bind(this); is now required.' }; 
    }

    render() {
        return <div>
            ES6 + stage 2
            <hr/>
            <div onClick={this.onClick}>click me!</div>
        </div>
    }

    onClick = (e) => {
        alert(this.state.message);
    }
}

ReactDOM.render(<WithoutBind />, document.getElementById('withoutBind'));