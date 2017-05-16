import React, { Component } from 'react';
import './List.css';
import Item from './Item.js';

class List extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
        };
    }

    handleContentChange(id, content) {
        const newList = this.state.list.slice();
        newList[id].content = content;

        this.setState({list: newList});
    }

    handleDoneChange(id) {
        const newList = this.state.list.slice();
        newList[id].done = !this.state.list[id].done;
        this.setState({list: newList});
    }

    addItem() {
        this.setState({
            list: this.state.list.concat(
                {
                    id: this.state.list.length,
                    content: '',
                    done: false,
                }
            ),
        });
    }

    save(id) {
        // TODO: save state to backend
        console.log(this.state.list[id]);
    }

    render () {
        const listItems = this.state.list.map((item) =>
            <Item
                key={item.id}
                itemId={item.id}
                content={item.content}
                done={item.done}
                onContentChange={(id, content) => this.handleContentChange(id, content)}
                onDoneChange={(id) => this.handleDoneChange(id)}
                onBlur={(id) => this.save(id)}
            />
        );

        return (
            <div className="List">
                <ul>
                    {listItems}
                </ul>
                <button href="#" className="List-add" onClick={() => this.addItem()}>+</button>
            </div>
        )
    }
}

export default List;
