import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import OtpVerification from '../pages/OtpVerification'
import ResetPassword from '../pages/ResetPassword'
import UserMenuMobile from '../pages/UserMenuMobile'
import Dashbord from '../Layouts/Dashbord'
import Profile from '../pages/Profile'
import MyOrder from '../pages/MyOrder'
import Address from '../pages/Address'
import Category from '../pages/Category'
import SubCategory from '../pages/SubCategory'
import UploadProduct from '../pages/UploadProduct'
import ProductAdmin from '../pages/ProductAdmin'


const MainRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/s' element={<SearchPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/otp-verification' element={<OtpVerification/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/user' element={<UserMenuMobile/>}/>

          {/* 🔥 Dashboard Nested Routes */}
        <Route path="/dashboard" element={<Dashbord />}>
            <Route path="profile" element={<Profile />} />
            <Route path="myorder" element={<MyOrder />} />
            <Route path="address" element={<Address />} />            
            <Route path="product" element={<ProductAdmin />} />            
            <Route path="category" element={<Category />} />            
            <Route path="subcategory" element={<SubCategory />} />            
            <Route path="upload-Product" element={<UploadProduct />} />            
        </Route>
       

    </Routes>
  )
}

export default MainRoutes


