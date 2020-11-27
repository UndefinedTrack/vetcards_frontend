import {
  GET_CLIENT_PROFILE_REQUEST,
  GET_CLIENT_PROFILE_SUCCESS,
  GET_CLIENT_PROFILE_FAILURE,
  UPDATE_CLIENT_PROFILE_REQUEST,
  UPDATE_CLIENT_PROFILE_SUCCESS,
  UPDATE_CLIENT_PROFILE_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getClientProfileStarted = () => ({
  type: GET_CLIENT_PROFILE_REQUEST,
})

const getClientProfileSuccess = (info) => ({
  type: GET_CLIENT_PROFILE_SUCCESS,
  payload: info,
})

const getClientProfileFailure = (error) => ({
  type: GET_CLIENT_PROFILE_FAILURE,
  payload: {
    error,
  },
})

const updateClientProfileStarted = () => ({
  type: UPDATE_CLIENT_PROFILE_REQUEST,
})

const updateClientProfileSuccess = (info) => ({
  type: UPDATE_CLIENT_PROFILE_SUCCESS,
  payload: info,
})

const updateClientProfileFailure = (error) => ({
  type: UPDATE_CLIENT_PROFILE_FAILURE,
  payload: {
    error,
  },
})

export const getClientProfileInfo = (uid, token) => {
  return (dispatch, getState) => {
    dispatch(getClientProfileStarted())

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
          region: uinfo.region,
          city: uinfo.city,
          street: uinfo.street,
          addressOther: uinfo.address,
          passport: uinfo.passport,
          paidService: uinfo.paid_service,
          avatar: uinfo.avatar,
          vet: uinfo.vet,
        }

        dispatch(getClientProfileSuccess(user))
      })
      .catch((err) => dispatch(getClientProfileFailure(err.message)))
  }
}

export const updateClientProfileInfo = (
  uid,
  firstName,
  patronymic,
  lastName,
  phone,
  email,
  region,
  city,
  street,
  addressOther,
  paidService,
  token,
) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pk', uid)
    data.append('first_name', firstName)
    data.append('patronymic', patronymic)
    data.append('last_name', lastName)
    data.append('phone', phone)
    data.append('email', email)
    data.append('region', region)
    data.append('city', city)
    data.append('street', street)
    data.append('address', addressOther)
    data.append('passport', '')
    data.append('paid_service', paidService)
    dispatch(updateClientProfileStarted())

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
          region: uinfo.region,
          city: uinfo.city,
          street: uinfo.street,
          addressOther: uinfo.address,
          passport: uinfo.passport,
          paidService: uinfo.paid_service,
        }

        dispatch(updateClientProfileSuccess(user))
      })
      .catch((err) => dispatch(updateClientProfileFailure(err.message)))
  }
}
