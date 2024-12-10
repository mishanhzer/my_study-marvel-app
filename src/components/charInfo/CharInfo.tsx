import React, { CSSProperties } from 'react';
import { useState, useEffect } from 'react';

import useMarvelServiceTS from '../services/MarvelService.ts';
import setContent from '../../utils/setContent.tsx'; 

import './charInfo.scss';

interface ICharInfoProps {
    charId?: number | string
}

interface Comics {
    resourceURI: string
    name: string
}

interface CharInfoDataTypes {
    comics: Comics[]
    description: string
    homepage: string
    id?: number | string
    name: string
    thumbnail: string
    wiki: string
} 

const CharInfo = (props: ICharInfoProps) => {
    const [char, setChar] = useState<CharInfoDataTypes | null>(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelServiceTS(); 

    useEffect(() => {
        updateChar()
    }, [props.charId]) // eslint-disable-line react-hooks/exhaustive-deps

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char: CharInfoDataTypes | null) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {char === null ? null : setContent<CharInfoDataTypes>(process, View, char)} {/* чтобы избежать баг с null или undefined, необходимо юзать условный рендеринг */}
        </div>
    )
}

const View = ({data}: {data: CharInfoDataTypes}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let imgStyle:CSSProperties = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item: Comics, i: number) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }                
            </ul>
        </>
    )
}

export default CharInfo;