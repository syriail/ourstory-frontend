import { Button, Col, Container, Form, Modal, ProgressBar, Row } from "react-bootstrap"
import classes from "./Stories.module.scss"
import ReactPlayer from "react-player"
import {useParams} from 'react-router'
import {useTranslation} from 'react-i18next'
import { useEffect, useState } from 'react'
import { MediaFile, MediaFormat, Story } from '../api/model'
import {getStoryDetails, getMediaDownloadUrl} from '../api/ourstory'
const StoryDetails: React.FunctionComponent = ()=>{
    const [story, setStory] = useState<Story>()
    const [mediaToShow, setMediaToShow] = useState<MediaFile>()
  const [showMediaModal, setShowMediaModal] = useState(false)
    const params = useParams()
    const {t, i18n} = useTranslation()
    const storyId = params.storyId

    useEffect(()=>{
        loadStory()
    }, [])

    const loadStory = async()=>{
        if(storyId){
            getStoryDetails(storyId, i18n.language)
            .then(s => setStory(s))
            .catch(error => console.log(error))
        }
        
    }
    const showMedia = async (mediaFile: MediaFile) => {
        try {
          const url = await getMediaDownloadUrl(mediaFile.mediaPath)
          setMediaToShow({ mediaPath:url, format: mediaFile.format })
          setShowMediaModal(true)
        } catch (error) {
          console.log(error)
        }
      }
      const handleCloseMediaModal = () => {
        setShowMediaModal(false)
        setMediaToShow(undefined)
      }
    return (
        <>
            <Container>
        <Row className={classes.info}>
          <Col xs={3}>
            <strong>{t("label_storyTitle")}</strong>
          </Col>
          <Col xs={9}>
            <span>{story?.storyTitle}</span>
          </Col>
        </Row>
        <Row className={classes.info}>
          <Col xs={3}>
            <strong>{t("label_storyType")}</strong>
          </Col>
          <Col xs={9}>
            {story?.storyType.map((type, index)=>(
              <span key={index}>{t(type)} - </span>
            ))}
            
          </Col>
        </Row>
        <Container className={classes.container}>
            <div>{t("label_mediaFiles")}</div>
            {story?.mediaFiles?.map((mediaFile, index) => (
              <div key={index} className={classes.actionContainer}>
              <p>{t(`format_${mediaFile.format}`)}</p>
              <Button variant="link" onClick={() => showMedia(mediaFile)}>
                {t("button_show")}
              </Button>
            </div>
          ))}
          </Container>
        <Row className={classes.info}>
          <Col xs={3}>
            <strong>{t("label_storyCollectorName")}</strong>
          </Col>
          <Col xs={9}>
            <span>{story?.storyCollectorName}</span>
          </Col>
        </Row>
        <Container className={classes.container}>
          <h5>{t("label_storyTeller")}</h5>
          <Row>
            <Col xs={3}>
              <strong>{t("label_storyTellerName")}</strong>
            </Col>
            <Col xs={9}>
              <span>{story?.storyTellerName}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <strong>{t("label_storyTellerAge")}</strong>
            </Col>
            <Col xs={9}>
              <span>{story?.storyTellerAge}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <strong>{t("label_storyTellerGender")}</strong>
            </Col>
            <Col xs={9}>
              <span>{t(`gender_${story?.storyTellerGender}`)}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <strong>{t("label_storyTellerPlaceOfOrigin")}</strong>
            </Col>
            <Col xs={9}>
              <span>{story?.storyTellerPlaceOfOrigin}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <strong>{t("label_storyTellerResidency")}</strong>
            </Col>
            <Col xs={9}>
              <span>{story?.storyTellerResidency}</span>
            </Col>
          </Row>
        </Container>
        {story?.tags?.map((tag, index) => (
            <Row key={index} className={classes.info}>
              <Col xs={3}>
                <strong>{tag.name}</strong>
              </Col>
              <Col xs={9}>
                <span>{tag.value}</span>
              </Col>
            </Row>
          ))}
        <Row className={classes.info}>
          <Col xs={3}>
            <strong>{t("label_storyAbstraction")}</strong>
          </Col>
          <Col xs={9}>
            <span>{story?.storyAbstraction}</span>
          </Col>
        </Row>
        <Row className={classes.info}>
          <Col xs={3}>
            <strong>{t("label_storyTranscript")}</strong>
          </Col>
          <Col xs={9}>
            <span>{story?.storyTranscript}</span>
          </Col>
        </Row>
      </Container>
      <Modal
        show={showMediaModal}
        size="lg"
        centered
        onHide={handleCloseMediaModal}
      >
        <Modal.Body>
          {mediaToShow?.format === MediaFormat.IMAGE ? (
            <img className={classes.mediaImage} src={mediaToShow?.mediaPath} />
          ) : (
            <ReactPlayer
              url={mediaToShow?.mediaPath}
              controls
              playing={false}
              height={mediaToShow?.format === MediaFormat.AUDIO ? "50px" : "360px"}
              
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMediaModal}>
            {t("button_close")}
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default StoryDetails