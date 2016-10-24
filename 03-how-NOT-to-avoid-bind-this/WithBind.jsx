import React from 'react';
import ReactDOM from 'react-dom';

export default class WithBind extends React.Component {
    constructor() {
        super();
        this.state = { message: 'Hello from ES6, in which you had to call ".bind(this);" explicitly.' };
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return <div>
            ES6
            <hr/>
            <div onClick={this.onClick}>click me!</div>
        </div>
    }

    onClick(e) {
        alert(this.state.message);
    }
}

ReactDOM.render(<WithBind />, document.getElementById('withBind'));