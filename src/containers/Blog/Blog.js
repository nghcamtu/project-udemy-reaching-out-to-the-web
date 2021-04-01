import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from 'axios';

class Blog extends Component {
    // PROPERTIES:
    state={
        posts: [],
        selectedPostId: null //nào ko có hoặc chưa làm gì nó thì null
        
    }
    
    
    //METHODS:
    //ComponentDidMount chạy sau render(), dùng để xử lý side effect (hiệu ứng lề), tức là bao gồm HTTP request
    componentDidMount(){
        axios.get('http://jsonplaceholder.typicode.com/posts') //get này nó trả 1 về promise
         //dùng then để xử lý khi get data thành công
        .then(response=> {
            console.log("response lúc get data ở DidMount: ", response);
            // this.setState({posts: response.data });
            // setState() ở đây chứ không phải bên ngoài .then() là do sợ nó chạy cái componentDidMpunt từ trên xuống, xong trong khi data chưa lấy được (do load lâu) mà setState() nó chạy là thua luôn
            const posts= response.data.slice(0, 4);
            const updatedPosts= posts.map(value=>{
                return {
                    ...value, author: 'Tú'
                }
            });
            this.setState({posts: updatedPosts });
        
        })
        .catch();
    }
    
    postSelectedHanlder=(id_para)=>{
        this.setState({selectedPostId: id_para});
        
    
    };
    
    render () {
    // render từng post ra màn hình
    const posts= this.state.posts.map((value)=>{
        return <Post key={value.id} title={value.title} author={value.author} 
                clicked={()=>this.postSelectedHanlder(value.id)} />
    });
    
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;