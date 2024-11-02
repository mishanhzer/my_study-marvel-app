import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

// Делаем один компонент с логикой для двух компонентов (SingleComicPage и SingleCharPage)
const SinglePage = ({Component, dataType}) => {
    const {id} = useParams(); // берем айдишки

    const [data, setData] = useState(null); // устанавлваем локальный стейт
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService(); // берем из сервиса сразу же два метода

    useEffect(() => {
        updateData()
    }, [id])

    // Модернизируем метод, добавляем проверку на строку и если совпадает, то вызываем нужный нам метод
    const updateData = () => {
        clearError();

        switch(dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null; // указываем Component (потому что мы не знаем, какой компонет будет рендериться) - мы его передаем через проп компонента SinglePage

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;
