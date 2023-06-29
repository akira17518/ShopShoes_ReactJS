import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { logInAction, login } from '../Redux/Reducer/userReducer';
import { customNavigate } from '..';
import FacebookLogin from 'react-facebook-login';
import { USER_LOGIN, http, setStoreJson } from '../util/config';

const Login = () => {
    const { userLogin } = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const logIn = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values, { resetForm }) => {
            const actionLogin = login(values);
            dispatch(actionLogin)
        }
    })
    const responseFacebook = async (res) => {
        if (res.accessToken) {
            const data = { facebookToken: res.accessToken }
            const getAccount = await http.post('api/Users/facebooklogin', data);
            setStoreJson(USER_LOGIN, getAccount.data?.content);
            customNavigate.push("/profile")
        }
    }
    const checkLogin = () => {
        if (userLogin == null) {
            return
        } else {
            customNavigate.push('/profile')
        }
    }
    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={logIn.handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3 bin1">Sign in with</p>
                                <FacebookLogin
                                    appId="246304711478486"
                                    autoLoad={false}
                                    fields="name,email,phone,avatar"
                                    icon='fab fa-facebook-f'
                                    cssClass='btn btn-primary rounded-circle floating mx-1 bin1'
                                    callback={responseFacebook}
                                    textButton=''
                                ></FacebookLogin>
                                {/* <button type="button" className="btn btn-primary btn-floating mx-1 rounded-circle">
                                    <i className="fab fa-facebook-f" />
                                </button> */}
                            </div>
                            <div className="divider bin1 d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 bin1">Or</p>
                            </div>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <label className="form-label bin1" htmlFor="form3Example3">Email address</label>
                                <input type="email" id='email' name='email' onChange={logIn.handleChange} className="bin1 form-control form-control-lg" placeholder="Enter a valid email address" />
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <label className="form-label bin1" htmlFor="form3Example4">Password</label>
                                <input type="password" id='password' name='password' onChange={logIn.handleChange} className="bin1 form-control form-control-lg" placeholder="Enter password" />
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2 fst-italic">
                                <button type="submit" className="bin btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}><p className='bin1 my-auto'>Login</p></button>
                                <p className="bin1 small fw-bold mt-2 pt-2 mb-0 fs-5">Don't have an account? <NavLink to={"/register"} className='bin1'>Register Now?</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login