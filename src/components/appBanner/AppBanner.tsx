// Чтобы импортировать картинки в TS необходимо в папке src создать файл с расширением .d.ts и передать туда declare modile "*.jpg"

import React from 'react';
import './appBanner.scss';

import avengers from '../../resources/img/Avengers.png'; 
import avengersLogo from '../../resources/img/Avengers_logo.png';


const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={avengers} alt="Avengers"/>
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="Avengers logo"/>
        </div>
    )
}

export default AppBanner;