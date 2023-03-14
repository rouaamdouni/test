/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { getUserByToken, register } from '../../core/_requests'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { PasswordMeterComponent } from '../../../../../_metronic/assets/ts/components'
import { useAuth } from '../../core/Auth'
import VerticalStepper from './VerticalStepper'
import CustomBtn from '../login/CustomBtn'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await register(
          values.email,
          values.firstname,
          values.lastname,
          values.password,
          values.changepassword
        )
        saveAuth(auth)
        const { data: user } = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <div className='d-flex flex-justify-between flex-center '>
      <VerticalStepper />
      <form
        className=' w-lg-650px bg-body rounded shadow-sm p-lg-10 mx-auto mt-10 h-lg-650px'
        noValidate
        id='kt_login_signup_form'
        onSubmit={formik.handleSubmit}
      >
        {/* begin::Form group */}
        <div className='fv-row mb-5'>
          <div className='text-dark-blue' style={{ fontFamily: 'Segoe UI', fontSize: '30px', fontWeight: 'bold', width: '50% auto', textAlign: 'center' }}>
            <span>Sign Up</span>
          </div>

        </div>
        {/* end::Heading */}

        {/* begin:: Button-wrapper*/}
        <div className='d-flex justify-content-between mt-5'>
          <CustomBtn type="submit">
            <img src={toAbsoluteUrl('/assets/icons/google.png')} alt="Google-logo" />
            <span style={{ paddingLeft: '20px', fontFamily: 'Segoe UI', fontWeight: 'regulat' }} className='text-dark-blue'>Sign Up with Google</span>
          </CustomBtn>
          <CustomBtn type="submit">
            <img src={toAbsoluteUrl('/assets/icons/linkedin.png')} alt="Linkedin-logo" />
            <span style={{ paddingLeft: '20px', fontFamily: 'Segoe UI', fontWeight: 'regulat' }} className='text-dark-blue'> Sifn Up with Linkedin </span>
          </CustomBtn>

        </div>
        {/* end:: Button-wrapper*/}

        <div style={{ marginTop: '5px' }} className='d-flex align-items-center mb-5'>
          <div className='border-bottom border-gray-300 mw-50 w-100'></div>
          <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>
          <div className='border-bottom border-gray-300 mw-50 w-100'></div>
        </div>

        {formik.status && (
          <div className='mb-lg-10 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}

        {/* begin::Form group Firstname */}
        <div className='row fv-row mb-7'>
          <div className='col-xl-6'>

            <input
              placeholder='First name'
              type='text'
              autoComplete='off'
              style={{
                border: '1px solid #1f5f82 ', backgroundColor: 'transparent'
              }}
              {...formik.getFieldProps('firstname')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.firstname && formik.errors.firstname,
                },
                {
                  'is-valid': formik.touched.firstname && !formik.errors.firstname,
                }
              )}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.firstname}</span>
                </div>
              </div>
            )}
          </div>
          <div className='col-xl-6'>
            {/* begin::Form group Lastname */}
            <div className='fv-row '>

              <input
                placeholder='Last name'
                type='text'
                autoComplete='off'
                style={{
                  border: '1px solid #1f5f82 ', backgroundColor: 'transparent'
                }}
                {...formik.getFieldProps('lastname')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.lastname && formik.errors.lastname,
                  },
                  {
                    'is-valid': formik.touched.lastname && !formik.errors.lastname,
                  }
                )}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.lastname}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}
          </div>
        </div>


        {/* begin::Form group Email */}
        <div className='fv-row mb-7'>

          <input
            placeholder='Email'
            type='email'
            autoComplete='off'

            style={{
              border: '1px solid #1f5f82 ', backgroundColor: 'transparent'
            }}
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
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

        {/* begin::Form group Password */}
        <div className='mb-10 fv-row' data-kt-password-meter='true'>
          <div className='mb-1'>

            <div className='position-relative mb-3'>
              <input
                type='password'
                placeholder='Password'
                autoComplete='off'

                style={{ border: '1px solid #1f5f82 ', backgroundColor: 'transparent' }}
                {...formik.getFieldProps('password')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
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
            {/* begin::Meter */}
            <div
              className=' d-flex align-items-center mb-3'
              data-kt-password-meter-control='highlight'
              style={{ marginTop: '25px' }}
            >
              <div className='flex-grow-1 bg-secondary bg-active-warning rounded h-4px me-2'></div>
              <div className='flex-grow-1 bg-secondary bg-active-warning rounded h-4px me-2'></div>
              <div className='flex-grow-1 bg-secondary bg-active-warning rounded h-4px me-2'></div>
              <div className='flex-grow-1 bg-secondary bg-active-warning  rounded h-4px'></div>
            </div>
            {/* end::Meter */}
          </div>
          <div className='text-muted text-dark-blue' style={{ fontFamily: 'inherit', fontSize: '12px', fontWeight: 'light', width: '50% auto', textAlign: 'center', marginTop: '25px' }}>
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group Confirm password */}
        <div className='fv-row mb-5'>

          <input
            type='password'
            placeholder='Repeat Passsword'

            autoComplete='off'
            style={{
              border: '1px solid #1f5f82 ', backgroundColor: 'transparent'
            }}
            {...formik.getFieldProps('changepassword')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
              },
              {
                'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
              }
            )}
          />
          {formik.touched.changepassword && formik.errors.changepassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.changepassword}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row'>
          <div className='form-check form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              style={{ border: '1px solid #1f5f82 ', backgroundColor: 'transparent' }}
              type='checkbox'
              id='kt_login_toc_agree'
              {...formik.getFieldProps('acceptTerms')}
            />
            <label
              className='form-check-label fs-8'
              htmlFor='kt_login_toc_agree'
              style={{ fontFamily: 'inherit', fontSize: '14px', fontWeight: '500', color: '#05445E' }}
            >
              I Accept The {' '}
              <Link to='/auth/terms' className='ms-1 ' style={{ fontFamily: 'inherit', color: '#FFCC29', fontWeight: 'bold', fontSize: '15px' }}>
                Terms
              </Link>
              .
            </label>
            {formik.touched.acceptTerms && formik.errors.acceptTerms && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.acceptTerms}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg'
            style={{ fontFamily: 'Segoe UI', fontWeight: 'bold', backgroundColor: '#FFCC29', color: '#05445E' }}
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



          <div className='text-center ' style={{ marginTop: '10px', paddingTop: '20px' }} >
            <div style={{ fontFamily: 'inherit', fontWeight: '500', color: '#05445E' }}>
              Already have an Account ?{' '}
              <Link to='/auth/login' style={{ fontFamily: 'inherit', color: '#FFCC29', fontSize: '14px', fontWeight: 'bold' }}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
        {/* end::Form group */}
      </form>
    </div>)
}


