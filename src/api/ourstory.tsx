import Axios from 'axios'
import { SearchResponse } from '@algolia/client-search'
import algoliasearch from 'algoliasearch'
import { Story, SearchResult, Facet, Tags } from './model'

const algoliaClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID!,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY!
  )
  const endpoint = process.env.REACT_APP_API_ENDPOINT
export const search = async(locale: string, text: string, pageSize: number, pageNumber: number, facetsFilter: {[key: string]: string[]}): Promise<SearchResult>=>{
    const indexName = `${process.env.REACT_APP_ALGOLIA_INDEX_PREFIX}${locale}`
    const algoliaIndex = algoliaClient.initIndex(indexName)
    let facetFilters: string[][] = []
    for(const attribute of Object.keys(facetsFilter)){
        const values = facetsFilter[attribute]
        if(values && values.length > 0){
            let filter = []
            for(const value of values){
                filter.push(`${attribute}:${value}`)
            }
            facetFilters.push(filter)
        }
    }
    return new Promise((resolve, reject)=>{
        algoliaIndex.search(text, {facets:['*'], facetFilters: facetFilters, page: pageNumber, hitsPerPage: pageSize})
            .then((result: SearchResponse<any>)=>{
                console.log('Raw result of search')
                console.log(result)
                resolve(parseSearchResults(result))
            })
            .catch(error=> reject(error))
    })
    
}

export const getTags = async(locale: string):Promise<Tags> =>{
    return new Promise((resolve, reject)=>{
        Axios.get(`${endpoint}/tags?locale=${locale}`)
        .then(response=>{
            if(response.status === 200){
                resolve(pareseTags(response.data.tags))
            }else{
                reject('')
            }
        }).catch(error => reject(error))
    })
}

export const getStoryDetails = (storyId: string, locale: string):Promise<Story>=>{
    return new Promise((resolve, reject)=>{
        Axios.get(`${endpoint}/stories/details/${storyId}?locale=${locale}`)
        .then((response)=>{
            if(response.status === 200){
                resolve(response.data)
            }else{
                reject('')
            }
        })
        .catch(error=> reject(error))
    })
}
export const getMediaDownloadUrl = (path: string):Promise<string>=>{
    return new Promise((resolve, reject)=>{
        Axios.get(`${endpoint}/downloadUrl?path=${path}`)
        .then((response)=>{
            if(response.status === 200){
                resolve(response.data)
            }else{
                reject('')
            }
        })
        .catch(error=> reject(error))
    })
}

const pareseTags = (tagsList: {slug: string, name: string}[]): Tags=>{
    let tags: Tags = {}
    for(const tagItem of tagsList){
        tags[tagItem.slug] = tagItem.name
    }
    return tags
}

const parseSearchResults = (result: SearchResponse<Story>):SearchResult=>{
    let stories: Story[] = []
    for(const hit of result.hits){
        
        let story: Story = {
            objectID: hit.objectID,
            collectionId: hit.collectionId,
            collectionName: hit.collectionName,
            storyType: hit.storyType,
            storyTitle: hit.storyTitle
        }

        

        if(hit._highlightResult){
            //Replace storyTitle with highlight's value if exists
            // const titleM = hit._highlightResult['storyTitle']
            // if(titleM && titleM.matchLevel !== 'none') story.storyTitle =  titleM.value
            // //Add only attributes which have highlight's value
            // const abstractionM = hit._highlightResult['storyAbstraction']
            // if(abstractionM && abstractionM.matchLevel !== 'none') story.storyAbstraction = abstractionM.value

            // let transcriptM = hit._highlightResult['storyTranscript']
            // if(transcriptM && transcriptM.matchLevel !== 'none') story.storyTranscript = transcriptM.value

            // const collectorM = hit._highlightResult['storyCollectorName']
            // if(collectorM && collectorM.matchLevel !== 'none') story.storyCollectorName = collectorM.value

            // const tellerNameM = hit._highlightResult['storyTellerName']
            // if(tellerNameM && tellerNameM.matchLevel !== 'none') story.storyTellerName = tellerNameM.value

            // const tellerOriginM = hit._highlightResult['storyTellerPlaceOfOrigin']
            // if(tellerOriginM && tellerOriginM.matchLevel !== 'none') story.storyTellerPlaceOfOrigin = tellerOriginM.value

            // const tellerResidencyM = hit._highlightResult['storyTellerResidency']
            // if(tellerResidencyM && tellerResidencyM.matchLevel !== 'none') story.storyTellerResidency = tellerResidencyM.value
            for(const attribute of Object.keys(hit._highlightResult)){
                const attributeM = (hit._highlightResult as Record<string, any>)[attribute]
                if(attributeM && attributeM.matchLevel && attributeM.matchLevel !== 'none'){
                    (story as any)[attribute] = attributeM.value
                }
            }

        }
        stories.push(story)
        
    }
    const facets = parseFacets(result.facets)
    const searchResult: SearchResult = {
        page: result.page,
        pageSize: result.hitsPerPage,
        pages: result.nbPages,
        total: result.nbHits,
        stories: stories,
        facets
    }
    return searchResult
}

const parseFacets = (facetHits?: Record<string, Record<string, number>>): Facet[]=>{
    let facets: Facet[] = []
    if(facetHits){
        for(const attribute of Object.keys(facetHits)){
            const attributeValues = facetHits[attribute]
            const facetValues = Object.keys(attributeValues).map(key=>{
                return {
                    value: key,
                    count: attributeValues[key]
                }
            })
            facets.push({
                attribute,
                values: facetValues
            })
            
        }
    }
    return facets
}