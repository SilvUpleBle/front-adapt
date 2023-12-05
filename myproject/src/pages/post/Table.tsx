import {useEffect, useMemo, useState} from 'react';
import {MaterialReactTable, MRT_ColumnDef} from 'material-react-table';
import {Button, notification, Spin} from "antd";
import {Link} from "react-router-dom";
import axios from "axios";
import ModalCreatePost from "../../components/ModalCreatePost.tsx";
import {IPost} from "./card/Post.tsx";

const Table = () => {
    const columns = useMemo<MRT_ColumnDef<IPost>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                id: 'id',
                filterFn: 'includesString',
                Header: () => <i>Id</i>,
            },
            {
                accessorKey: 'userId',
                header: 'UserId',
                id: 'userId',
                filterFn: 'includesString',
                Header: () => <i>UserId</i>,
            },
            {
                accessorKey: 'title',
                header: 'Title',
                id: 'title',
                filterFn: 'includesString',
                Header: () => <i>Title</i>,
            },
            {
                accessorKey: 'body',
                header: 'Body',
                id: 'body',
                filterFn: 'includesString',
                Header: () => <i>Body</i>,
            }
        ], [],
    );

    const [data, setData] = useState<{id:number, userId:number, title: string, body: string}[]>();
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(function (response) {
                console.log(`GET https://jsonplaceholder.typicode.com/posts  -  ${response.status} ${response.statusText}`);
                setData(response.data);
            })
            .catch(response => console.log(`GET https://jsonplaceholder.typicode.com/posts  - ${response}`));
    },[]);

    return (
        <div>
            {data == undefined ?
                <Spin tip={'Loading...'} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} size={'large'}>
                    <div className="content" />
                </Spin>
                :
                <div>
                    <ModalCreatePost data={data} setData={setData}/>
                    <MaterialReactTable
                        columns={columns}
                        data={data}
                        enableGlobalFilter
                        globalFilterFn={'includesString'}
                        enableEditing
                        enableRowActions
                        renderRowActions={({row}) =>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                gap: '0.5rem'
                            }}>
                                <Link to={`/post/${row.original.id}`}>
                                    <Button type="primary">
                                        View
                                    </Button>
                                </Link>
                                <Button type="primary" danger
                                        onClick={() => {
                                            axios.delete(`https://jsonplaceholder.typicode.com/posts/${row.original.id}`)
                                                .then(response => {
                                                    console.log(`DELETE https://jsonplaceholder.typicode.com/posts/${row.original.id}  -  ${response.status} ${response.statusText}`);
                                                    notification.success({message: 'Post successfully deleted!'});
                                                })
                                                .catch(response => {
                                                    console.log(`DELETE https://jsonplaceholder.typicode.com/posts/${row.original.id}  -  ${response}`);
                                                    notification.error({message: 'Post successfully deleted!'});
                                                });
                                        }}>
                                    Remove
                                </Button>
                            </div>
                        }
                    />
                </div>
            }

        </div>
    );
};

export default Table;