import React, {useState} from 'react';
import {message, Button, Form, FormInstance, Input, Modal, notification} from "antd";
import axios from "axios";
import {IPost} from "../pages/post/card/Post.tsx";

const ModalEditPost = (props: { post: IPost; setPost: any; }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {post, setPost} = props;
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const updatePost = () => {
        setIsModalOpen(false);
        axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,
            [{
                title: formRef.current?.getFieldValue('title'),
                body: formRef.current?.getFieldValue('body')
            }])
            .then(response => {
                console.log(`PUT https://jsonplaceholder.typicode.com/posts/${post.id}  -  ${response.status} ${response.statusText}`);
                notification.success({message: "Text successfully edited!"});
            })
            .catch(response => {
                message.error("asdasd")
                console.log(`PUT https://jsonplaceholder.typicode.com/posts/${post.id}  -  ${response}`);
                notification.error({message: 'Something went wrong!'});
            });

        const newPost = {
            id: post.id,
            userId: post.userId,
            title: formRef.current?.getFieldValue('title'),
            body: formRef.current?.getFieldValue('body'),
        };
        setPost(newPost)
    }

    const formRef = React.createRef<FormInstance<IPost>>();

    return (
        <div style={{margin: '10px 10px -10px 10px'}}>
            <Button ghost={true} type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal title="Edit post data" open={isModalOpen} destroyOnClose={true} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form onFinish={updatePost}
                      ref={formRef}
                      layout="vertical"
                      wrapperCol={{span: 20}}
                      style={{marginTop: "20px"}}
                >
                    <Form.Item
                        name="title"
                        label="Название"
                        initialValue={post?.title}
                        rules={[
                            {
                                required: true, message: "Введите название поста!"
                            }
                        ]}
                    >
                        <Input.TextArea placeholder="Введите название поста!" />
                    </Form.Item>
                    <Form.Item
                        name="body"
                        label="Тело"
                        initialValue={post?.body}
                        rules={[
                            {
                                required: true, message: "Введите тело поста!"
                            }
                        ]}
                    >
                        <Input.TextArea placeholder="Введите тело поста!" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalEditPost;