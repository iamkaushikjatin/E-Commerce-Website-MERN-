import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRgister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShopLayout from './components/shopping-view/layout'
import ShopAccount from './pages/shopping-view/Account'
import ShopHome from './pages/shopping-view/home'
import ShopCheckout from './pages/shopping-view/Checkout'
import ShopListing from './pages/shopping-view/Listing'
import NotFound from './pages/not-found/notFound'
import CheckAuth from './components/common/checkAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth/authSlice'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccessPage from './pages/shopping-view/payment-success'
import SearchProducts from './pages/shopping-view/search'
import { Skeleton } from './components/ui/skeleton'

function App() {

  const {isAuthenticated, user, isLoading} = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkAuth(token))
  }, [dispatch]);

  if(isLoading) return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
  

  return (
    <>
    <div className="flex flex-col overflow-hidden bg-[#e2eae6]">
      <Routes>
        <Route path='/' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>} />
        <Route path='/auth' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}>
            <Route path='login' element={<AuthLogin/>}></Route>
            <Route path='register' element={<AuthRgister/>}></Route>
        </Route>
        <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}>
         <Route path='dashboard' element={<AdminDashboard/>}></Route>
         <Route path='features' element={<AdminFeatures/>}></Route>
         <Route path='orders' element={<AdminOrders/>}></Route>
         <Route path='products' element={<AdminProducts/>}></Route>
        </Route>
        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShopLayout/></CheckAuth>}>
         <Route path='account' element={<ShopAccount/>}></Route>
         <Route path='home' element={<ShopHome/>}></Route>
         <Route path='checkout' element={<ShopCheckout/>}></Route>
         <Route path='listing' element={<ShopListing/>}></Route>
         <Route path='paypal-return' element={<PaypalReturnPage/>}></Route>
         <Route path='paypal-success' element={<PaymentSuccessPage/>}></Route>
         <Route path='search' element={<SearchProducts/>}></Route>
        </Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
