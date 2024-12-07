import React, {FC, useState, useEffect, useRef, useMemo} from 'react'; // FC (не рекомендуется юзать)
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import useUsersStore from '../../state_managment/zustand'; // импортируем store

import './charList.scss';

// Основные правила типизации react, хуки и функциональные компоненты - это функции, пропсы - это обьекты

// Добавлем типизацию аргументам (какую типизацию добавить в Component?)

const setContent = (process, Component, newItemLoading) => {
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

// type TypeCharListProps = { // добавляем типизацию для пропсов CharList - пропсы это обьекты и типизируем их как обьекты
//     onCharSelected: Function
// }


const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(205);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    const users = useUsersStore(state => state.users); // используем стейт из стора
    const addUser = useUsersStore(state => state.addUser)

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
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
                        props.onCharSelected(item.id); // вызов onCharSelected (метод родительского компонента), будет изменять стейт - перерендиринг компонента CharList и перерендеринг компонента MainPage
                        focusOnItem(i); // этот метод не будет перендеривать страницу, он меняет только классы
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
            {elements} {/* помещаем на страницу мемоизированный список персонажей */}
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

// PS: чтобы отследить баг, можно посмотреть в консоли разработчика, как ведет себя класс активности при клике (в данном примере фокус у нас будет перескакивать на кнопку, потому что список перендеривается заново)
// Чтобы отслеживать баги, нужно понимать, как работают компоненты изнутри 


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;




