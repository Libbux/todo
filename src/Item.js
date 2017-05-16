import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
    handleClick() {
        this.props.onDoneChange(this.props.itemId);
    }

    handleChange(event) {
        this.props.onContentChange(this.props.itemId, event.target.value);
    }

    render () {
        const checked = this.props.done ? true : false
        return (
            <div className="Item">
                <span className="Item-checkbox" onClick={() => this.handleClick()}>
                    <input type="checkbox" checked={checked} />
                </span>
                <input type="text"
                    value={this.props.content}
                    onChange={(event) => this.handleChange(event)}
                />
            </div>
        )
    }
}

export default Item;
