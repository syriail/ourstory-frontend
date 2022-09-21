import { useEffect } from "react"
import { useNavigate, useParams } from "react-router";

//Temporal language component since we don't want to make language change available on nav bar
const LanguageComponent:React.FunctionComponent = ()=>{
    const navigate = useNavigate()
    const params = useParams()
    const lang = params.lang as string
    useEffect(()=>{
        localStorage.setItem('ourstorylang', lang);
        reload()
    }, [])
    const reload = ()=>{
        console.log('should reload')
        navigate('/')
    }
    return <></>
}
export default LanguageComponent