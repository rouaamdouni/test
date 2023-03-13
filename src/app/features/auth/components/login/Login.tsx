import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../../core/_requests'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { useAuth } from '../../core/Auth'
import { CustomBtn } from './index'
import ContentContainer from './ContentContainer'

const imgStyle = {
  height: '30px ',
  width: '30px',
  padding: '2px 0px 2px 2px'
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await login(values.email, values.password)
        saveAuth(auth)
        const { data: user } = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login detail is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <div className='d-flex flex-justify-between '>
      <ContentContainer />
      <form
        className=' w-lg-600px bg-body rounded shadow-sm p-10 p-lg-20 mx-auto mt-10 h-lg-650px'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='text-dark-blue  mt-20 text-font-font' style={{ fontFamily: 'Segoe UI', fontSize: '30px', fontWeight: 'bold', width: '50% auto', textAlign: 'center', marginTop: '25px' }}>
            <span>Sign In</span>
          </div>
          {/* begin:: Button-wrapper*/}
          <div className='d-flex justify-content-between mt-10'>
            <CustomBtn type="submit">
              <img src={toAbsoluteUrl('/assets/icons/google.png')} alt="Google-logo" style={imgStyle} />
              <span style={{ paddingLeft: '20px', fontFamily: 'Segoe UI', fontWeight: 'regulat' }} className='text-dark-blue'>Login with Google</span>
            </CustomBtn>
            <CustomBtn type="submit">
              <img src={toAbsoluteUrl('/assets/icons/linkedin.png')} alt="Linkedin-logo" style={imgStyle} />
              <span style={{ paddingLeft: '20px', fontFamily: 'Segoe UI', fontWeight: 'regulat' }} className='text-dark-blue'> Login with Linkedin </span>
            </CustomBtn>

          </div>
          {/* end:: Button-wrapper*/}

          {/* begin::Separator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '25px' }}>
            <hr style={{ width: '45%', height: '3px' }} />
            <span className='text-center text-muted text-gray fs-6 fw-bold '>Or</span>
            <hr style={{ width: '45%', height: '3px' }} />
          </div>
          {/* end::Separator */}

          <input
            placeholder='Email'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg-dark-blue',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            type='email'
            name='email'
            autoComplete='off'
            style={{ border: '1px solid #05445E' }}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        {/* begin::Form group */}
        <div className='fv-row mb-10'>

          <input
            style={{ border: '1px solid #05445E ' }}
            placeholder='Password'
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-dark-blue',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        <div className='d-flex justify-content-end mt-n6 '>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='fs-6 fw-bold'
              style={{ marginLeft: '5px', fontFamily: 'Segoe UI', color: '#05445E', textAlign: 'end' }}
            >
              Forgot Password ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg mb-5'
            style={{ fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: '#FFCC29', color: '#05445E', marginTop: '15px' }}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Sign In</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>

        { /*begin : sign in section*/}
        <div className='text-center' style={{ paddingTop: '20px' }}>
          <div style={{ fontFamily: 'Segoe UI', fontWeight: '500', color: '#05445E' }}>
            Not a Shaper Yet ?{' '}
            <Link to='/auth/registration' style={{ color: '#FFCC29', fontSize: '15px' }}>
              Create Your Account
            </Link>
          </div>
        </div>
        { /*end : sign in section


      {/* end::Action */}
      </form>
    </div>

  )
}
