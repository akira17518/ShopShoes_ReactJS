import { createSlice } from '@reduxjs/toolkit'
import { http, getStoreJson, USER_LOGIN } from '../../util/config';
import { setLoading } from './loadingReducer';
import axios from 'axios';
const initialState = {
    cart: [],
    arrProduct: [],
    favouriteProducts : [],
    favoriteProd : {},
    productCategory : [],

}
const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        getAllProductAction: (state, action) => {
            state.arrProduct = action.payload
        },
        getProductCategory: (state, action) => {
          state.arrProduct = action.payload
        },
        addCartAction: (state, action) => {
            let item = { ...action.payload, quantity: 1 };
            let itemCart = state.cart.find(sp => sp.id === item.id);
            if (itemCart) {
                itemCart.quantity += 1;
            } else {
                state.cart.push(item);
            }
        },
        delCartAction: (state, action) => {
            console.log(action)
            let indexDel = state.cart.findIndex(item => item.id == action.payload);
            if (indexDel !== -1) {
                state.cart.splice(indexDel, 1)
            }
        },
        changeQuantityAction: (state, action) => {
            const itemquantity = action.payload;
            let item = state.cart.find(item => item.id === itemquantity.id);
            if (item) {
                item.quantity += itemquantity.quantity;
                if (item.quantity < 1) {
                    if (window.confirm('Do you want to delete this item ?')) {
                        state.cart = state.cart.filter(sp => sp.id !== itemquantity.id);
                    } else {
                        item.quantity -= itemquantity.quantity;
                    }
                }
            }
        },
        sortProductAction: (state, action) => {
            state.arrProduct = action.payload
        },
        favouriteAction : (state,action) => {
            state.favouriteProducts = action.payload
        },
        likeAction: (state,action) => {
            state.arrProduct = action.payload
        },
        unlikeAction : (state,action) => {
           state.favoriteProd = action.payload
        },
    }
}
);
export const { getAllProductAction, addCartAction, delCartAction, changeQuantityAction, sortProductAction,favouriteAction,likeAction,unlikeAction, getProductCategory } = productReducer.actions
export default productReducer.reducer
export const getAllProductApi = (value) => {

    return async (dispatch) => {
        let loadingState = setLoading('block');
        dispatch(loadingState);
        let res =   await axios ({
                 url : `https://shop.cyberlearn.vn/api/Product?keyword= ${value}`,
                 method : 'GET'
             })
        const actionProduct = getAllProductAction(res.data.content);//fulfill
        dispatch(actionProduct);
        let loadingStateNone = setLoading('none');
        dispatch(loadingStateNone);
    }
}
// export  const getProductCategoryApi =  (value) => {
//   return async (dispatch) => {
//    try {
//      let res =   await axios ({
//        url : `https://shop.cyberlearn.vn/api/Product?keyword= ${value}`,
//        method : 'GET'
//    })
 
//    const action2 = getProductCategory(res.data.content)
//    dispatch(action2)
//    }catch(err) {
//      console.log(err)
//    }
    
//   }

// }
export const favouriteActionApi = async(dispatch) => {
    try{
      let res = await axios({
        url: 'https://shop.cyberlearn.vn/api/Users/getproductfavorite',
        method : 'GET',
        headers : {
          Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
        }
      })
      const action = favouriteAction(res.data.content.productsFavorite)
      dispatch(action)
  }catch(err) {
      console.log(err)
    }
    
  }
  
export const likeActionApi = (productId) => {
    return async (dispatch) => {
        try {
          let res = await axios ({
            url : `https://shop.cyberlearn.vn/api/Users/like?productId=${productId}`,
            method : 'GET',
          
            headers : {
              Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
            }
          })
          const action = likeAction(res.data.content);
          dispatch(action)
        }catch(err) {
          console.log(err)
        }
     }
  }
  
  export const unlikeActionApi = (productId) => {
    return async (dispatch) => {
      try {
        let res = await axios ({
          url : `https://shop.cyberlearn.vn/api/Users/unlike?productId=${productId}`,
          method : 'GET',
        
          headers : {
            Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
          }
        })
        
        const action = unlikeAction(res.data.content);
        dispatch(action)
      }catch(err) {
        console.log(err)
      }
    
    }
  }

