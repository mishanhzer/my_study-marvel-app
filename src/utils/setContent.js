import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/ErrorMessage";

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner/>;
        case 'confirmed': // PS: проблема в том, что когда произойдет 'confirmed', то данные еще не загрузятся на странице, а компонент мы отрендерим - асинхронная операция (фикс - экспортируем из хука функцию setProcess)
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent;