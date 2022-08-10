import { useContext } from 'react'
import Pagination from '@vlsergey/react-bootstrap-pagination'
import { SearchContext } from '../../contexts/SearchContext'
import StoryCard from "./StoryCard"
import classes from './Story.module.scss'

const SearchResultList: React.FunctionComponent = ()=>{
    const {stories, pageNumber, numberOfPages, prevPage, nextPage, tags} = useContext(SearchContext)

    const handleOnSelect = (e:any)=>{
        const value = e.target.value
        console.log(value)
        if(value > pageNumber){
            console.log('Call nextPage')
            nextPage()
        }
        if(value < pageNumber){
            console.log('Call prePage')
            prevPage()
        } 
    }
    
    return (
        <div className={classes.resultContainer}>
            {stories.map((story, index)=>(
                <StoryCard key={index} story={story} tags={tags}/>
            ))}
            {numberOfPages > 1 &&
                <div className={classes.searchPagination} >
                    <Pagination name= "pager" aroundCurrent={5} showFirstLast={false} showPrevNext={false} value={pageNumber} totalPages={numberOfPages} onChange={handleOnSelect}/>
                </div>
            }
        </div>
    )
}

export default SearchResultList