import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_LOGIN, getStoreJson, http, setCookieJson, setStoreJson } from '../../util/config';
import { customNavigate } from '../..';
import { setLoading } from './loadingReducer';

const initialState = {
    userRegister: {},
    userLogin: getStoreJson(USER_LOGIN) || null,
    userProfile: null,
    userUpdate: null
}
const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        signUpAction: (state, action) => {
            state.userRegister = action.payload
        },
        logInAction: (state, action) => {
            state.userLogin = action.payload
        },
        getProfileAction: (state, action) => {
            state.userProfile = action.payload
        },
        updateAction: (state, action) => {
            state.userUpdate = action.payload
        }
    }
});
export const { signUpAction, logInAction, getProfileAction, updateAction } = userReducer.actions
export default userReducer.reducer
// Async action
export const signUp = (userInfo) => {
    return async dispatch => {
        const res = await http.post('api/Users/signup', userInfo)
        if (res) {
            window.alert("Bạn đã đăng ký tài khoản thành công !")
            const action = signUpAction(userInfo);
            dispatch(action);
        }
    }
}
export const login = (userLogin) => {
    return async dispatch => {
        const res = await http.post('api/Users/signin', userLogin)
        if (res) {
            setStoreJson(USER_LOGIN, res.data.content);
            const action = logInAction(userLogin);
            dispatch(action);
            customNavigate.push('/profile')
        }
    }
}
export const getProfile = () => {
    return async dispatch => {
        const res = await http.post('api/Users/getProfile', null)
        if (res) {
            console.log(res.data);
            const action = getProfileAction(res.data.content);
            dispatch(action);
        } else {
            customNavigate.push('/login');
        }
    }
}
export const update = (userUpdate) => {
    return async dispatch => {
        const res = await http.post('api/Users/updateProfile', userUpdate)
        if (res) {
            const action = updateAction(userUpdate);
            dispatch(action);
            window.alert("Update thông tin thành công");
            customNavigate.push('/profile')
        }
    }
}