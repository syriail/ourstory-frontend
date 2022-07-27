import { Story, Tags } from '../../api/model'
import {Row, Col, Container} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import { useNavigate } from "react-router"
import classes from './Story.module.scss'
const StoryCard: React.FunctionComponent<{story: Story, tags: Tags}> = ({story, tags})=>{
    const navigate = useNavigate()
    const {t} = useTranslation()
    const toStoryDetails = ()=>{
        navigate(`/story/${story.objectID}`)
    }
    const renderAttributesWithMatch = (attribute: string, value: any)=>{
        if(['objectID', 'collectionId' ,'storyTitle', 'collectionName', 'storyType'].includes(attribute) ) return null
        //First check if the attribute is a tag
        let label = tags[attribute]

        if(!label) label = t(`label_${attribute}`)
        return (
            <Row>
                    <Col sm={3}>{label}</Col>
                    <Col sm={9} dangerouslySetInnerHTML={{__html: value}} />
                </Row>
        )
    }
    return (
        <Container fluid className={classes.storyCardContainer} onClick={toStoryDetails}>
            <Row>
                <Col sm={3}>{t('label_storyTitle')}</Col>
                <Col sm={9} dangerouslySetInnerHTML={{__html: story.storyTitle}} />
            </Row>
            <Row>
                <Col sm={3}>{t('label_storyType')}</Col>
                <Col sm={9}>
                    {story.storyType.map((type, index)=>(
                        <span key={index}>{t(type)}, </span>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col sm={3}>{t('label_collectionName')}</Col>
                <Col sm={9} dangerouslySetInnerHTML={{__html: story.collectionName}} />
            </Row>
           
            
            {
                Object.keys(story).map((attribute)=>{
                    return renderAttributesWithMatch(attribute, (story as any)[attribute])
                })
            }
        </Container>
    )
}

export default StoryCard