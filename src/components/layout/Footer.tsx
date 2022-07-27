import { Container } from 'react-bootstrap'
import classes from './Layout.module.scss'

const Footer: React.FunctionComponent = ()=>{
    return (
        <footer className={classes.footer}>
            <Container className={classes.footerInnerWrapper}></Container>
        </footer>
    )
}

export default Footer