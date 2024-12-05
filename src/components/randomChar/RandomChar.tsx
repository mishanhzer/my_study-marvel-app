// Такой же баг как и в CharInfo
import React from 'react';
import { useEffect, useState } from 'react';
import useMarvelService from '../services/MarvelService';
import useMarvelServiceTS from '../services/MarvelService';

import setContent from '../../utils/setContent';

import './randomChar.scss';

import '../../custom'
import mjolnir from '../../resources/img/mjolnir.png';

interface Comics {
    resourceURI?: string
    name?: string
}

interface RandomCharDataTypes {
    comics: Comics[]
    description?: string
    homepage?: string
    id?: number | string
    name?: string
    thumbnail?: string
    wiki?: string
}

// Переделываем компонент под принцип FSM аналогично другим
const RandomChar = () => {
    const [char, setChar] = useState<RandomCharDataTypes>();
    const {getCharacter, clearError, process, setProcess} = useMarvelServiceTS();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000); 

        return () => { 
            clearInterval(timerId)
        }

    }, [])

    const onCharLoaded = (char: RandomCharDataTypes) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
            getCharacter(id)
                .then(onCharLoaded)
                .then(() => setProcess('confirmed'))
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)} 
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({...data}: RandomCharDataTypes) => { 
    const {name, description, thumbnail, homepage, wiki} = data;

    const imgNotAvailable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let clazz = '';
    if (thumbnail === imgNotAvailable) {
        clazz = 'randomchar__img_not-available'
    } else {
        clazz = 'randomchar__img'
    }
    
    return (
    <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className={clazz}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;





