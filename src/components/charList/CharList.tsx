import React, {ReactNode, FC, useState, useEffect, useRef, useMemo, CSSProperties} from 'react';

import useMarvelServiceTS from '../services/MarvelService';
import Spinner from '../spinner/Spinner.tsx';
import ErrorMessage from '../error/ErrorMessage.tsx';

import './charList.scss';

interface Comics {
    resourceURI?: string
    name?: string
}

interface CharListDataTypes {
    comics: Comics[]
    description: string
    homepage: string
    id?: number | string
    name: string
    thumbnail: string
    wiki: string
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

type TypeCharListProps = { // добавляем типизацию для пропсов CharList - пропсы это обьекты и типизируем их как обьекты
    onCharSelected: Function
}

const CharList = (props: TypeCharListProps) => {
    const [charList, setCharList] = useState<CharListDataTypes[]>([]);
    const [newItemLoading, setNewItemLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(205);
    const [charEnded, setCharEnded] = useState<boolean>(false);

    const {getAllCharacters, process, setProcess} = useMarvelServiceTS();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset: number, initial?: boolean) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList: CharListDataTypes[]) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    // Создаем интерфейс на типизацию current
    interface IRefs {
        current: HTMLLIElement[]
    }

    // Создаем интерфейс на типизацию current (дополнительно, чтобы типизировать, что еще может туда попсать обьект)
    interface IRefsObj {
        current: IRefs
    }

    const itemRefs:IRefs | IRefsObj = useRef([]);

    // Типизация рефов
    const focusOnItem = (id: number) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr: CharListDataTypes[]) {
        const items =  arr.map((item: CharListDataTypes, i: number) => {
            let imgStyle:CSSProperties = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id); 
                        focusOnItem(i); 
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading)
    }, [process]) 
    
    return (
        <div className="char__list">
            {elements} 
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;




