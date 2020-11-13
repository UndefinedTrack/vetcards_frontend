import {
  GET_PET_INFO_REQUEST,
  GET_PET_INFO_SUCCESS,
  GET_PET_INFO_FAILURE,
  UPDATE_PET_INFO_REQUEST,
  UPDATE_PET_INFO_SUCCESS,
  UPDATE_PET_INFO_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getPetInfoStarted = () => ({
  type: GET_PET_INFO_REQUEST,
})

const getPetInfoSuccess = (petInfo) => ({
  type: GET_PET_INFO_SUCCESS,
  payload: petInfo,
})

const getPetInfoFailure = (error) => ({
  type: GET_PET_INFO_FAILURE,
  payload: {
    error,
  },
})

const updatePetInfoStarted = () => ({
  type: UPDATE_PET_INFO_REQUEST,
})

const updatePetInfoSuccess = (petInfo) => ({
  type: UPDATE_PET_INFO_SUCCESS,
  payload: petInfo,
})

const updatePetInfoFailure = (error) => ({
  type: UPDATE_PET_INFO_FAILURE,
  payload: {
    error,
  },
})

export const getPetInfo = (pid, uid, token) => {
  return (dispatch, getState) => {
    dispatch(getPetInfoStarted())

    fetch(`${API_URL}/pets/info?uid=${uid}&pid=${pid}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const pinfo = data.pet
        const pet = {
          petId: pinfo.id,
          userId: pinfo.user,
          name: pinfo.name,
          species: pinfo.species,
          breed: pinfo.breed,
          color: pinfo.color,
          birthDate: pinfo.birth_date,
          gender: pinfo.gender,
          chip: pinfo.chip,
        }

        dispatch(getPetInfoSuccess(pet))
      })
      .catch((err) => dispatch(getPetInfoFailure(err.message)))
  }
}

export const updatePetInfo = (pid, uid, name, species, breed, color, birthDate, gender, chip, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pk', pid)
    data.append('user', uid)
    data.append('name', name)
    data.append('species', species)
    data.append('breed', breed)
    data.append('color', color)
    data.append('birth_date', birthDate)
    data.append('gender', gender)
    data.append('chip', chip)

    dispatch(updatePetInfoStarted())

    fetch(`${API_URL}/pets/update`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        const pinfo = dat.pet
        const pet = {
          petId: pinfo.id,
          userId: pinfo.user,
          name: pinfo.name,
          species: pinfo.species,
          breed: pinfo.breed,
          color: pinfo.color,
          birthDate: pinfo.birth_date,
          gender: pinfo.gender,
          chip: pinfo.chip,
        }
        dispatch(updatePetInfoSuccess(pet))
      })
      .catch((err) => dispatch(updatePetInfoFailure(err.message)))
  }
}
