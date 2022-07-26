import { useContext, useEffect, useState } from 'react'
import {useTranslation} from 'react-i18next'
import { SearchContext } from '../../contexts/SearchContext'
import { Form } from 'react-bootstrap'
import classes from './Story.module.scss'
const Facets: React.FunctionComponent = ()=>{
    const {facets, isFacetValueSelected, addFacetFilter, removeFacetFilter} = useContext(SearchContext)
    const {t} = useTranslation()

    const getFacetValueLabel = (value: string, count:number):string=>{
      
        const translation = t(value)
        return `${translation} (${count})`
    }

    const getFacetName = (attribute: string):string =>{
        const code = `facet_${attribute}`
        return t(code)
    }

    const handleFacetChange = (attribute:string, value: string)=>{
        if(isFacetValueSelected(attribute, value)){
            removeFacetFilter(attribute, value)
        }else{
            addFacetFilter(attribute, value)
        }

    }

    return (
        <>
            {facets.map((facet, index)=>(
                <div key={index} className={classes.facetContainer}>
                    <h5>{getFacetName(facet.attribute)}</h5>
                    <Form>
                    {facet.values.map((value, index)=>(
                            <Form.Check key={index} className={classes.facetCheck}
                                type='checkbox'
                                label={getFacetValueLabel(value.value, value.count)}
                                checked={isFacetValueSelected(facet.attribute, value.value)}
                                onChange={()=> handleFacetChange(facet.attribute, value.value)}
                            />
                                
                        ))}
                    </Form>
                </div>
                
                
            ))}
        </>
    )
}

export default Facets