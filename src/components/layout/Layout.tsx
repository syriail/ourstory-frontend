import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container"
import classes from "./Layout.module.scss"
import OurStoryNavbar from "./OurStoryNavbar";

const Layout: React.FunctionComponent<any> = (props:any) => {
  return (
    <>
        <OurStoryNavbar />
        <Container className={classes.content}>
          <Outlet />
        </Container>
    </>  
    )
}

export default Layout
