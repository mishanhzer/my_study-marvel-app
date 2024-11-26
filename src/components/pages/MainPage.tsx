import React from "react";
import { useState } from "react"; 
import {Helmet} from "react-helmet"; // импортируем Helmet

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";  
import CharForm from "../charForm/CharForm";

import decoration from '../../resources/img/vision.png'; 

const MainPage = () => { 
    const [selectedChar, setChar] = useState<null | number>(null); 

    const onCharSelected = (id: null | number) => {
       setChar(id);
    }

    return (
        <>
        <Helmet> 
            <meta 
                name="description"
                content="Marvel information portal"
            />
            <title>Marvel information</title> 
        </Helmet>
            <ErrorBoundary> 
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} /> 
                </ErrorBoundary>
                <div> 
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;