import {
    GET_PET_INFO_REQUEST,
    GET_PET_INFO_SUCCESS,
    GET_PET_INFO_FAILURE,
    UPDATE_PET_INFO_REQUEST,
    UPDATE_PET_INFO_SUCCESS,
    UPDATE_PET_INFO_FAILURE
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    pet: {
        petId: -1,
        userId: -1,
        name: '',
        species: '',
        color: '',
        birthDate: '',
        gender: '',
        chip: '',
    },
    error: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PET_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PET_INFO_SUCCESS:
            return {
                loading: false,
                error: null,
                pet: action.payload
            }
        case GET_PET_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case UPDATE_PET_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PET_INFO_SUCCESS:
            return {
                loading: false,
                error: null,
                pet: action.payload
            }
        case UPDATE_PET_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}