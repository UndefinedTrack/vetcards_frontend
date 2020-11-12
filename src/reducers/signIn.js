import {
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  REFRESH_JWT_REQUEST,
  REFRESH_JWT_SUCCESS,
  REFRESH_JWT_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  user: {
    email: '',
    id: '',
    username: '',
    access: '',
  },
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ME_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ME_SUCCESS:
      return {
        loading: false,
        error: null,
        user: action.payload,
      }
    case GET_ME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case REFRESH_JWT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case REFRESH_JWT_SUCCESS:
      return {
        loading: false,
        error: null,
        user: action.payload,
      }
    case REFRESH_JWT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
