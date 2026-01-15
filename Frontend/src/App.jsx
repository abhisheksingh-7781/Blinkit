import React, { useEffect } from 'react'
import MainRoutes from './Routes/MainRoutes'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import FatchUserDetails from './utils/FatchUserDetails'
import {setUser} from './Store/Reducers/userSlice'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const fatchUser = async()=>{
    const userData = await FatchUserDetails()
  
    dispatch(setUser(userData.data))
  }

  useEffect(() => {
   fatchUser()
  }, [])
  

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
    <Header/>
    <main className='min-h-[76vh] lg:min-h-[80vh] '>
      <MainRoutes/>
    </main>
    <Footer/>
    </>
  )
}

export default App