import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../Redux/Reducer/userReducer';
import { Like } from './Like';
const Order = () => {
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
        <div><Like></Like></div>
    )
}
export default Order