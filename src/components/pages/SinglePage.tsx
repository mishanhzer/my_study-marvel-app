import React from 'react';
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

import useMarvelService from '../services/MarvelService';
import useMarvelService1 from '../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

import setContent from '../../utils/setContent';

interface test {
    Component: React.FC | React.ReactNode
    dataType: string
}

const SinglePage = ({Component, dataType}: test) => {
    const {id} = useParams(); 
    const [data, setData] = useState(null); 

    const {getComic} = useMarvelService1(); 
    const {getCharacter} = useMarvelService1();

    const {clearError, process, setProcess} = useMarvelService()

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

    const onDataLoaded = (data: any) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;
