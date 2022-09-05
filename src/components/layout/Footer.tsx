import { Container } from 'react-bootstrap'
import classes from './Layout.module.scss'

const Footer: React.FunctionComponent<{pages: any[]}> = ({pages}) => {
    return (
        <footer className={classes.footer}>
            <Container className={classes.footerInnerWrapper}>
                {pages.map((page, index)=>(
                    <p key={index}>{page.name}</p>
                ))}
            </Container>
        </footer>
    )
}

export default Footer