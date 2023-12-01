import './App.css'
import {Layout} from "antd";
import Table from "./pages/Table.tsx";
import Post from "./pages/Post.tsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import Breadcrumbs from "./components/Breadcrumbs.tsx";

function App() {
    return (
        <BrowserRouter>
            <Layout style={{minHeight: '100vh', boxSizing: 'border-box'}}>
                <Header style={{background: 'grey', display: 'flex', alignItems: 'center' }}>
                    <h1>HEADER</h1>
                </Header>
                <Content style={{ padding: '0 30px', background: 'darkgrey' }}>
                    <div>
                        <ul className={'myList'}>
                            <li><a href={'/'}>Home</a></li>
                            <li><a href={'/post'}>Posts</a></li>
                        </ul>
                    </div>
                    <div>
                        <Breadcrumbs/>
                        <Routes>
                            <Route path={'/main'} Component={App}/>
                            <Route path={'/post'} Component={Table}/>
                            {/*<Route path={'/post/'} Component={Post}/>*/}
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </BrowserRouter>
    )
}

export default App
