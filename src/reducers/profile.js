import {
  GET_PROFILE_INFO_REQUEST,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_FAILURE,
  UPDATE_PROFILE_INFO_REQUEST,
  UPDATE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  profile: {
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
    case GET_PROFILE_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_PROFILE_INFO_SUCCESS:
      return {
        loading: false,
        error: null,
        profile: action.payload,
      }
    case GET_PROFILE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case UPDATE_PROFILE_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_PROFILE_INFO_SUCCESS:
      return {
        loading: false,
        error: null,
        profile: action.payload,
      }
    case UPDATE_PROFILE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
