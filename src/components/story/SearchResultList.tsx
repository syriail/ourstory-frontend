import { useContext } from 'react'
import {Container} from 'react-bootstrap'
import { SearchContext } from '../../contexts/SearchContext'
import StoryCard from "./StoryCard"
import classes from './Story.module.scss'

const SearchResultList: React.FunctionComponent = ()=>{
    const {stories, tags} = useContext(SearchContext)
    
    return (
        <div className={classes.resultContainer}>
            {stories.map((story, index)=>(
                <StoryCard key={index} story={story} tags={tags}/>
            ))}
        </div>
    )
}

export default SearchResultList