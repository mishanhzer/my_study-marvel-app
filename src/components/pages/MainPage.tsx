import React from "react";
import { useState } from "react"; 
import {Helmet} from "react-helmet"; // импортируем Helmet

import RandomChar from "../randomChar/RandomChar.tsx";
import CharList from "../charList/CharList.tsx";
import CharInfo from "../charInfo/CharInfo.tsx";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.tsx";  
import CharForm from "../charForm/CharForm.tsx";

import decoration from '../../resources/img/vision.png'; 

const MainPage = () => { 
    const [selectedChar, setChar] = useState<number | string>(); 

    const onCharSelected = (id?: number | string) => {
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