import React from 'react';
import { useState} from 'react';
import {Link} from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';

import useMarvelServiceTS from '../services/MarvelService.ts';
import ErrorMessage from '../error/ErrorMessage.tsx';

import './charForm.scss';

interface Comics {
    resourceURI?: string
    name?: string
}

interface CharFormDataTypes {
    comics: Comics[]
    description: string
    homepage: string
    id?: number | string
    name: string
    thumbnail: string
    wiki: string
}

const setContent = (process: string, char: CharFormDataTypes[]) => {
    switch(process) {
        case 'waiting':
            return false; 
        case 'loading': 
            return false; 
        case 'confirmed': 
            return char.length > 0 ? 
            <div className='char__search-wrapper'>
                <div className='char__search-success'>The is Visit {char[0].name} page?</div> 
                <Link to={`/characters/${char[0].id}`}> 
                    <button 
                        type='submit'
                        className="button button__main">
                        <div className="inner">TO PAGE</div>
                    </button>
                </Link>
            </div> : 
            <div className='char__search-error'>
                The character was not found. Check the name and try again
            </div>
        case 'error':
            return <div className='char__search-critical-error'><ErrorMessage /></div>;
        default:
            throw new Error('Unexpected process state')
    }
}

const CharForm = () => {
    const [char, setChar] = useState<CharFormDataTypes[]>([]); 
    const {getCharacterByName, clearError, process, setProcess} = useMarvelServiceTS(); 

    const onCharLoaded = (char: CharFormDataTypes[])  => {
        setChar(char);
    }

    const updateChar = (name: string) => { 
        clearError();
        getCharacterByName(name) 
            .then(onCharLoaded) 
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className='char__search-form'> 
            <Formik
                initialValues = {{ 
                    charName: '',
                }}
                validationSchema = {
                    Yup.object({
                        charName: Yup.string() 
                                .required('This field is required') 
                    })
                }
                onSubmit = {({charName}) => updateChar(charName)} 
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
                            disabled={process === 'loading' ? true : false} 
                            > 
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                    <FormikErrorMessage className='char__search-error' name='charName' component='div'/> 
                </Form>
            </Formik>
            {setContent(process, char)} 
        </div>
    )
}

export default CharForm;