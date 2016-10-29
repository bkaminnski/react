import React from 'react';
import ReactDOM from 'react-dom';
import LinksStateBuilder from './LinksStateBuilder.js';
import Link from './Link.jsx';

class Links extends React.Component {

    constructor(props) {
        super(props);
        this.linksStateBuilder = new LinksStateBuilder(this);
        this.state = { links: [] };
    }

    componentDidMount() {
        this.linksStateBuilder.subscribeToEvents();
        this.linksStateBuilder.loadLinks();
    }

    componentWillUnmount() {
        this.linksStateBuilder.unsubscribeFromEvents();
    }

    render() {
        return (
            <div>
                {this.state.links.map(l =>
                    <Link key={l.id} link={l} />
                )}
            </div>
        )
    }
}

ReactDOM.render(<Links />, document.getElementById('links'));