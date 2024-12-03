import React from "react";
import {Helmet} from "react-helmet";
import './singleCharPage.scss';

interface TypeForSinglePages  {
    description: string
    language?: string
    pageCount?: string
    price?: string
    thumbnail: string
    title?: string
    name?: string
}

const SingleCharPage = ({...data}: TypeForSinglePages ) => { 
    const {name, description, thumbnail} = data;
    
    return (
        <div className="single-char">
            <Helmet> 
                <meta 
                    name="description"
                    content={`${name} it is char`} 
                />
                <title>{name}</title> 
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;