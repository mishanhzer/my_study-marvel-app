import { useState, useCallback } from "react";

const useHttp = () => {
    const [process, setProcess] = useState('waiting'); 

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setProcess('loading'); 
        try {
        const res = await fetch(url, {method, body, headers});

        if (!res.ok) { 
            throw new Error(`Could not fetch ${url}, status: ${res.state}`);
        }

        const data = await res.json();

        return data;
        } catch(e) {
            setProcess('error'); 
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setProcess('loading'); // после очищения ошибки, устанавилваем стейт FSM в процесс загрузки
    });
     
    return {request, clearError, process, setProcess} // возвращаем стейт FSM - process и установелния стейта FSM - setProcess
}

export default useHttp;
