import {
  VARIATION_CREATE_FAIL,
  VARIATION_CREATE_REQUEST,
  VARIATION_CREATE_SUCCESS,
} from "../constants/variationConstants";

export const variationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_CREATE_REQUEST:
      return { loading: true };
    case VARIATION_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case VARIATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
