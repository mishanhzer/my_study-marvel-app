import useHttp from "../../hooks/http.hook.ts";

// Char
interface GeneralObjWithResource {
    resourceURI: string
    name: string
}

interface GeneralObj {
    available: number
    collectionURI: string
    items: GeneralObjWithResource[]
    returned: number
}

interface Thumbnail {
    extension: string
    path: string
}

interface Urls {
    type: string
    url: string
}

interface Char { 
    comics: GeneralObj
    description: string
    events: GeneralObj
    id?: number | string
    modified: string
    name: string
    resourceURI: string
    series: GeneralObj
    stories: GeneralObj
    thumbnail: Thumbnail
    urls: Urls[]
}

// Comics
interface Prices {
    type: string
    price: number
}

interface TextObject {
    type: string
    language: string
    text: string
}

interface Comics {
    id: number 
    title: string
    description: string
    pageCount: string
    thumbnail: Thumbnail 
    prices: Prices[] 
    textObjects: TextObject 
    language: string
}

const useMarvelServiceTS = () => {
	const {request, clearError, process, setProcess} = useHttp(); 

	const _apiBase: string = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey: string = 'apikey=ef4b5738e027c92c944977fe97f44c1e';
	const _baseOffset: number = 205;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id?: number | string)  => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

    const getCharacterByName = async (name: null | string) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

	const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id?: number | string) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const _transformCharacter = (char: Char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: "There is no description for this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _transformComics = (comics: Comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

	return {
		clearError,
        process, 
        setProcess, 
		getAllCharacters,
		getCharacter,
        getCharacterByName,
		getAllComics,
		getComic,
	};
};

export default useMarvelServiceTS;