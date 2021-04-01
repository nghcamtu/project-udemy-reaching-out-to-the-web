import axios from 'axios';
import React, { Component } from 'react';

import './NewPost.css';

class NewPost extends Component {
    //Property 
    state = {
        title: '',
        content: '',
        author: 'Tu'
    }

    postDataHandler=()=>{
        const dataBeingSent={
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        };
        axios.post('http://jsonplaceholder.typicode.com/posts', dataBeingSent)
        .then(response=>{
            console.log("New post đã gửi lên server là: ", response.data);
        })
        .catch(err=>{
            console.log('sending failed');
        });
        
    };
    // Method
    render () {
    
    
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Tu">Tu</option>
                    <option value="CtuNguyenHuynh">CtuNguyenHuynh</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;