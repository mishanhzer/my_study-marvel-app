import React, { useState, useEffect, Component } from 'react';
import { RouteComponentProps } from 'react-router';

type RouteParams = {
  id: string,
}

interface IPost {
  title?: string,
  body?: string,
}

interface PostState {
  post: IPost,
}

export async function http(reques: string) { 
    const response = await fetch(reques);
    const body = await response.json();
    return body;
}

const Post = (props: RouteComponentProps<RouteParams>) => {
    const [state, setState] = useState<PostState>({post: {title: '', body: ''}}) // ??? не знаю, как тут типизировать

    useEffect(() => {
        const id = props.match.params.id || '';
    
        const post = http<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setState({ post });
    }, [])
   
    const { post } = state;
    const { title, body } = post;

    return (
        <section>
        <h1>Post</h1>
        <article>
            <h2>{title}</h2>
            <p>{body}</p>
        </article>
        </section>
    );
}

export default Post;