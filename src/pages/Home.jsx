import React from 'react'
import { HomeBanner } from '../Component/HomeBanner/HomeBanner';
import HomeProduct from '../Component/HomeProduct/HomeProduct';

const Home = () => {

    return (
        <div className='mb-5'>
            <HomeBanner />
            <HomeProduct />
        </div>
    )
}
export default Home