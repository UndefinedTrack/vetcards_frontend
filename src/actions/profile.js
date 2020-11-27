import {
  GET_PROFILE_INFO_REQUEST,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_FAILURE,
  UPDATE_PROFILE_INFO_REQUEST,
  UPDATE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_FAILURE,
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
          region: uinfo.region,
          city: uinfo.city,
          street: uinfo.street,
          addressOther: uinfo.address,
          passport: uinfo.passport,
          paidService: uinfo.paid_service,
          avatar: uinfo.avatar,
          vet: uinfo.vet,
        }

        dispatch(getProfileInfoSuccess(user))
      })
      .catch((err) => dispatch(getProfileInfoFailure(err.message)))
  }
}

export const updateProfileInfo = (
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
          region: uinfo.region,
          city: uinfo.city,
          street: uinfo.street,
          addressOther: uinfo.address,
          passport: uinfo.passport,
          paidService: uinfo.paid_service,
          vet: uinfo.vet,
        }

        dispatch(updateProfileInfoSuccess(user))
      })
      .catch((err) => dispatch(updateProfileInfoFailure(err.message)))
  }
}
