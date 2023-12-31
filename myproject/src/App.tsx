import './App.css'
import {Layout} from "antd";
import Table from "./pages/post/Table.tsx";
import Post from "./pages/post/card/Post.tsx";
import {Routes, Route} from 'react-router-dom';
import {Content} from "antd/es/layout/layout";
import Breadcrumbs from "./components/Breadcrumbs.tsx";
import MyNavBar from "./components/MyNavBar.tsx";
import Main from "./pages/home/Main.tsx";
import NotFound from "./pages/errors/NotFound.tsx";

function App() {

    return (
        <Layout className="layout">
            <MyNavBar items={[
                {
                    path: '/',
                    name: 'Home'
                },
                {
                    path: '/post',
                    name: 'Posts'
                }]}/>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumbs/>
                <Routes>
                    <Route path={'/'} Component={Main}/>
                    <Route path={'/post'} Component={Table}/>
                    <Route path={'/post/*'} Component={Post}/>
                    <Route path={'*'} Component={NotFound}/>
                </Routes>
            </Content>
    </Layout>
    )
}

export default App
