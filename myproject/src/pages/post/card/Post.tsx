import  {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import {Card} from "antd";
import CommentsBlock from "../../../components/CommentsBlock.tsx";
import ModalEditPost from "../../../components/ModalEditPost.tsx";

export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const Post = () => {
    const postId = useLocation().pathname.split('/').pop();

    const [post, setPost] = useState<IPost | null | undefined>();
    const [notFound, setNotFound] = useState<boolean>(false);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(function (response) {
                console.log(`GET https://jsonplaceholder.typicode.com/posts/${postId}  -  ${response.status} ${response.statusText}`);
                setPost(response.data);
            })
            .catch(response => {
                console.log(`GET https://jsonplaceholder.typicode.com/posts/${postId}  -  ${response}`);
                setPost(null)
                setNotFound(true);
            });
    }, [postId]);

    return (
        <Card title={<h1>{post?.title}</h1>}
              extra={notFound ? <></> : <ModalEditPost post={post} setPost={setPost}/>}
              loading={post == undefined && post != null}
        >

            {notFound ? (
                <Card title={<h1>Post was not found!</h1>}/>
                ) : (
                    <div>
                        <h3>{post?.body}</h3>
                        <CommentsBlock postId={postId} />
                    </div>
                )}
        </Card>
    );
};

export default Post;