import React, { useEffect } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom';
import FloatingShape from './components/FloatingShape.jsx'
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore.js';
import DashBoardPage from './pages/DashBoardPage.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

//protected route
const ProtectedRoute = ({children})=>{
  const {isAuthenticated,user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to='/login' replace/>
  }

  if(!user.isVerified){
    return <Navigate to='/verify-email' replace/>
  }

  return children;
}

//redirect authenticated users to home page
const RedirectAuthenticateUser = ({children})=>{
  const {isAuthenticated,user} = useAuthStore();
  
  if(isAuthenticated && user.isVerified){ //it check if the user is authenticated and is verified
    return <Navigate to='/' replace/> //if true then navigate to home page and replace it with current page 
  }
  return children; //if not then return the current page
}


const App = () => {
  const {isCheckingAuth,checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner/>
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5}/>
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>
      <FloatingShape color='bg-emerald-500' size='w-25 h-25' top='30%' left='60%' delay={3}/>

    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <DashBoardPage/>          
        </ProtectedRoute>}/>
      <Route path='/signup' element={ //here it check first if the user is authenticated by redirecting it to RedirectAuthenticateUser componenet and check authentication
        <RedirectAuthenticateUser>
          <SignUpPage/> 
        </RedirectAuthenticateUser>}/>
      <Route path='/login' element={
        <RedirectAuthenticateUser>
          <LoginPage/>
        </RedirectAuthenticateUser>
      }/>
      <Route path='/verify-email' element={<EmailVerificationPage/>}/>
      <Route path='/forgot-password' element={
        <RedirectAuthenticateUser>
          <ForgotPasswordPage/>
        </RedirectAuthenticateUser>}/>

        <Route path='/reset-password/' element={
          <RedirectAuthenticateUser>
            <ResetPasswordPage/>
          </RedirectAuthenticateUser>
        }/>

        <Route path='*' element={<Navigate to='/' replace />}/>
    </Routes>
    <Toaster/>
    </div>
  );
}

export default App;