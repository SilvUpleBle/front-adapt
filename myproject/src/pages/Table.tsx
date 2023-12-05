import {useEffect, useMemo, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {Button} from "antd";
import {Link} from "react-router-dom";
import axios from "axios";
import ModalCreatePost from "../components/ModalCreatePost.tsx";

const Table = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                id: 'id',
                Header: () => <i>Id</i>,
            },
            {
                accessorKey: 'userId',
                header: 'UserId',
                id: 'userId',
                Header: () => <i>UserId</i>,
            },
            {
                accessorKey: 'title',
                header: 'Title',
                id: 'title',
                Header: () => <i>Title</i>,
            },
            {
                accessorKey: 'body',
                header: 'Body',
                id: 'body',
                Header: () => <i>Body</i>,
            }
        ], [],
    );

    const [data, setData] = useState<{id:number, userId:number, title: string, body: string}[]>([]);
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
            <ModalCreatePost data={data} setData={setData}/>
            <MaterialReactTable
            columns={columns}
            data={data}
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
                                .then(response => console.log(`DELETE https://jsonplaceholder.typicode.com/posts/${row.original.id}  -  ${response.status} ${response.statusText}`))
                                .catch(response => console.log(`DELETE https://jsonplaceholder.typicode.com/posts/${row.original.id}  -  ${response}`));
                        }}>
                        Remove
                    </Button>
                </div>
            }

            // state={{
            //     isLoading: true
            // }}
            // muiTableBodyRowProps={{
            //     onClick: (row) => {
            //         alert(`row ${row.}`);
            //     }
            // }}
            />
        </div>
    );
};

export default Table;