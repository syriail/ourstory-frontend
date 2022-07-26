import { useContext, useEffect } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Facets from "../components/story/Facets"
import SearchResultList from "../components/story/SearchResultList"
import { SearchContext, SearchStatus } from "../contexts/SearchContext"
import classes from './Pages.module.scss'

const HomePage: React.FunctionComponent = ()=>{
    const {setQuery} = useContext(SearchContext)

    useEffect(()=>{
        setQuery('')
    },[])
    
    return (
        <Container fluid>
            <Row>
                <Col sm={4} >
                    <Facets />
                </Col>
                <Col sm={8} >
                    <SearchResultList />
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage