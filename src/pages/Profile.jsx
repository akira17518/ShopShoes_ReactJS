import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../Redux/Reducer/userReducer';
import { Avatar, Radio } from 'antd';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  const { userProfile } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const getUserProfile = async () => {
    const action = await getProfile();
    dispatch(action)
  }
  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <div className='container mt-5'>
      <div className="bin card">
        <div className="card-header">
          <h2 className='text-center bin1'>Your Profile</h2>
        </div>
        <div className="card-body">
          <div className="row align-items-center ">
            <div className="col-lg-4 col-12 mx-auto">
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
                  src={userProfile?.avatar}
                />
              </div>
            </div>
            <div className="col-lg-8 col-12">
              <div className="row">
                <div className="col-md-6 col-12">
                  <p className='bin1 d-inline-block me-2'>Email</p>
                  <input type="email" className='bin1 form-control mb-2' id='email' name='email' value={userProfile?.email} disabled={true} />
                </div>
                <div className="col-md-6 col-12">
                  <p className='bin1 d-inline-block me-2'>Name</p>
                  <input type="text" className='bin1 form-control mb-2' id='name' name='name' disabled={true} value={userProfile?.name} />
                </div>
              </div>
              <div className="col-md-6 col-12">
              </div>
              <div className=" col-12">
                <p className='bin1 d-inline-block me-2'>Phone</p>
                <input type="number" className='bin1 form-control mb-2' id='phone' name='phone' disabled={true} value={userProfile?.phone} />
              </div>
              <div className="col-md-12 col-12">
                <p className='bin1 me-2'>Gender</p>
                <Radio.Group className='bin1' id='gender' name='gender' defaultValue={true} disabled={true} value={userProfile?.gender}>
                  <Radio className='bin1' value={true} id='male'>Male</Radio>
                  <Radio className='bin1' value={false} id='female'>Femail</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-end p-3">
          <NavLink className='bin btn btn-primary text-white p-3' to={"/"}>
            <p className='bin1 my-auto'>Go To Store</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default Profile