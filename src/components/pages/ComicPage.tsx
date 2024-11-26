import React from "react";
import {Helmet} from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from '../appBanner/AppBanner';
import { Outlet, useOutlet } from "react-router-dom";

const ComicsPage = () => {
    const outlet = useOutlet();
    return (
        <>
            <Helmet> 
                <meta 
                    name="description"
                    content="Page with list of our comics" 
                />
                <title>Comics page</title> 
            </Helmet>
            {outlet ? <Outlet /> : <><AppBanner /> <ComicsList/></>}  
        </>
    )
}

export default ComicsPage;
