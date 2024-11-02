// создаем index.js для того, чтобы импортить тут два компонента и возвращать их в виде обьекта (для уменьшения импортов в App.js - импорт одной строчкой)

import MainPage from "./MainPage";
import ComicsPage from "./ComicsPage";
import SinglePage from './SinglePage'
import Page404 from "./404";
import SingleComicPage from "./SingleComicPage";

export {MainPage, ComicsPage, SingleComicPage, SinglePage}; // убираем именовый экспорт Page404
