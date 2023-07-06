import { Radio } from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { Formik, ErrorMessage, Field, Form, useFormik } from 'formik'
import { getProfile, update } from '../Redux/Reducer/userReducer'

const UpdateProfile = () => {
    let { userUpdate, userProfile } = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    userUpdate = { ...userProfile }
    const updateMik = useFormik({
        initialValues: {
            email: userProfile.email,
            name: userProfile.name,
            gender: userProfile.gender,
            phone: userProfile.phone,
        },
        onSubmit: (values, { resetForm }) => {
            const action = update(values);
            dispatch(action)
        },
        validationSchema: yup.object().shape({
            email: yup.string().required("Email can't be blank !").email("Email is not valid !"),
            name: yup.string().required("Name can't be blank"),
            gender: yup.string().required("Please select your gender !"),
            phone: yup.string().required("Phonenumber can't be blank !").max(10, "Phonenumber can only have 10 numbers"),
        })
    })

    return (
        <div className='container mt-5'>
            <form className="card" style={{backgroundColor:'#E0FFFF'}} onSubmit={updateMik.handleSubmit}>
                <div className="card-header">
                    <h2 className='text-center bin1'>Update Your Profile</h2>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-12">
                            <div className="avatar mx-auto w-50 d-flex">
                                <Avatar className='bin'
                                    size={{
                                        xs: 60,
                                        sm: 70,
                                        md: 80,
                                        lg: 110,
                                        xl: 130,
                                        xxl: 150,
                                    }}
                                    src={userUpdate?.avatar}
                                />
                            </div>
                        </div>
                        <div className="col-lg-8 col-12">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <p className='bin1 d-inline-block me-2'>Email</p> <span className='text-danger'>{updateMik.errors.email}</span>
                                    <input type="email" className='bin1 form-control mb-2' id='email' name='email' onChange={updateMik.handleChange} defaultValue={userUpdate?.email} />
                                </div>
                                <div className="col-md-6 col-12">
                                    <p className='bin1 d-inline-block me-2'>Name</p> <span className='text-danger'>{updateMik.errors.name}</span>
                                    <input type="text" className='bin1 form-control mb-2' id='name' name='name' onChange={updateMik.handleChange} defaultValue={userUpdate?.name} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <p className='bin1 d-inline-block me-2'>Phone</p> <span className='text-danger'>{updateMik.errors.phone}</span>
                                    <input type="number" className='bin1 form-control mb-2' id='phone' name='phone' onChange={updateMik.handleChange} defaultValue={userUpdate?.phone} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <p className='bin1 me-2'>Gender</p>
                                    <Radio.Group className='bin1' id='gender' name='gender' defaultValue={userUpdate?.gender} onChange={updateMik.handleChange} >
                                        <Radio className='bin1' value={true} id='male'>Male</Radio>
                                        <Radio className='bin1' value={false} id='female'>Femail</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-end">
                    <button className='btn btn-primary p-3 bin' type='submit'><p className='bin1 my-auto'>Update</p></button>
                </div>
            </form>
        </div>
    )
}
export default UpdateProfile