import React, { useEffect, useState } from 'react'
import { Avatar, Card, Col, Row } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { orderBy } from 'lodash';
import { getAllProductApi, sortProductAction } from '../../Redux/Reducer/productReducer';
import { NavLink } from 'react-router-dom';
import './HomeProduct.css';

const { Meta } = Card;
const HomeProduct = () => {
    const [sortBy, setSortBy] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);
    const { arrProduct } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();
    const getProductApi = async () => {
        const actionAsync = getAllProductApi(selectedCategory);
        dispatch(actionAsync);
    }
    useEffect(() => {
        getProductApi();
    }, [selectedCategory]);

    const handleSort = (e) => {
        const sortByValue = e.target.value;
        setSortBy(sortByValue);
    };

    useEffect(() => {
        let sortedProducts = [...arrProduct];

        if (sortBy === 'ascending') {
            sortedProducts = orderBy(sortedProducts, 'price', 'ascending');
        } else if (sortBy === 'descending') {
            sortedProducts = orderBy(sortedProducts, 'price', 'descending');
        } else {
            sortedProducts = [...arrProduct];
        }

        const action = sortProductAction(sortedProducts);
        dispatch(action);
    }, [sortBy]);

    return (
        <div className='container mt-5'>
            <div className={'SearchBar d-flex'}>
                <div className='price-select'>
                    <select onChange={handleSort} name="sort-by-price">
                        <option value="none">Sort by price</option>
                        <option value="descending">Descending</option>
                        <option value="ascending">Ascending</option>
                    </select>
                </div>
            </div>
            <h1 className='bin1 text-center mb-5'>Product Categories</h1>
            <Row gutter={[20, 20]}>
                {arrProduct?.map((item) => {
                    return <Col lg={8} key={item.id}>
                        <Card hoverable className='carditem mt-3 px-3'
                            style={{
                                width: 400,
                                background: '#FAF0E6'
                            }}
                            cover={
                                <img className='product-image'
                                    alt="example"
                                    src={item.image}
                                />
                            }
                            actions={[
                                <NavLink to={`/productdetail/${item.id}`}><button className='btn btn-danger'><p className='bin1 my-2 '>More Detail</p></button></NavLink>,
                                <HeartFilled className='bin1 my-3' />,
                            ]}
                        >
                            <Meta className='bin1'
                                title={item.name}
                                description={item.shortDescription}
                            />
                            <div className='price bin1 mt-2 d-flex justify-content-center'>{item.price}$</div>
                        </Card>
                    </Col>
                })}
            </Row >
        </div >
    )
}
export default HomeProduct