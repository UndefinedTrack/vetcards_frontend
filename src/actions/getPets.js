import {
  GET_PETS_LIST_REQUEST,
  GET_PETS_LIST_SUCCESS,
  GET_PETS_LIST_FAILURE,
  GET_PATIENTS_LIST_REQUEST,
  GET_PATIENTS_LIST_SUCCESS,
  GET_PATIENTS_LIST_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getPetsListStarted = () => ({
  type: GET_PETS_LIST_REQUEST,
})

const getPetsListSuccess = (pets) => ({
  type: GET_PETS_LIST_SUCCESS,
  payload: pets,
})

const getPetsListFailure = (error) => ({
  type: GET_PETS_LIST_FAILURE,
  payload: {
    error,
  },
})

const getPatientsListStarted = () => ({
  type: GET_PATIENTS_LIST_REQUEST,
})

const getPatientsListSuccess = (patients) => ({
  type: GET_PATIENTS_LIST_SUCCESS,
  payload: patients,
})

const getPatientsListFailure = (error) => ({
  type: GET_PATIENTS_LIST_FAILURE,
  payload: {
    error,
  },
})

export const getPetsList = (uid, token) => {
  return (dispatch, getState) => {
    dispatch(getPetsListStarted())

    fetch(`${API_URL}/pets/list?uid=${uid}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const pets = []
        const pinfo = data.pets

        pinfo.forEach((pt) => {
          const pet = {
            petId: pt.id,
            userId: pt.user_id,
            name: pt.name,
            species: pt.species,
            breed: pt.breed,
            color: pt.color,
            birthDate: pt.birth_date,
            gender: pt.gender,
            chip: pt.chip,
            avatar: pt.avatar,
          }

          pets.push(pet)
        })

        dispatch(getPetsListSuccess(pets))
      })
      .catch((err) => dispatch(getPetsListFailure(err.message)))
  }
}

export const getPatientsList = (uid, token) => {
  return (dispatch, getState) => {
    dispatch(getPatientsListStarted())

    fetch(`${API_URL}/pets/patients?uid=${uid}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const patients = []
        const pinfo = data.patients

        pinfo.forEach((pt) => {
          const patient = {
            patient: pt.patient,
            owner: pt.owner,
            card: pt.card,
            color: pt.color,
            birthDate: pt.birth_date,
            gender: pt.gender,
            chip: pt.chip,
            avatar: pt.avatar,
          }

          patients.push(patient)
        })

        dispatch(getPatientsListSuccess(patients))
      })
      .catch((err) => dispatch(getPatientsListFailure(err.message)))
  }
}
