import { useEffect, useState } from "react"
import { getPageContent } from "../api/ourstory"
import { useParams } from "react-router"
import {useTranslation} from 'react-i18next'
import { Container } from "react-bootstrap"

const StaticPage: React.FunctionComponent = ()=>{
    const [content, setContent] = useState('')
    const {t, i18n}  = useTranslation()
    const params = useParams()
    const slug = params.slug
    useEffect(()=>{
        loadContent()
    }, [])

    const loadContent = ()=>{
        getPageContent(slug!, i18n.language)
        .then(content => setContent(content))
        .catch(error=>console.log(error))
    }
    return (
        <Container>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
    
    
        </Container>
    )
}

export default StaticPage