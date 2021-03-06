import axios from 'axios';
import { BASE_URL } from '../constants/Globals';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';
import { createVariation } from './variationActions';

export const listProducts = (pageNumber) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}api/v2/public/product?page=${pageNumber}`
    );

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.success.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/product/${id}`,
      config
    );
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct =
  (dispatch, formdata, ProductVariationList, hasVariant) => async () => {
    console.log(hasVariant);
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.success.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}api/v2/admin/product`,
        formdata,
        config
      );

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });

      dispatch(
        createVariation(
          dispatch,
          formdata,
          ProductVariationList,
          hasVariant,
          data
        )
      );
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      /*if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }*/
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };
