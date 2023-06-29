import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './HomeBanner.css'
import { Parallax, Pagination, Navigation, Autoplay } from "swiper";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductApi } from '../../Redux/Reducer/productReducer';
import { NavLink, useParams } from 'react-router-dom';

export const HomeBanner = () => {
    const { arrProduct } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();
    const params = useParams();
    const getProductBannerApi = async () => {
        const actionAsync = getAllProductApi();
        dispatch(actionAsync);
    }
    useEffect(() => {
        getProductBannerApi();
        console.log('arrProduct', arrProduct);
    }, [])

    return (
        < >
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                speed={600}
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {arrProduct?.map((item) => {
                    return <SwiperSlide className='bin1' key={item.id}>
                        <div className="home-banner-container p-3">
                            <div className="row text-center align-items-center">
                                <div className="col-lg-6 col-12">
                                    <p className="bin1 brandname fs-4">{item.name}</p>
                                    <h3 className='bin1 display-2' style={{ color: 'violet' }}>Black Friday</h3>
                                    <p className='bin1 text-uppercase' style={{ fontSize: '150px' }}>Sale</p>
                                </div>
                                <div className="col-lg-6 col-12 text-lg-end text-sm-center">
                                    <img src={item.image} alt="shoes" className="home-banner-image" width={"350px"} />
                                    <div className="desc">
                                        <h5 style={{ fontSize: '25px' }} className='bin1'>Description</h5>
                                        <p className='bin1'>{item.shortDescription}</p>
                                        <NavLink to={`/productdetail/${item.id}`}>
                                            <button type="button"><p className='bin1 my-auto'>More Detail</p></button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    )
}
