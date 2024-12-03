import React, {FC} from 'react';
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

import useMarvelService from '../services/MarvelService';
import useMarvelService1 from '../services/MarvelService';
import useMarvelServiceTS from '../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

import setContent from '../../utils/setContent.tsx';

// Может быть два компонента SingleCharPage и SingleComicPage
interface TypeForSinglePages {
    description: string
    language?: string
    pageCount?: string
    price?: string
    thumbnail: string
    title?: string
    name?: string
}

const SinglePage = ({Component, dataType}: {Component: FC<TypeForSinglePages>, dataType: string}) => {
    const {id} = useParams(); 
    const [data, setData] = useState<TypeForSinglePages>(); 

    const {getComic} = useMarvelServiceTS(); 
    const {getCharacter} = useMarvelServiceTS();

    const {clearError, process, setProcess} = useMarvelServiceTS()

    useEffect(() => {
        updateData()
    }, [id])

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

    const onDataLoaded = (data: TypeForSinglePages ) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent<TypeForSinglePages>(process, Component, data)}
        </>
    )
}

export default SinglePage;
