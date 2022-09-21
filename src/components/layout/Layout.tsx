import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container"
import classes from "./Layout.module.scss"
import OurStoryNavbar from "./OurStoryNavbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPages } from "../../api/ourstory"

const Layout: React.FunctionComponent<any> = (props:any) => {
  const [navPages, setNavPages] = useState<any[]>([])
  const [footerPages, setFooterPages] = useState<any[]>([])
  const {t, i18n}  = useTranslation()
  const navigate = useNavigate()

  useEffect(()=>{
    loadPages()
  }, [])

  const loadPages = async()=>{
    const lang = localStorage.getItem('ourstorylang')
    getPages(lang || i18n.language)
    .then(pages => {
      const toNav = []
      const toFooter = []
      for(const page of pages){
        if(page.layouts.includes('NAV_BAR')) toNav.push(page)
        if(page.layouts.includes('FOOTER')) toFooter.push(page)
      }
      setNavPages(toNav)
      setFooterPages(toFooter)
    })
    .catch(error=>console.log(error))

  }
  return (
    <>
        <OurStoryNavbar pages={navPages}/>
        <Container className={classes.content}>
          <Outlet />
          
        </Container>
        <Footer pages={footerPages}/>
    </>  
    )
}

export default Layout
