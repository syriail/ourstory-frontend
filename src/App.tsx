import '../src/styles/global.scss'

import MainRouter from './routers/MainRouter';
import {useTranslation} from 'react-i18next'
import { useEffect } from 'react';
import SearchProvider from './contexts/SearchContext';

function App() {
  const {i18n}  = useTranslation()
  useEffect(()=>{
    let lang = localStorage.getItem('ourstorylang');
    if(lang){
      console.log('coolie lang', lang)
      i18n.changeLanguage(lang)
    }else{
      lang = i18n.language
      localStorage.setItem('ourstorylang', lang);
    }
    if (lang === "ar") {
      document.body.style.direction = "rtl"
      document.body.dir = "rtl"
    } else {
      document.body.style.direction = "ltr"
      document.body.dir = "ltr"
    }
  },[])

  

  return (
    <SearchProvider>
      <MainRouter />
    </SearchProvider>
  )
}

export default App;
