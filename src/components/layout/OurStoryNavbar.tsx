import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import NavDropdown from "react-bootstrap/NavDropdown"
import {useTranslation} from 'react-i18next'
import classes from './Layout.module.scss'
import { useNavigate } from "react-router"
import SearchBox from "./SearchBox"


const OurStoryNavbar: React.FunctionComponent<{pages: any[]}> = ({pages}) => {
  const {t, i18n}  = useTranslation()
  const navigate = useNavigate()
    const logout = () => {
    navigate('/')
  }
  const changeLanguage = (locale: string)=>{
    i18n.changeLanguage(locale)
  }
  return (
    <Navbar bg="white" variant="light" expand="lg">
      <Container>
        <Navbar.Brand className={classes.navItem} href="/">
          <img
            alt={t('app_name')}
            src={require("../../styles/images/logo.jpg")}
            width="60"
            height="60"
          />
          
          </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className={classes.searchWrapper}>
            <SearchBox />
          </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='flex-grow-1'>
            {pages.map((page, index)=>(
              <Nav.Link key={index} className={classes.navItem} href={`/page/${page.slug}`}>
              {page.name}
            </Nav.Link>
            ))}
            
            
            <NavDropdown
              className={classes.navItem}
                title={t('label_language')}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={()=> changeLanguage('ar')}>
                    {t('language_switcher_ar')}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={()=> changeLanguage('en')}>
                  {t('language_switcher_en')}
                  </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
          
          </Nav.Item>
          </Nav>
          
          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}



export default OurStoryNavbar
