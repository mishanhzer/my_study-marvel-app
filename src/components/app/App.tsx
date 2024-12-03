// !!! 1. Вопрос по решению тага SingleComicPage и SingleCharPage
import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404.tsx')); 
const MainPage = lazy(() => import('../pages/MainPage.tsx'));
const ComicsPage = lazy(() => import('../pages/ComicsPage.tsx'));
const SinglePage = lazy(() => import('../pages/SinglePage.tsx'));
const SingleComicPage = lazy(() => import('../pages/singleComicLayout/SingleComicPage.tsx'));
const SingleCharPage = lazy(() => import('../pages/singleCharLayout/SingleCharPage.tsx'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />} > 
                        <Routes> 
                            <Route path='/' element={<MainPage /> }/>
                            <Route path='/comics' element={<ComicsPage/>}>
                                <Route path=':id' element={<SinglePage Component={SingleComicPage} dataType='comic'/>} />
                            </Route>        
                            <Route path='/characters'>
                                <Route path=':id' element={<SinglePage Component={SingleCharPage} dataType='character'/>} />
                            </Route>              
                            <Route path='*' element={<Page404 />} /> 
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;

