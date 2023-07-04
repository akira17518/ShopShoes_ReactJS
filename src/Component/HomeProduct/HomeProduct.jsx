import React, { useEffect, useState } from 'react'
import { Avatar, Card, Col, Row } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { orderBy } from 'lodash';
import { getAllProductApi, sortProductAction,favouriteActionApi,likeActionApi,unlikeActionApi } from '../../Redux/Reducer/productReducer';
import { NavLink } from 'react-router-dom';
import './HomeProduct.css';

const { Meta } = Card;
const HomeProduct = () => {
    const [sortBy, setSortBy] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);
    const { arrProduct } = useSelector(state => state.productReducer);
    const [favoriteStatus, setFavoriteStatus] = useState({});
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

    
    const handleLikeClick = (sneakerId) => {
        const isFavorite = favoriteStatus[sneakerId];
        const updatedStatus = { ...favoriteStatus };
        updatedStatus[sneakerId] = !isFavorite;
        setFavoriteStatus(updatedStatus);
    
     
        if (isFavorite) {
          const action = unlikeActionApi(sneakerId);
          dispatch(action);
        } else {
          const action = likeActionApi(sneakerId);
          dispatch(action);
        }
      };
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
                <div>
                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">All Product</option>
                            <option value="nike">Nike</option>
                            <option value="adidas">Adidas</option>
                            <option value="vans">Vans</option>
                            <option value="converse">Converse</option>
                    </select>
                </div>
            </div>
            <h1 className='bin1 text-center mb-5'>Product Categories</h1>
            <Row gutter={[20, 20]}>
                {arrProduct?.map((item) => {
                    const isFavorite = favoriteStatus[item.id];
                    const heartClassName = isFavorite ? 'fa fa-heart text-danger' : 'fa fa-heart';

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
                                // <div className='heart-icon' style={{
                                //     // position: absolute,
                                //     top: 10,
                                //     right: 10, 
                                // }}  onClick={() => handleLikeClick(item.id)}>
                                //     <i className={`${heartClassName} `}></i>
                                // </div>
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