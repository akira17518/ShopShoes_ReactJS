import React, { useState } from 'react'
import { createBrowserHistory } from 'history'
import { NavLink, Outlet } from 'react-router-dom'
import Header from '../Component/Header'

const HomeTemplate = () => {
    return <>
        <div className='header'>
            <Header></Header>
        </div>
        <div className="content align-items-center" style={{ minHeight: "650px" }}>
            <Outlet></Outlet>
        </div>
        <footer className="site-footer mx-auto my-auto bin1 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 bin1">
                        <h6 className='bin1'>About</h6>
                        <span className="text-justify">It's free to sign up! Earn a point for every dollar you spend and receive exclusive
                            benefits.<br /> Join Now By signing up via text, you agree to receive recurring automated marketing text
                            messages
                            from Shoe Carnival at the cell number used when signing up. Consent is not a condition of any purchase. If
                            you are under 18, you must get consent from your parent or guardian.</span>
                    </div>
                    <div className="col-xs-6 col-md-3" style={{ paddingLeft: '90px' }}>
                        <h6 className='bin1'>Useful</h6>
                        <ul className="footer-links">
                            <li><a className='bin1' href="http://scanfcode.com/category/c-language/">About</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/category/front-end-development/">Register</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/category/back-end-development/">Help</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/category/java-programming-language/">Home</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/category/android/">Product</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6 className='bin1'>Quick Links</h6>
                        <ul className="footer-links">
                            <li><a className='bin1' href="http://scanfcode.com/about/">About Us</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/contact/">Contact Us</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                            <li><a className='bin1' href="http://scanfcode.com/sitemap/">Sitemap</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">Copyright © 2023 All Rights Reserved by
                            <a href="#" className='mx-1 bin1'>ShopShoe</a>
                        </p>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li><a className="facebook bin1" href="#"><i className="fa fa-facebook" /></a></li>
                            <li><a className="twitter bin1" href="#"><i className="fa fa-twitter" /></a></li>
                            <li><a className="dribbble bin1" href="#"><i className="fa fa-dribbble" /></a></li>
                            <li><a className="linkedin bin1" href="#"><i className="fa fa-linkedin" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
export default HomeTemplate