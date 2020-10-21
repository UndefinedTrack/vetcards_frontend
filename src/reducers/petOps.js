import {
    CREATE_PET_REQUEST,
    CREATE_PET_SUCCESS,
    CREATE_PET_FAILURE,
    DELETE_PET_REQUEST,
    DELETE_PET_SUCCESS,
    DELETE_PET_FAILURE
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    pet: null,
    status: 'fail',
    error: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case CREATE_PET_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_PET_SUCCESS:
            return {
                loading: false,
                error: null,
                pet: action.payload
            }
        case CREATE_PET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case DELETE_PET_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_PET_SUCCESS:
            return {
                loading: false,
                error: null,
                status: action.payload
            }
        case DELETE_PET_FAILURE:
            return {
                ...state,
                loading: false,
                status: 'fail',
                error: action.payload.error
            }
        default:
            return state
    }
}