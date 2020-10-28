import {
    GET_AVATAR_REQUEST,
    GET_AVATAR_SUCCESS,
    GET_AVATAR_FAILURE,
    UPLOAD_AVATAR_REQUEST,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    avatar: '',
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AVATAR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_AVATAR_SUCCESS:
            return {
                loading: false,
                error: null,
                avatar: action.payload,
            }
        case GET_AVATAR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case UPLOAD_AVATAR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPLOAD_AVATAR_SUCCESS:
            return {
                loading: false,
                error: null,
                avatar: action.payload,
            }
        case UPLOAD_AVATAR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}
