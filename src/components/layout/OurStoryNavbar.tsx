import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import NavDropdown from "react-bootstrap/NavDropdown"
import {useTranslation} from 'react-i18next'
import classes from './Layout.module.scss'
import { useNavigate } from "react-router"
import SearchBox from "./SearchBox"

const OurStoryNavbar: React.FunctionComponent = () => {

  const {t, i18n}  = useTranslation()
  const navigate = useNavigate()

    const logout = () => {
    navigate('/')
  }
  const changeLanguage = (locale: string)=>{
    i18n.changeLanguage(locale)
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className={classes.navItem} href="/">{t('app_name')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className={classes.searchWrapper}>
            <SearchBox />
          </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='flex-grow-1'>
            <Nav.Link className={classes.navItem} href="/collections">
              {t('label_about')}
            </Nav.Link>
            
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
