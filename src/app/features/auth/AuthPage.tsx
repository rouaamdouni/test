/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { ForgotPassword } from './components/forgotPassword/ForgotPassword'
import { Login } from './components/login/Login'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

import { Registration } from './components/register/Registration'

const AuthLayout = () => {
  useEffect(() => {
    document.body.style.backgroundImage = 'none'
    return () => { }
  }, [])

  return (
    <div
      className='bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-cover bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/assets/images/bg/background.png')})`,
        height: '100vh'
      }}
    >

      {/* begin::Wrapper */}
      <div >
        <Outlet />
      </div>
      {/* end::Wrapper */}



    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
