import React from 'react'
import EntryPage from './EntryPage'
import Login from './Login'
import { Route,Routes } from 'react-router-dom'
import PrivateRoutes from '../util_function/PrivateRoutes'
import BrowsePage from './BrowsePage'
import { useSelector } from 'react-redux'
import ForgotPassword from './ForgotPassword'
import PasswordReset from './PasswordReset'
import SocialAuth from './Social'
import SearchSuggestComp from './SearchSuggestComp'

import PageNotFound from './PageNotFound'
import MovieDetail from './MovieDetail'
import Footer from './Footer'
import Testing from './Testing'

const RootComponent = () => {
  //const {  email } = useSelector((state) => state.users?.users);

 
  
  return (
    <>
    <Routes>
    <Route path = "/" element = {<EntryPage/>} exact/>
    <Route path = "/login" element = {<Login/>} exact/>
    
    {/* <Route path = "/browse" element = {<BrowsePage/>} exact/> */}
    <Route  element={<PrivateRoutes/>}>
      <Route path = "/browse" element = {<BrowsePage/>} exact/>
  </Route>
  <Route  element={<PrivateRoutes/>}>
    <Route path='/movie/:id'  element={<MovieDetail /> } exact  />
  </Route>
    <Route path = "/forgotPassword" element = {<ForgotPassword/>} exact/>
    <Route path = "/ResetPassword/:id" element = {<PasswordReset/>} exact/>
    <Route path="/google" element={<SocialAuth />} exact />
    <Route path='/test'  element={<Footer /> } exact  />
    {/* <Route path='/movie/:id'  element={<MovieDetail /> } exact  /> */}
    <Route path='/footer'  element={<Footer/> } exact  />
    <Route path='/testing'  element={<Testing/> } exact  />
    {/* <Route path="/test" element={<SearchSuggestComp />} exact /> */}
    <Route path='*'  element={<PageNotFound />}  />
    
    
    
    </Routes>
    
    </>
    
  )
}

export default RootComponent