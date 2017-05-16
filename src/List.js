import React, { Component } from 'react';
import './List.css';
import Item from './Item.js';
const axios = require('axios');
const url = 'http://localhost:3001/api';

class List extends Component {
    constructor() {
        super();
        var items = this.apiGetItems();
        console.log(items);
        this.state = {
            list: [],
        };
    }

    findIndex(id) {
        return this.state.list.indexOf(this.state.list.find((item) => {
            return id === item._id
        }));
    }

    findItem(id) {
        return this.state.list[this.findIndex(id)];
    }

    apiGetItems() {
        axios.get(url + '/items').then((response) => {
            this.setState({
                list: response.data,
            });
        });
    };

    apiCreateItem() {
        return axios.post(url + '/items', {
            done: false,
            content: '',
        });
    };

    apiUpdateItem(id, done, content) {
        axios.put(url + '/items/' + id, {
            done: done,
            content: content,
        }).then((response) => {
            console.log(response);
        });
    }

    apiDeleteItem(id) {
        axios.delete(url + '/items/' + id).then((response) => {
            console.log(response);
        });
    }

    handleContentChange(id, content) {
        var newList = this.state.list.slice();
        newList[this.findIndex(id)].content = content;
        this.setState({list: newList});
    }

    handleDoneChange(id) {
        var newList = this.state.list.slice();
        newList[this.findIndex(id)].done = !this.state.list[this.findIndex(id)].done;
        this.setState({list: newList});
        this.saveItem(id);
    }

    addItem() {
        this.apiCreateItem().then((response) => {
            this.setState({
                list: this.state.list.concat(
                    {
                        _id: response.data._id,
                        content: '',
                        done: false,
                    }
                ),
            });
        });
    }

    saveItem(id) {
        var item = this.findItem(id);
        this.apiUpdateItem(id, item.done, item.content);
    }

    deleteItem(id) {
        this.apiDeleteItem(id);
        var newList = this.state.list.slice();
        newList.splice(this.findIndex(id), 1);

        this.setState({
            list: newList,
        });
    }

    render () {
        var listItems = this.state.list.map((item, index) =>
            <Item
                key={index}
                itemId={item._id}
                content={item.content}
                done={item.done}
                onContentChange={(id, content) => this.handleContentChange(id, content)}
                onDoneChange={(id) => this.handleDoneChange(id)}
                onBlur={(id) => this.saveItem(id)}
                onDelete={(id) => this.deleteItem(id)}
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
