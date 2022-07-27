import {Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import StoryDetails from '../pages/StoryDetails'


const MainRouter: React.FunctionComponent = ()=>(
  <Routes>
    <Route path="/" element={<Layout />} >
      <Route path="/" element={<HomePage />} />
      <Route path="/story/:storyId" element={<StoryDetails />} />
      <Route path="/search/:text" element={<SearchPage />} />
    </Route>
</Routes>
)
export default MainRouter