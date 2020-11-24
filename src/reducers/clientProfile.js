import {
  GET_CLIENT_PROFILE_REQUEST,
  GET_CLIENT_PROFILE_SUCCESS,
  GET_CLIENT_PROFILE_FAILURE,
  UPDATE_CLIENT_PROFILE_REQUEST,
  UPDATE_CLIENT_PROFILE_SUCCESS,
  UPDATE_CLIENT_PROFILE_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  clientProfile: {
    userId: -1,
    username: '',
    firstName: '',
    patronymic: '',
    lastName: '',
    phone: '',
    email: '',
    avatar: '',
  },
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_CLIENT_PROFILE_SUCCESS:
      return {
        loading: false,
        error: null,
        clientProfile: action.payload,
      }
    case GET_CLIENT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case UPDATE_CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_CLIENT_PROFILE_SUCCESS:
      return {
        loading: false,
        error: null,
        clientProfile: action.payload,
      }
    case UPDATE_CLIENT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
