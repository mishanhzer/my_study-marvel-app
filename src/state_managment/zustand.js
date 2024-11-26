// npm i zustand - подключаем стейт менеджер

import {create} from 'zustand'; // импортируем функцию create
import {immer} from 'zustand/middleware/immer'; // импорт immer для того, чтобы менять стейт напрямую
import { devtools } from 'zustand/middleware' // девтулз (для того, чтобы следить как изменяется стейт и в какое время)
import { persist } from 'zustand/middleware' //  persist (необходим для сохранения данных)

const useUsersStore = create((set) => ({ // создаем store, чтобы хранить список пользователей
    users: [],
    currentUser: null,
    settings: {},
    isLoading: false,
    erros: [],
    addUser: (username) => set(state => ({ // функция set (работает как setState)
        users: [ // меняем стейт
            ...state.users, // копируем персонажей (сохраняем принцип иммутабельности)
            {id: Date.new(), username} // добавляем новый обьект в массв
        ]
    })),
}));

// Второй вариант изменения стейта на прямую
// const useUsersStore = create()(immer((set) => ({ // создаем store, чтобы хранить список пользователей
//     users: [],
//     currentUser: null,
//     settings: {},
//     isLoading: false,
//     erros: [],
//     addUsers: (username) => set(state => {// можем менять стейт напрямую (используем middleware immer)
//         state.users.push({id: Date.now(), username})
//     }),
// })));

export default useUsersStore;