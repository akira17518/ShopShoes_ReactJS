import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ShoppingCartOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { USER_LOGIN } from '../util/config';
import { getProfileAction, logInAction } from '../Redux/Reducer/userReducer';

const Header = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.productReducer);
    const { userProfile } = useSelector(state => state.userReducer);
    const getProfileLink = () => {
        if (userProfile == null) {
            return null
        } else {
            return <Avatar className='bin bin1'
                size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 70,
                    xxl: 75,
                }}
                src={userProfile?.avatar}
            />

        }
    }
    const getLink = (route) => {
        if (userProfile == null) {
            // eslint-disable-next-line default-case
            switch (route) {
                case "/register": {
                    return <NavLink className="nav-link bin1" to="/register">Register</NavLink>
                }
                case "/login": {
                    return <NavLink className="nav-link bin1" to="/login">Login</NavLink>
                }
            }
        } else {
            return null
        }
    }
    const items = [
        {
            label: <NavLink className="nav-link mt-2 bin1" to="/profile">Profile</NavLink>,
            key: '0',
            icon: <UserOutlined className='bin1' />
        },
        {
            label: <NavLink className="nav-link mt-2 bin1" to="/order">Order History</NavLink>,
            key: '2',
            icon: <ShoppingCartOutlined className='bin1' />
        },
        {
            label: <NavLink className="nav-link mt-2 bin1" to="/update">Update Your Profile</NavLink>,
            key: '3',
            icon: <EditOutlined className='bin1' />
        },
        {
            type: 'divider',
        },
        {
            label: <NavLink className="nav-link mt-2 bin1" to="/login" onClick={() => {
                signOut()
            }}>Sign Out</NavLink>,
            key: '4',
            icon: <LogoutOutlined className='bin1' />
        },
    ]
    const signOut = () => {
        localStorage.removeItem(USER_LOGIN);
        const clearUser = logInAction(null)
        const clearProfile = getProfileAction(null);
        dispatch(clearUser);
        dispatch(clearProfile)
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ background: 'rgb(0,0,0)' }}>
            <NavLink className="navbar-brand px-2" to="/">
                <img src='./images/image 3.png' alt='logo' className='bin bin1' width={100} height={50}></img>
            </NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-2 align-items-center" id="collapsibleNavId">
                <div className="left-menu">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0 mx-5">
                        <Dropdown menu={{ items }} >
                            <a onClick={(e) => e.preventDefault()}>
                                {getProfileLink()}
                            </a>
                        </Dropdown>
                        <li className="nav-item">
                            {getLink("/register")}
                        </li>
                        <li className="nav-item">
                            {getLink('/login')}
                        </li>
                    </ul>
                </div>
                <div className="right-menu">
                    <ul className="navbar-nav  mt-lg-0 align-items-center">
                        <li className="nav-item" style={{ marginRight: '45px' }}>
                            <NavLink className="nav-link bin1" to="/cart" > <ShoppingCartOutlined style={{
                                fontSize: '30px'
                            }} /><span className='cart-plus'>{cart.length}</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="navbar-brand mx-3 fs-3" to="/search">
                                <form className="d-flex my-2 my-lg-0 bin1">
                                    <input className="form-control me-sm-2 bin1" type="text" placeholder="Search" />
                                    <button className="bin btn btn-outline-success my-auto my-sm-0" type="submit"><p className='bin1 my-auto'>Search</p></button>
                                </form>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header