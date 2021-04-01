import React from 'react';

import './Post.css';

const post = (props_para) => (
    <article className="Post" onClick={props_para.clicked}>
        <h1>{props_para.title}</h1>
        <div className="Info">
            <div className="Author">{props_para.author} </div>
        </div>
    </article>
);

export default post;