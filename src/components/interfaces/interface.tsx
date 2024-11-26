// Интерфейс персонажа
interface GeneralObjWithResource {
    resourceURI: string
    name: string
}

interface GeneralObj {
    available: number
    collectionURI: string
    items: GeneralObjWithResource[] | any[]
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

export interface Char { // интерфейс для типизации данных еще на входе в MarvelService до трансформации данных
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

export interface TransformChar { // интерфейс типизации данных после трансормации
    comics: GeneralObjWithResource
    description: string
    homepage: string
    id: number
    name: string
    thumbnail: string
    wiki: string
}

export interface CharPage {
    data: TransformChar
}


// Интерфейс комиксов
interface Prices {
    type: string
    price: number
}

interface TextObject {
    type: string
    language: string
    text: string
}

export interface Comics { // интерфейс для типизации данных еще на входе в MarvelService до трансформации данных
    id: number 
    title: string
    description: string
    pageCount: string
    thumbnail: Thumbnail 
    prices: Prices[] 
    textObjects: TextObject 
    language: string
}

export interface TransformComics { // интерфейс типизации данных после трансформации
    description: string
    id: number
    language: string
    pageCount: string
    price: string | number
    thumbnail: string
    title: string
}

export interface ComicPage {
    data: TransformComics
}


// iterface for CharForm and CharInfo
export interface IResponse {
    comics: GeneralObjWithResource[]
    description: string
    homepage: string
    id?: number | string
    name: string
    thumbnail: string
    wiki: string
}



    // interface Comics {
    //     characters: GeneralObj
    //     collectedIssues: any[]
    //     collections: any[]
    //     creators: GeneralObj
    //     dates: Dates[]
    //     description: string
    //     digitalId: number
    //     ean: string
    //     events: GeneralObj
    //     format: string
    //     id: number
    //     images: Images[]
    //     isbn: string
    //     issn: string
    //     issueNumber: number
    //     modified: string
    //     pageCount: string
    //     prices: Prices[]
    //     resourceURI: string
    //     series: Series
    //     stories: GeneralObj
    //     textObjects: TextObject
    //     thumbnail: Thumbnail
    //     title: string
    //     upc: string
    //     urls: Urls[]
    //     variantDescription: string
    //     variants: any[]
    // }








