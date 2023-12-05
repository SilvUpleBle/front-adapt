import React from 'react';
import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";

const MyNavBar = (props: any) => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Menu
                theme="dark"
                mode="horizontal"
                selectable={false}
                items={props.items.map((item, index:number) => {
                    const key = index + 1;
                    return {
                        key,
                        label: <Link to={item.path}>{item.name}</Link>,
                    };
                })}
            />
        </Header>
    );
};

export default MyNavBar;