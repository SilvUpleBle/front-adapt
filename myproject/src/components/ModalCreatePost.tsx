import React, {useState} from 'react';
import {Button, Form, FormInstance, Input, Modal} from "antd";
import axios from "axios";

type IPost = {
    title?: string;
    body?: string;
}



const ModalCreatePost = (props: {data:{id:number, userId:number, title: string, body: string}[], setData: any}) => {

    const {data, setData} = props;
    const getMaxIdFromData = () => {
        if (data?.length > 0) {
            return data?.reduce((max: number, obj: { id: number; }) => (obj.id > max ? obj.id : max), -Infinity);
        }
        return -1;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const newId = getMaxIdFromData() + 1;
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

        axios.put(`https://jsonplaceholder.typicode.com/posts/${newId}`,
            [{
                id: newId,
                userId: 0,
                title: formRef.current?.getFieldValue('title'),
                body: formRef.current?.getFieldValue('body')
            }])
            .then(response => console.log(`PUT https://jsonplaceholder.typicode.com/posts/${newId}  -  ${response.status} ${response.statusText}`))
            .catch(response => console.log(`PUT https://jsonplaceholder.typicode.com/posts/${newId}  -  ${response}`));

        const newPost = {
            id: newId,
            userId: 0,
            title: formRef.current?.getFieldValue('title'),
            body: formRef.current?.getFieldValue('body'),
        };
        setData([...data, newPost]);
    }



    const formRef = React.createRef<FormInstance<IPost>>();

    return (
        <div style={{margin: 10}}>
            <Button ghost={true} type="primary" onClick={showModal}>
                Add post
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
                        rules={[
                            {
                                required: true, message: "Введите название поста!"
                            }
                        ]}
                    >
                        <Input.TextArea placeholder="Введите название поста!"/>
                    </Form.Item>
                    <Form.Item
                        name="body"
                        label="Тело"
                        rules={[
                            {
                                required: true, message: "Введите тело поста!"
                            }
                        ]}
                    >
                        <Input.TextArea placeholder="Введите тело поста!"/>
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

export default ModalCreatePost;