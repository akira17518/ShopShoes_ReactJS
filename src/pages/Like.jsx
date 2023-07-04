import React, { useEffect } from 'react'
import { Avatar, Button, Card, Col, Row, message, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantityAction, delCartAction, getAllProductApi } from '../Redux/Reducer/productReducer';

export const Like = () => {
    const { cart } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();
    const getProductApi = async () => {
        const actionAsync = getAllProductApi();
        dispatch(actionAsync);
    }
    // const tinhTong = () => {
    //     let sum = 0;
    //     for (let item of cart) {
    //         sum += item.quantity * item.price;
    //     } return sum
    // }
    const tongSL = () => {
        let sum = 0;
        for (let item of cart) {
            sum += item.quantity;
        } return sum
    }
    useEffect(() => {
        getProductApi();

    }, [])

    return (
        <section>
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0 bin1">Favourite - {tongSL(cart)} items</h5>
                            </div>
                            <div className="card-body">
                                {/* Single item */}
                                {cart.map((item) => {
                                    return <div className="row">
                                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                            {/* Image */}
                                            <div className="bg-image rounded hinh" >
                                                <img src={item.image} className="w-100" alt="Blue Jeans Jacket" />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }} />
                                                </a>
                                            </div>
                                            {/* Image */}
                                        </div>
                                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                            {/* Data */}
                                            <p><strong className='bin1'>{item.name}</strong></p>
                                            <p className='bin1'>Size: {item.selectedSize}</p>
                                            <button type="button" className="bin btn btn-primary btn-sm me-1 mb-2" title="Remove item" onClick={
                                                () => {
                                                    const action = delCartAction(item.id);
                                                    dispatch(action);
                                                }
                                            }>
                                                <i className="fas fa-trash bin1" />
                                            </button>

                                            <button type="button" className="btn btn-danger btn-sm mb-2" title="Move to the wish list">
                                                <i className="fas fa-heart bin1" />
                                            </button>
                                            {/* Data */}
                                        </div>
                                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                            {/* Quantity */}
                                            <div className="d-flex mb-2" style={{ maxWidth: 300 }}>
                                                <button className="bin btn btn-primary px-3 me-2" onClick={() => {
                                                    const payload = {
                                                        id: item.id,
                                                        quantity: -1
                                                    }
                                                    const action = changeQuantityAction(payload);
                                                    dispatch(action);
                                                }}><i className="fa fa-minus bin1" />
                                                </button>
                                                <div className="form-group">
                                                    <input id="form1" style={{ textAlign: 'center' }} value={item.quantity} type="number" className="form-control" />
                                                </div>
                                                <button className="bin btn btn-primary mx-2 px-3 me-2" onClick={() => {
                                                    const payload = {
                                                        id: item.id,
                                                        quantity: 1
                                                    }
                                                    const action = changeQuantityAction(payload);
                                                    dispatch(action);
                                                }}><i className="fa fa-plus bin1" />
                                                </button>
                                            </div>
                                            {/* Quantity */}
                                            {/* Price */}
                                            <p className="text-start text-md-center">
                                                <p className='bin1'>Quantity</p>
                                                <strong className='bin1'>${item.price}</strong>
                                            </p>
                                            {/* Price */}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
