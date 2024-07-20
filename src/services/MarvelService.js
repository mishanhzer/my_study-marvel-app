
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

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=205&${this._apiKey}`); 
    }

    getCharacter = (id) => { 
        return this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`); 
    }
}

export default MarvelService;