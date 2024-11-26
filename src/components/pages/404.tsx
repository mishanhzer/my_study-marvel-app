import React from "react";
import ErrorMessage from "../error/ErrorMessage";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

interface test {
    useNavigate: () => void
}

const Page404 = () => {
    const navigate:NavigateFunction = useNavigate(); 
    return (
        <div>
            <ErrorMessage /> 
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px'}}>Страницы не существует</p>  
            <Link 
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px', 'marginTop': '35px', 'textDecoration': 'underline'}} 
                to={navigate(-1)}>Назад</Link> 
        </div>
    )
}

export default Page404;