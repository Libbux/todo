import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
    handleDone() {
        this.props.onDoneChange(this.props.itemId);
    }

    handleChange(event) {
        this.props.onContentChange(this.props.itemId, event.target.value);
    }

    handleBlur() {
        this.props.onBlur(this.props.itemId)
    }

    handleDelete() {
        this.props.onDelete(this.props.itemId)
    }

    render () {
        const checked = this.props.done ? true : false
        return (
            <div className="Item">
                <span className="Item-checkbox">
                    <input type="checkbox" checked={checked} onChange={() => this.handleDone()} />
                </span>
                <input type="text"
                    value={this.props.content}
                    onChange={(event) => this.handleChange(event)}
                    onBlur={() => this.handleBlur()}
                />
                <span className="Item-delete" onClick={() => this.handleDelete()}>
                    &times;
                </span>
            </div>
        )
    }
}

export default Item;
