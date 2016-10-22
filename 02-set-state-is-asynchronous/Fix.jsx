import React from 'react';
import ReactDOM from 'react-dom';

export default class Fix extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
        this.submitItem = this.submitItem.bind(this);
    }

    render() {
        return <div>
            Fixed setState() usage
            <hr/>
            <form onSubmit={this.submitItem}>
                <input type="text" ref="item" />
                <input type="submit" value="Add to list" />
            </form>
            {
                this.state.items.map(item =>
                    <div key={item}>{item}</div>
                )
            }
        </div>
    }

    submitItem(e) {
        e.preventDefault();

        let updatedItems = this.appendNewItemToTheCopyOfItemsArray();
        this.clearItemInput();

        this.setState({
            items: updatedItems
        }, this.notifyAboutNewState);
    }

    appendNewItemToTheCopyOfItemsArray() {
        let updatedItems = this.state.items.slice();
        updatedItems.push(this.refs.item.value);
        return updatedItems;
    }

    clearItemInput() {
        this.refs.item.value = '';
    }

    notifyAboutNewState() {
        console.log(this.state.items);
    }
}

ReactDOM.render(<Fix />, document.getElementById('fix'));