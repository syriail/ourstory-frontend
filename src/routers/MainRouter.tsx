import {Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'


const MainRouter: React.FunctionComponent = ()=>(
  <Routes>
    <Route path="/" element={<Layout />} >
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:text" element={<SearchPage />} />
    </Route>
</Routes>
)
export default MainRouter