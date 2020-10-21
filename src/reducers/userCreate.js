import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    user: null,
    error: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_USER_SUCCESS:
            return {
                loading: false,
                error: null,
                user: action.payload
            }
        case CREATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}