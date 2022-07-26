import { FormEventHandler, useState } from "react"
import { useNavigate } from 'react-router'
import {useTranslation} from 'react-i18next'
const SearchBox: React.FunctionComponent = () => {

  const navigate = useNavigate()
  const {t} = useTranslation()
  const [queryText, setQueryText] = useState("")

  const doSearch: FormEventHandler = (e) => {
    console.log("doSearch")
    e.preventDefault()
    navigate(`/search/${queryText}`)
  }
  return (
    <form onSubmit={doSearch}>
      <input type="submit" value="Search" />
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => setQueryText(e.target.value)}
        placeholder={t("button_search")}
      />
    </form>
  )
}

export default SearchBox
