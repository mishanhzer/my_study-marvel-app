import {create} from 'zustand'
import useMarvelServiceTS from '../services/MarvelService.ts';

// const [char, setChar] = useState<CharFormDataTypes[]>([]); 
// const {getCharacterByName, clearError, process, setProcess} = useMarvelServiceTS(); 

// const onCharLoaded = (char: CharFormDataTypes[])  => {
//     setChar(char);
// }

// const updateChar = (name: string) => { 
//     clearError();
//     getCharacterByName(name) 
//         .then(onCharLoaded) 
//         .then(() => setProcess('confirmed'))
// }

interface Comics {
    resourceURI: string
    name: string
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

interface TypeForSinglePages {
    description: string
    language?: string
    pageCount?: string
    price?: string
    thumbnail: string
    title?: string
    name?: string
}

interface ICharForm {
    char: CharFormDataTypes[]
    setChar: (char: CharFormDataTypes[]) => void
}

interface ICharInfo {
    char: CharFormDataTypes | null
    setChar: (char: CharFormDataTypes) => void
}

interface IMainPage {
    selectedChar: number | string
    setChar: (id?: number | string) => void
}

interface ISinglePage {
    data: TypeForSinglePages | null
    setData: (data: TypeForSinglePages) => void
}


// создаем стор
const useStoreCharForm = create<ICharForm>(set => ({
    char: [],
    setChar: (char) => set(({char}))
}))

export const useStoreCharInfo = create<ICharInfo>(set => ({
    char: null,
    setChar: (char) => set(({char}))
}))

export const useStoreMainPage = create<IMainPage>(set => ({
    selectedChar: 0,
    setChar: (selectedChar) => set(({selectedChar}))
}))


export const useStoreSinglePage = create<ISinglePage>(set => ({
    data: null,
    setData: (data) => set(({data}))
}))

// const [charList, setCharList] = useState<CharListDataTypes[]>([]);
// const [newItemLoading, setNewItemLoading] = useState<boolean>(false);
// const [offset, setOffset] = useState<number>(205);
// const [charEnded, setCharEnded] = useState<boolean>(false);

// const useStoreCharList = create(set => ({
//     charList: [],
//     setCharList: () => set((state) => ({charList: [...state.charList]})),
//     newItemLoading: false,
//     setNewItemLoading: () => set(({})),
//     offset: 205,
//     setOffset: () => set((state) => ({offset: state.offset + 9})),
//     charEnded: false,
//     setCharEnded: () => set()
// }))



export default useStoreCharForm