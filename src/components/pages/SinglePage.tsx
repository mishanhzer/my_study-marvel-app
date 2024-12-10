import React, {FC} from 'react';
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

import useMarvelServiceTS from '../services/MarvelService.ts';
import AppBanner from '../appBanner/AppBanner.tsx';
import Skeleton from '../skeleton/Skeleton.tsx';
import Spinner from '../spinner/Spinner.tsx';
import ErrorMessage from '../error/ErrorMessage.tsx';

import { useStoreSinglePage } from '../store/store.ts';


interface TypeForSinglePages {
    description: string
    language?: string
    pageCount?: string
    price?: string
    thumbnail: string
    title?: string
    name?: string
}

interface ForSinglePage {
    Component: FC<TypeForSinglePages>
    dataType: string
}

function setContent(process: string, Component: FC<TypeForSinglePages>, data: TypeForSinglePages) {
    switch(process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner/>;
        case 'confirmed': 
            return <Component {...data} />; 
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state')
    }
}

const SinglePage = ({Component, dataType}: ForSinglePage) => {
    const {id} = useParams(); 
    const data = useStoreSinglePage(state => state.data)
    const setData = useStoreSinglePage(state => state.setData)

    const {getComic} = useMarvelServiceTS(); 
    const {getCharacter} = useMarvelServiceTS();

    const {clearError, process, setProcess} = useMarvelServiceTS()

    useEffect(() => {
        updateData()
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    const updateData = () => {
        clearError();

        switch(dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        }
    }

    const onDataLoaded = (data: TypeForSinglePages) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {data === null ? <Spinner /> : setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;
