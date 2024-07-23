// Если наше приложение взаимодействует с сервером, то отделяем сетевые компоненты от основного кода (трансформацию данных тоже добавляем в серивисы)

class MarvelService { 
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=ef4b5738e027c92c944977fe97f44c1e'

    getResource = async (url) => { 
        let res = await fetch(url); 

        if (!res.ok) { 
            throw new Error(`Could not fetch ${url}, status: ${res.state}`);
        }

        return await res.json(); 
    }

    getAllCharacters = async () => { 
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=205&${this._apiKey}`); 
        return res.data.results.map(this._transformCharacter); 
    }

    getCharacter = async (id) => { 
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`); 
        return this._transformCharacter(res.data.results[0]); 
    }

    _transformCharacter = (char) => { 
        return { 
            name: char.name, 
            description: char.description, 
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`, 
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url 
        }
    }
}

export default MarvelService;