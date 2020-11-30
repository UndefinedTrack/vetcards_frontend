import {
  CREATE_NOTIFICATION_REQUEST,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getNotificationsStarted = () => ({
  type: GET_NOTIFICATIONS_REQUEST,
})

const getNotificationsSuccess = (info) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: info,
})

const getNotificationsFailure = (error) => ({
  type: GET_NOTIFICATIONS_FAILURE,
  payload: {
    error,
  },
})

const createNotificationStarted = () => ({
  type: CREATE_NOTIFICATION_REQUEST,
})

const createNotificationSuccess = (info) => ({
  type: CREATE_NOTIFICATION_SUCCESS,
  payload: info,
})

const createNotificationFailure = (error) => ({
  type: CREATE_NOTIFICATION_FAILURE,
  payload: {
    error,
  },
})

const deleteNotificationStarted = () => ({
  type: DELETE_NOTIFICATION_REQUEST,
})

const deleteNotificationSuccess = (info) => ({
  type: DELETE_NOTIFICATION_SUCCESS,
  payload: info,
})

const deleteNotificationFailure = (error) => ({
  type: DELETE_NOTIFICATION_FAILURE,
  payload: {
    error,
  },
})

const updateNotificationStarted = () => ({
  type: UPDATE_NOTIFICATION_REQUEST,
})

const updateNotificationSuccess = (info) => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
  payload: info,
})

const updateNotificationFailure = (error) => ({
  type: UPDATE_NOTIFICATION_FAILURE,
  payload: {
    error,
  },
})

export const getNotifications = (pid, uid, token) => {
  return (dispatch, getState) => {
    dispatch(getNotificationsStarted())

    fetch(`${API_URL}/notifications/list?pid=${pid}&uid=${uid}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const notifications = []
        const ninfo = data.notifications

        ninfo.forEach((notif) => {
          const notification = {
            notifId: notif.id,
            petId: notif.pet_id,
            userId: notif.user_id,
            description: notif.description,
            repeat: notif.repeat,
            date: notif.notif_date,
            name: notif.notif_type,
          }

          notifications.push(notification)
        })

        dispatch(getNotificationsSuccess(notifications))
      })
      .catch((err) => dispatch(getNotificationsFailure(err.message)))
  }
}

export const createNewNotification = (pid, uid, notifType, description, repeat, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pet', pid)
    data.append('user', uid)
    data.append('notif_type', notifType)
    data.append('description', description)
    data.append('repeat', repeat)

    dispatch(createNotificationStarted())

    fetch(`${API_URL}/notifications/create`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => dispatch(createNotificationSuccess(dat)))
      .catch((err) => dispatch(createNotificationFailure(err.message)))
  }
}

export const deleteNotification = (uid, nid, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('uid', uid)
    data.append('nid', nid)

    dispatch(deleteNotificationStarted())

    fetch(`${API_URL}/notifications/delete`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(deleteNotificationSuccess(dat))
      })
      .catch((err) => dispatch(deleteNotificationFailure(err.message)))
  }
}

export const updateNotification = (notifId, name, repeat, description, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pk', notifId)
    data.append('notif_type', name)
    data.append('repeat', repeat)
    data.append('description', description)

    dispatch(updateNotificationStarted())

    fetch(`${API_URL}/notifications/update`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(updateNotificationSuccess(dat))
      })
      .catch((err) => dispatch(updateNotificationFailure(err.message)))
  }
}
