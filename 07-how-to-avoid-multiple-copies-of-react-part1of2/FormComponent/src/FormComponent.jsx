import React from 'react';

class FormComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
        this.submitItem = this.submitItem.bind(this);
    }

    render() {
        return <div>
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
        });
    }

    appendNewItemToTheCopyOfItemsArray() {
        let updatedItems = this.state.items.slice();
        updatedItems.push(this.refs.item.value);
        return updatedItems;
    }

    clearItemInput() {
        this.refs.item.value = '';
    }
}

PubSub.publish('uiEvent.applicationForm.wasLoaded', <FormComponent />)