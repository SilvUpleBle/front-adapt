import {useEffect, useState} from 'react';
import axios from "axios";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";

export interface IComment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const CommentsBlock = (props: {postId: any}) => {
    const {postId} = props;
    const [comments, setComments] = useState<IComment[] | null>(null)
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(function (response) {
                console.log(`GET https://jsonplaceholder.typicode.com/comments?postId=${postId}  -  ${response.status} ${response.statusText}`);
                setComments(response.data)
            })
            .catch(response => {
                console.log(`GET https://jsonplaceholder.typicode.com/comments?postId=${postId}  -  ${response}`);
            });
    }, []);

    return (
        <Card title={<h2 style  ={{marginBottom: -5}}>Комментарии:</h2>} loading={comments == undefined}>
            {comments != undefined && comments?.length > 0 ? (
                    <>
                        {comments?.map((comment, index) => (
                            <Card key={comment.name}
                                  style={{margin: 10}}
                                  bordered={true}>
                                <Meta
                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                    title={
                                        <div>
                                            <p style={{fontWeight: 'bold', marginTop: 0}}>{comment.name}</p>
                                            <p style={{marginTop: -15, color: 'blue'}}>{comment.email}</p>
                                        </div>
                                    }
                                    description={<p style={{marginTop: -10, color: 'black'}}>{comment.body}</p>}
                                />
                            </Card>))}
                    </>
                ) :
                <h3>Комментарии отсутствуют</h3>}
        </Card>
    );
};

export default CommentsBlock;