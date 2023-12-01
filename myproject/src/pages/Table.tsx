import React, {useEffect, useMemo, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import axios from "axios";

class Person {
    name: string;
    age: number;
    address: string;
    constructor(name: string, age: number, address: string) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
}

const Table = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //simple recommended way to define a column
                header: 'Id',
                id: 'id',
                Header: () => <i>Id</i>, //optional custom header render
            },
            {
                accessorKey: 'userId', //simple recommended way to define a column
                header: 'UserId',
                id: 'userId',
                Header: () => <i>UserId</i>, //optional custom header render
            },
            {
                accessorKey: 'title',
                header: 'Title',
                id: 'title',
                Header: () => <i>Title</i>, //optional custom header render
            },
            {
                accessorKey: 'body',
                header: 'Body',
                id: 'body',
                Header: () => <i>Body</i>, //optional custom header render
            }
            ], [],
    );

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
            console.log('update!');
            setData(response.data);
        });
    });

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
        />
    );
};

export default Table;