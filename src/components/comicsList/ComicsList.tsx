import React, {FC} from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useMarvelServiceTS from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import './comicsList.scss';

interface ComicsListDataTypes { 
    description: string
    id: number
    language: string
    pageCount: string
    price: string | number
    thumbnail: string
    title: string
}

const setContent = (process: string, Component: FC, newItemLoading: boolean) => {
    switch(process) {
        case 'waiting': 
            return <Spinner/>; 
        case 'loading': 
            return newItemLoading ? <Component /> : <Spinner />; 
        case 'confirmed': 
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state')
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState<ComicsListDataTypes[]>([]);
    const [newItemLoading, setnewItemLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [comicsEnded, setComicsEnded] = useState<boolean>(false);

    const {getAllComics, process, setProcess} = useMarvelServiceTS();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset: number, initial?: boolean) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsListLoaded = (newComicsList: ComicsListDataTypes[]) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems (arr: ComicsListDataTypes[]) {
        const items = arr.map((item: ComicsListDataTypes, i: number) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button 
                disabled={newItemLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;