// Импортируем нужные нам сущности
import { useState} from 'react';
import {Link} from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage as FormikErrorMessage} from 'formik'; // переименовываем ErrorMessage, чтобы не было конфликта названия компонентов
import * as Yup from 'yup';

import useMarvelService from '../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';

import './charForm.scss';

// Делаем аналогично CharInfo
const CharForm = () => {
    const [char, setChar] = useState(null); // тут будем хранить массив с данными персонажа
    const {loading, error, getCharacterByName, clearError} = useMarvelService(); // вытаскиваем метод getCharacterByName из MarvelService

    const onCharLoaded = (char) => {
        setChar(char);
    }

    // Метод обновления персонажа
    const updateChar = (name) => { // name, будет браться из onSubmit (строка, которую мы пишем в поле)
        clearError();
        getCharacterByName(name) // Если name (строка в инпуте) не будет совпадать с именем персонажа, то после запроса в data.results будет пустой массив (если совпадет, то в data.results в массиве будет лежать данные о нашем персонаже - один обьект с данными в массиве)
            .then(onCharLoaded) // после запроса в метод onCharLoaded подставляется наш массив и устанавливается в стейт
    }

    const errorForm = error ? <div className='char__search-critical-error'><ErrorMessage /></div> : null; // если у нас ошибка, то отрендери компонент ошибки
    const successfulForm = !char ? null : char.length > 0 ? // если у нас нет массива в char, то отрендери null, если у нас данные пресонажа в массиве есть, то отрендери структуру
        <div className='char__search-wrapper'>
            <div className='char__search-success'>The is Visit {char[0].name} page?</div> {/* Подставялем имя персонажа */}
            <Link to={`/characters/${char[0].id}`}> {/* создаем ссылку, которая будет создавать адрес и подставлять id персонажа */}
                <button 
                    type='submit'
                    className="button button__main">
                    <div className="inner">TO PAGE</div>
                </button>
            </Link>
        </div> : /* если массив пустой, то отрендери строчку, что персонаж не найден */
        <div className='char__search-error'>
            The character was not found. Check the name and try again
        </div> 

    return (
        <div className='char__search-form'> {/* Необходимо обернуть Formik в div, потому что помимо Formik нам необходимо зарендерить еще структуры (правило JSX) */}
            <Formik
                initialValues = {{ 
                    charName: '',
                }}
                validationSchema = {
                    Yup.object({
                        charName: Yup.string() // Валидиация: что это строка, и если поле не заполнено, то выведи сообщение This field is required
                                .required('This field is required') 
                    })
                }
                onSubmit = {({charName}) => updateChar(charName)} // Подставляем строчку из инпута в метод updateChar (деструктуризируем обьект values)
        >
                <Form 
                    action="">
                    <label htmlFor='charName' className='char__search-label'>Or find a character by name:</label>
                    <div className='char__search-wrapper'>
                        <Field 
                            className='char__search-input' 
                            id='charName'
                            name='charName' 
                            type="text" 
                            placeholder="Enter name"
                            />
                        <button 
                            type='submit'
                            className="button button__main"
                            disabled={loading} // Добавляем атрибут disabled для кнопки (свойства кнопок находятся в папке style)
                            > 
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                    <FormikErrorMessage className='char__search-error' name='charName' component='div'/> 
                </Form>
            </Formik>
     {successfulForm} {/* Подставляем структуры для рендера */}
     {errorForm}
        </div>
    )
}

export default CharForm;