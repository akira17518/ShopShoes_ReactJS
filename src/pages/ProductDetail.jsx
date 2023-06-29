import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { http } from '../util/config';
import { ShoppingCartOutlined, HeartFilled } from '@ant-design/icons';
import { Button, Card, Col, Form, Row, Space, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartAction } from '../Redux/Reducer/productReducer';
import { useFormik } from 'formik';
import * as yup from 'yup'

const { Meta } = Card;
const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState({})
    const params = useParams();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const selectmik = useFormik({
        initialValues: {
            size: '',
        },
        onSubmit: (value) => {
        },
        validationSchema: yup.object().shape({
            size: yup.string().required("Please choose your size")
        })
    })
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Add to Cart Success',
            duration: 5,
        });
    };
    const getProductDetail = async () => {
        const res = await http.get(`/api/product/getbyid?id=${params.id}`);
        if (res) {
            setProductDetail(res.data.content);
        }
    }
    const handleChangeSize = (e) => {
        console.log(e.target.value)
        setProductDetail({
            ...productDetail,
            selectedSize: e.target.value
        })
    };
    useEffect(() => {
        //Call api
        getProductDetail();
    }, [params.id])

    return (
        <div className='container mt-4'>
            {contextHolder}
            <Row gutter={[20, 20]} >
                <Col lg={8}>
                    <Card className='card' style={{ backgroundColor: '#FAF0E6' }} hoverable cover={<img className='hinh' alt="example" src={productDetail.image} />}>
                    </Card>
                </Col>
                <Col lg={16}>
                    <h3 className='bin1'>{productDetail.name}</h3>
                    <p className='bin1'>{productDetail.description}</p>
                    <p className='bin1'>{productDetail.shortDescription}</p>
                    <h3 className='bin1'>Quantity: {productDetail.quantity}</h3>
                    <h3 className='bin1'>Price: {productDetail.price} $</h3>
                    <Space wrap className='mt-3'>
                        <select class="form-select mx-auto bin1" aria-label="Default select example" onChange={handleChangeSize} >
                            <option selected value='1'>Choose your size</option>
                            {productDetail.size?.map((item) => {
                                return <option value={item.selectedSize}>{item}</option>
                            })}
                        </select> <span className='text-danger'>{selectmik.errors.size}</span>
                    </Space>
                    <NavLink to={'/login'} className="nav-item" style={{ textDecoration: 'none' }}>
                        <Button size='large' className='mt-4 d-block nt bin' onClick={() => {
                            const action = addCartAction(productDetail);
                            dispatch(action);
                            console.log(action)
                            success(action);
                        }} > <ShoppingCartOutlined className='align-middle bin1' /> <a className='bin1'>Add to cart</a>
                        </Button>
                    </NavLink>
                </Col>
            </Row>
            <div className='mt-5'>
                <h2 className='bin1 py-3'>Related Product</h2>
                <Row gutter={[15, 20]}>
                    {productDetail.relatedProducts?.map((item) => {
                        return <Col lg={8} key={item.id}>
                            <Card hoverable className='abc'
                                style={{
                                    width: 400,
                                    background: '#FAF0E6'
                                }}
                                cover={
                                    <img className='xyz'
                                        alt="example"
                                        src={item.image}
                                    />
                                }
                                actions={[
                                    <NavLink to={`/productdetail/${item.id}`}><button className='btn btn-danger'><p className='bin1 my-2'>More Detail</p></button></NavLink>,
                                    <HeartFilled className='bin1 my-3' />,
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
            </div>
        </div >
    )
}
export default ProductDetail