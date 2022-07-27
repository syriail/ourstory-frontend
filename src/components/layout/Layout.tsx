import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container"
import classes from "./Layout.module.scss"
import OurStoryNavbar from "./OurStoryNavbar";
import Footer from "./Footer";

const Layout: React.FunctionComponent<any> = (props:any) => {
  return (
    <>
        <OurStoryNavbar />
        <Container className={classes.content}>
          <Outlet />
          
        </Container>
        <Footer />
    </>  
    )
}

export default Layout
