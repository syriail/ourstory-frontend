import React, { useState, useEffect } from 'react'
import {Facet, Story, Tags} from '../api/model'
import {search, getTags} from '../api/ourstory'
import {useTranslation} from 'react-i18next'

export enum SearchStatus {
  LOADING,
  QUERIED,
  IDLE

}

const defaultPageSize = 20

export interface ISearch {
  stories: Story[]
  tags: Tags
  searchStatus: SearchStatus
  facets: Facet[]
  pageNumber: number
  pageSize: number
  total: number
  numberOfPages: number
  setQuery?: any
  isFacetValueSelected?: any
  addFacetFilter?: any
  removeFacetFilter?: any
  nextPage?: any
  prevPage?: any
}

const defaultState: ISearch = {
  stories: [],
  tags: {},
  searchStatus: SearchStatus.IDLE,
  facets:[],
  pageNumber: 0,
  pageSize: defaultPageSize,
  total: 0,
  numberOfPages: 0
}

type Props = {
  children?: React.ReactNode
}

export const SearchContext = React.createContext(defaultState)

const SearchProvider = ({ children }: Props) => {
  const [tags, setTags] = useState<Tags>({})
  const [searchStatus, setSearchStatus] = useState(SearchStatus.IDLE)
  const [facets, setFacets] = useState<Facet[]>([])
  const [queryText, setQueryText] = useState('')
  const [facetsFilterMap, setFacetsFilterMap] = useState<{[key: string]: string[]}>({})
  const [facetFilterArray, setFaceFilterArray] = useState<string[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [pageNumber, setPageNumber] = useState(0)
  const [total, setTotal] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const {i18n} = useTranslation()

  const pageSize = defaultPageSize

  useEffect(()=>{
    loadTags()
  }, [])

  useEffect(()=>{
      doSearch(0)
  }, [queryText])

  const loadTags = async()=>{
    getTags(i18n.language)
    .then(result=> setTags(result))
    .catch(error=>console.log(error))
  }

  const setQuery = (query: string)=>{
      setQueryText(query)
  }

  const doSearch = async(pageNumber: number)=>{
      
      setSearchStatus(SearchStatus.LOADING)
      console.log(`Do search pageNumber: ${pageNumber}`)
      search(i18n.language, queryText, pageSize, pageNumber, facetsFilterMap)
          .then((result)=>{
              console.log('Stories')
              console.log(result)
              setStories(result.stories)
              setTotal(result.total)
              setPageNumber(result.page)
              setNumberOfPages(result.pages)
              setFacets(result.facets)
          })
          .finally(()=> setSearchStatus(SearchStatus.QUERIED))

    }


  const addFacetFilter = (attribute: string, value: string)=>{
    let newFacetsFilterMap = facetsFilterMap
    let facetMapElement = newFacetsFilterMap[attribute]
    if(!facetMapElement){
        newFacetsFilterMap[attribute] = [value]
    }else{
        facetMapElement.push(value)
        newFacetsFilterMap[attribute] = facetMapElement
    }
    setFacetsFilterMap(newFacetsFilterMap)
    if(!isFacetValueSelected(attribute, value)){
        setFaceFilterArray([...facetFilterArray, `${attribute}:${value}`])
    }
    doSearch(0)
  }

  const removeFacetFilter = (attribute: string, value: string)=>{

    let newFacetsFilterMap = facetsFilterMap
    let facetMapElement = newFacetsFilterMap[attribute]
    if(!facetMapElement) return
    if(facetMapElement.length === 0) return
    facetMapElement = facetMapElement.filter(v=> v!== value)
    newFacetsFilterMap[attribute] = facetMapElement
    setFacetsFilterMap(newFacetsFilterMap)
    const newFilterArray = facetFilterArray.filter(e=> e !== `${attribute}:${value}`)
    setFaceFilterArray(newFilterArray)
    doSearch(0)

  }
  const isFacetValueSelected = (attribute: string, value: string):boolean =>{
    return facetFilterArray.includes(`${attribute}:${value}`)
  }

  const nextPage = ()=>{
    if(pageNumber < numberOfPages){
        doSearch(pageNumber + 1)
    }
  }
  const prevPage = ()=>{
    if(pageNumber > 0){
        doSearch(pageNumber - 1)
    }
  }


  

  const state: ISearch = {
    searchStatus,
    stories,
    tags,
    facets,
    pageNumber,
    pageSize,
    total,
    numberOfPages,
    setQuery,
    isFacetValueSelected,
    addFacetFilter,
    removeFacetFilter,
    nextPage,
    prevPage
  }

  return <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
}

export default SearchProvider
