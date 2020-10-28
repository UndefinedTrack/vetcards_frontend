import {
  GET_AVATAR_REQUEST,
  GET_AVATAR_SUCCESS,
  GET_AVATAR_FAILURE,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getAvatarStarted= () => ({
  type: GET_AVATAR_REQUEST,
})

const getAvatarSuccess = (info) => ({
  type: GET_AVATAR_SUCCESS,
  payload: info,
})

const getAvatarFailure = (error) => ({
  type: GET_AVATAR_FAILURE,
  payload: {
    error,
  },
})

const uploadAvatarStarted = () => ({
  type: UPLOAD_AVATAR_REQUEST,
})

const uploadAvatarSuccess = (info) => ({
  type: UPLOAD_AVATAR_SUCCESS,
  payload: info,
})

const uploadAvatarFailure = (error) => ({
  type: UPLOAD_AVATAR_FAILURE,
  payload: {
    error,
  },
})

export const getUserAvatar = (uid) => {
  return (dispatch, getState) => {
    dispatch(getAvatarStarted())

    fetch(`${API_URL}/`)
    // ............
    .then((resp) => resp.json())
    .then((data) => {
      // ...
      let avatar
      dispatch(getAvatarSuccess(avatar))
    })
    .catch((err) => dispatch(getAvatarFailure(err.message)))
  }
}

export const uploadUserAvatar = (event, files = event.target.files) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('image', files[0])

    dispatch(uploadAvatarStarted())

    fetch(`${API_URL}/users/avatar`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    })
    .then((resp) => resp.json())
    .then((dat) => {
      const { userAvatar } = dat
      const  avatar = {
        id: userAvatar.id,
        avatar: userAvatar.avatar,
      }
      dispatch(uploadAvatarSuccess(avatar))
    })
    .catch((err) => dispatch(uploadAvatarFailure(err.message)))
  }
}

export const getPetAvatar = (uid) => {
  return (dispatch, getState) => {
    dispatch(getAvatarStarted())

    fetch(`${API_URL}/`)
    // ............
    .then((resp) => resp.json())
    .then((data) => {
      // ...
      let avatar
      dispatch(getAvatarSuccess(avatar))
    })
    .catch((err) => dispatch(getAvatarFailure(err.message)))
  }
}

export const uploadPetAvatar = (uid, event, files) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('image', files[0])

    dispatch(uploadAvatarStarted())

    fetch(`${API_URL}/pets/avatar`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    })
    .then((resp) => resp.json())
    .then((dat) => {
      const { petAvatar } = dat
      const  avatar = {
        id: petAvatar.id,
        user: petAvatar.user,
        avatar: petAvatar.avatar,
      }
      dispatch(uploadAvatarSuccess(avatar))
    })
    .catch((err) => dispatch(uploadAvatarFailure(err.message)))
  }
}
