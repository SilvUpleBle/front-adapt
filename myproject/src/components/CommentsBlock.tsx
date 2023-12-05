import {useEffect, useState} from 'react';
import axios from "axios";
import {Skeleton} from "antd";

const CommentsBlock = (props: {postId: any}) => {
    const {postId} = props;
    const [comments, setComments] = useState<{
        name: string,
        email: string,
        body: string
    }[] | null>(null)
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(function (response) {
                console.log(`GET https://jsonplaceholder.typicode.com/comments?postId=${postId}  -  ${response.status} ${response.statusText}`);
                setComments(response.data)
            })
            .catch(response => {
                console.log(`GET https://jsonplaceholder.typicode.com/comments?postId=${postId}  -  ${response}`);
            });
    }, [props]);

    return (
        comments == undefined ?
            <Skeleton active={true}/> :
            comments?.length > 0 ? (
                <>
                    <h2>Комментарии:</h2>
                    {comments?.map(comment => (
                        <div key={comment.name} style={{margin: 10}}>
                            <p style={{fontWeight: 'bold', marginBottom: -15}}>{comment.name}</p>
                            <p style={{color: 'blue'}}>{comment.email}</p>
                            <p style={{marginTop: -15}}>{comment.body}</p>
                        </div>))}
                </>
                ) :
                <h3>Комментарии отсутствуют</h3>
    );
};

export default CommentsBlock;