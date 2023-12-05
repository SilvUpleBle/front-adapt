import {useLocation, Link} from "react-router-dom";
import {Breadcrumb} from "antd";

const Breadcrumbs = () => {
    let location = useLocation();
    const breadCrumbView = () => {
        const {pathname} = location;
        const names = pathname.split('/').filter((item) => item);

        const items = [];

        if (names.length > 0) {
            items.push({
                key: items.length,
                title: <Link key={items.length} to={'/'}>main</Link>
            })
        }

        names.map((name, index) => {
            const routeTo = `/${name.slice(0, name.length) + '/'}`;
            (index === names.length - 1) ? (
                items.push({
                    key: items.length,
                    title: `${name}`
                })
            ) : (
                items.push({
                    key: items.length,
                    title: <Link key={items.length} to={routeTo}>{name}</Link>
                })
        )})

        return (
            <div>
                <Breadcrumb items={items}/>
            </div>
        );
    }
    return breadCrumbView();
};

export default Breadcrumbs;