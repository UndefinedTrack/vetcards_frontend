import {
  GET_PROFILE_INFO_REQUEST,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_FAILURE,
  UPDATE_PROFILE_INFO_REQUEST,
  UPDATE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_FAILURE,
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

const getProfileInfoStarted = () => ({
  type: GET_PROFILE_INFO_REQUEST,
})

const getProfileInfoSuccess = (info) => ({
  type: GET_PROFILE_INFO_SUCCESS,
  payload: info,
})

const getProfileInfoFailure = (error) => ({
  type: GET_PROFILE_INFO_FAILURE,
  payload: {
    error,
  },
})

const updateProfileInfoStarted = () => ({
  type: UPDATE_PROFILE_INFO_REQUEST,
})

const updateProfileInfoSuccess = (info) => ({
  type: UPDATE_PROFILE_INFO_SUCCESS,
  payload: info,
})

const updateProfileInfoFailure = (error) => ({
  type: UPDATE_PROFILE_INFO_FAILURE,
  payload: {
    error,
  },
})

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

export const getUserProfileInfo = (uid, token) => {
  return (dispatch, getState) => {
    dispatch(getProfileInfoStarted())

    fetch(`${API_URL}/users/info?uid=${uid}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const uinfo = data.user
        const user = {
          userId: uinfo.id,
          username: uinfo.username,
          firstName: uinfo.first_name,
          patronymic: uinfo.patronymic,
          lastName: uinfo.last_name,
          phone: uinfo.phone,
          email: uinfo.email,
          vet: uinfo.vet,
        }

        dispatch(getProfileInfoSuccess(user))
      })
      .catch((err) => dispatch(getProfileInfoFailure(err.message)))
  }
}

export const updateProfileInfo = (uid, firstName, patronymic, lastName, phone, email, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pk', uid)
    data.append('first_name', firstName)
    data.append('patronymic', patronymic)
    data.append('last_name', lastName)
    data.append('phone', phone)
    data.append('email', email)
    dispatch(updateProfileInfoStarted())

    fetch(`${API_URL}/users/update`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        const uinfo = dat.user
        const user = {
          userId: uinfo.id,
          username: uinfo.username,
          firstName: uinfo.first_name,
          patronymic: uinfo.patronymic,
          lastName: uinfo.last_name,
          phone: uinfo.phone,
          email: uinfo.email,
        }
        dispatch(updateProfileInfoSuccess(user))
      })
      .catch((err) => dispatch(updateProfileInfoFailure(err.message)))
  }
}

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
          }

          patients.push(patient)
        })

        dispatch(getPatientsListSuccess(patients))
      })
      .catch((err) => dispatch(getPatientsListFailure(err.message)))
  }
}
