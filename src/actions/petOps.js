import {
  CREATE_PET_REQUEST,
  CREATE_PET_SUCCESS,
  CREATE_PET_FAILURE,
  DELETE_PET_REQUEST,
  DELETE_PET_SUCCESS,
  DELETE_PET_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const createPetStarted = () => ({
  type: CREATE_PET_REQUEST,
})

const createPetSuccess = (petInfo) => ({
  type: CREATE_PET_SUCCESS,
  payload: petInfo,
})

const createPetFailure = (error) => ({
  type: CREATE_PET_FAILURE,
  payload: {
    error,
  },
})

const deletePetStarted = () => ({
  type: DELETE_PET_REQUEST,
})

const deletePetSuccess = (status) => ({
  type: DELETE_PET_SUCCESS,
  payload: status,
})

const deletePetFailure = (error) => ({
  type: DELETE_PET_FAILURE,
  payload: {
    error,
  },
})

export const createPet = (uid, name, species, breed, color, birthDate, gender, chip) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('user', uid)
    data.append('name', name)
    data.append('species', species)
    data.append('breed', breed)
    data.append('color', color)
    data.append('birth_date', birthDate)
    data.append('gender', gender)
    data.append('chip', chip)

    dispatch(createPetStarted())

    fetch(`${API_URL}/pets/create`, { method: 'POST', body: data /* credentials: 'include' */ })
      .then((resp) => resp.json())
      .then((dat) => dispatch(createPetSuccess(dat)))
      .catch((err) => dispatch(createPetFailure(err.message)))
  }
}

export const deletePet = (uid, pid) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('uid', uid)
    data.append('pid', pid)
    dispatch(deletePetStarted())

    fetch(`${API_URL}/pets/delete`, { method: 'POST', body: data, credentials: 'include' })
      .then((resp) => resp.json())
      .then((dat) => dispatch(deletePetSuccess(dat)))
      .catch((err) => dispatch(deletePetFailure(err.message)))
  }
}
