import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    // property
    state={
        loadedPosts: null, //nào ko có hoặc chưa làm gì nó thì null, để làm default value
    }
    
    
    //method
    componentDidUpdate(){
        if(this.props.id){
            if (!this.state.loadedPosts|| (this.state.loadedPosts && this.state.loadedPosts.id !== this.props.id)) {
                axios.get('http://jsonplaceholder.typicode.com/posts/'+ this.props.id)
                .then(response=>{
                    console.log('response nhận ở FullPost nè: ', response);
                    this.setState( { loadedPosts: response.data} );
                    // server này ko cho xóa, nên chỉ tương tác cho biết hiểu thôi
                })
            
            }
        }
    }
    
    deletePostHandler=()=>{
        axios.delete('http://jsonplaceholder.typicode.com/posts/' + this.props.id)
        .then(response=>{
            console.log('delete post nè: ', response);
            
        })
        .catch(err=>{
            console.log("lỗi chỗ xóa post: ", err);
        });
    };
    
    render () {
        let post = <p style={{textAlign: 'center'} }>Please select a Post!</p>;
        if(this.props.id){
            post = <h2 style={{textAlign: 'center'} }>LOADING</h2>;
            if(this.state.loadedPosts){
                post = (
                    <div className="FullPost">
                        <h1>{this.state.loadedPosts.title}</h1>
                        <p>{this.state.loadedPosts.body}</p>
                        <div className="Edit">
                            <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                        </div>
                    </div>
                );
            }
              
            }
            return post;    
        }

}

export default FullPost;