import React from 'react';
import ReactDOM from 'react-dom';

export default class NoBigDeal extends React.Component {
    constructor() {
        super();
        this.state = { message: 'Hello from ES6, in which you had to call ".bind(this);" explicitly. You can keep it inline, though. ' };
    }

    render() {
        return <div>
            Back to ES6, with <span style={{fontFamily: 'Courier New'}}>.bind(this)</span> inlined.
            <hr/>
            <div onClick={this.onClick.bind(this)}>click me!</div>
        </div>
    }

    onClick(e) {
        alert(this.state.message);
    }
}

ReactDOM.render(<NoBigDeal />, document.getElementById('noBigDeal'));