import { Card, Col, Input, Row } from 'antd';
import axios from 'axios';
import { HeartFilled } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import { http } from '../util/config';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductApi } from '../Redux/Reducer/productReducer';

const { Meta } = Card;
const { Search } = Input;
const SearchProduct = () => {
    const [arrProduct, setArrProduct] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const keywordRef = useRef('');
    let keyword = searchParams.get('keyword');
    const getProductByKeyWord = async () => {
        console.log(keyword)
        let res = await http.get(`https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`);
        if (res) {
            setArrProduct(res.data.content);
        }
    }
    useEffect(() => {
        if (keyword != null) {
            //gọi api khi word khác null
            getProductByKeyWord();
        }
    }, [keyword]);
    const handleChange = (e) => {
        let { value } = e.target;
        keywordRef.current = value;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('keyword', keywordRef.current)
        setSearchParams({
            keyword: keywordRef.current
        })
    };

    return (
        <div className='container'>
            <h3 className='bin1 my-3'>Find your Shoes</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3" >
                    <input className='form-control bin1' id='txtTuKhoa' onChange={handleChange} />
                    <button type="submit" className="bin btn btn-outline-primary"><p className='bin1 my-2'>Search</p></button>
                </div>
                <h3 className='bin1 '>Search Results</h3>
                <Row gutter={[15, 20]}>
                    {arrProduct.map((item) => {
                        return <Col lg={8} key={item.id}>
                            <Card hoverable className='abc my-3'
                                style={{
                                    width: 400,
                                    backgroundColor: '#FAF0E6'
                                }}
                                cover={
                                    <img className='xyz'
                                        alt="example"
                                        src={item.image}
                                    />
                                }
                                actions={[
                                    <p className='bin btn btn-danger btn-circle btn-lg my-3'><NavLink className='bin1' to={`/productdetail/${item.id}`}>More Detail </NavLink></p>,
                                    <HeartFilled className='bin1 my-4' />,
                                ]}
                            >
                                <Meta
                                    title={item.name}
                                    description={item.shortDescription}
                                />
                            </Card>
                        </Col>
                    })}
                </Row>
            </form>
        </div>
    )
}
export default SearchProduct