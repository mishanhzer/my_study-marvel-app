import {Helmet} from "react-helmet";
import './singleCharPage.scss';

const SingleCharPage = ({data}) => { 
    console.log(data)
    const {name, description, thumbnail} = data;
    
    return (
        <div className="single-char">
            <Helmet> 
                <meta 
                    name="description"
                    content={`${name} it is char`} 
                />
                <title>{name}</title> 
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;