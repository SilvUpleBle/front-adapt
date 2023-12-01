import React from 'react';
import {useLocation} from "react-router-dom";
import Link from "antd/es/typography/Link";
import {Breadcrumb} from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";

const Breadcrumbs = () => {
    let location = useLocation();
    const breadCrumbView = () => {
        const {pathname} = location;
        const names = pathname.split('/').filter((item) => item);

        return (
            <div>
                <Breadcrumb>
                    {names.length > 0 ? (
                        <BreadcrumbItem>
                              <Link href={'/'}>main</Link>
                        </BreadcrumbItem>
                    ) : (
                        <BreadcrumbItem>
                              main
                        </BreadcrumbItem>
                    )}
                    {names.map((name, index) => {
                        const routeTo = `/${name.slice(0, index + 1) + '/'}`;
                        return (index === names.length - 1) ? (
                            <BreadcrumbItem>
                                {name}
                            </BreadcrumbItem>
                        ) : (
                            <BreadcrumbItem>
                                <Link href={`${routeTo}`}>{name}</Link>
                            </BreadcrumbItem>
                        )
                    })

                    }
                </Breadcrumb>
            </div>
        );
    }
    return breadCrumbView();
};

export default Breadcrumbs;