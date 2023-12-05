import  {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import {Skeleton} from "antd";
import CommentsBlock from "../components/CommentsBlock.tsx";
import ModalEditPost from "../components/ModalEditPost.tsx";

const Post = () => {
    const postId = useLocation().pathname.split('/').pop();

    const [post, setPost] = useState<{
        id: number,
        userId: number,
        title: string,
        body: string
    } | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(function (response) {
                console.log(`GET https://jsonplaceholder.typicode.com/posts/${postId}  -  ${response.status} ${response.statusText}`);
                setPost(response.data);
            })
            .catch(response => {
                console.log(`GET https://jsonplaceholder.typicode.com/posts/${postId}  -  ${response}`);
                setNotFound(true);
            });
    }, [postId]);

    return (
        <div>
            {
                post == undefined && post != null ? (
                        <Skeleton active={true}/>
                    ) : (notFound ? (
                        <h1>Пост не найден</h1>
                ) : (
                    <>
                        <ModalEditPost post={post} setPost={setPost}/>
                        <h1>{post?.title}</h1>
                        <h3>{post?.body}</h3>
                        <CommentsBlock postId={postId} />
                    </>))
            }
        </div>
    );
};

export default Post;