import { useContext, useEffect } from "react"
import {Container, Row, Col} from 'react-bootstrap'
import {useParams} from 'react-router'
import {useTranslation} from 'react-i18next'
import SearchResultList from "../components/story/SearchResultList"
import { SearchContext, SearchStatus } from "../contexts/SearchContext"
import Facets from "../components/story/Facets"



const SearchPage: React.FunctionComponent = ()=>{
    const {setQuery, searchStatus} = useContext(SearchContext)
    const params = useParams()
    const {t} = useTranslation()
    
      useEffect(() => {
        //New search
        const text = params.text
        if (text && text.trim()!== '') {
          console.log('Query param: ' + text)
          setQuery(text)
        }
      }, [params.text])



    return (
        <>
          {searchStatus === SearchStatus.LOADING && <p>....</p>}
          <Container fluid>
            <Row>
                <Col sm={4}>
                    <Facets />
                </Col>
                <Col sm={8}>
                    <SearchResultList />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default SearchPage