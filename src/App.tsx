import '../src/styles/global.scss'

import MainRouter from './routers/MainRouter';
import {useTranslation} from 'react-i18next'
import { useEffect } from 'react';
import SearchProvider from './contexts/SearchContext';

function App() {
  const {i18n}  = useTranslation()

  useEffect(()=>{
    if (i18n.language === "ar") {
      document.body.style.direction = "rtl"
      document.body.dir = "rtl"
    } else {
      document.body.style.direction = "ltr"
      document.body.dir = "ltr"
    }
  }, [i18n.language])
  

  return (
    <SearchProvider>
      <MainRouter />
    </SearchProvider>
  )
}

export default App;
