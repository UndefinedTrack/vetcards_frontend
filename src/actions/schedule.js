import {
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE,
  CREATE_SCHEDULE_REQUEST,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getScheduleStarted = () => ({
  type: GET_SCHEDULE_REQUEST,
})

const getScheduleSuccess = (info) => ({
  type: GET_SCHEDULE_SUCCESS,
  payload: info,
})

const getScheduleFailure = (error) => ({
  type: GET_SCHEDULE_FAILURE,
  payload: {
    error,
  },
})

const createScheduleStarted = () => ({
  type: CREATE_SCHEDULE_REQUEST,
})

const createScheduleSuccess = (info) => ({
  type: CREATE_SCHEDULE_SUCCESS,
  payload: info,
})

const createScheduleFailure = (error) => ({
  type: CREATE_SCHEDULE_FAILURE,
  payload: {
    error,
  },
})

export const getSchedule = (uid, vid, dt) => {
  return (dispatch, getState) => {
    dispatch(getScheduleStarted())

    fetch(`${API_URL}/vet_day_sched?uid=${uid}&vid=${vid}&dt=${dt}`, { credentials: 'include' })
      .then((resp) => resp.json)
      .then((data) => {
        const slots = []
        const sinfo = data.daily_available_slots

        sinfo.forEach((s) => {
          const slot = {
            slotId: s.id,
            slotTime: s.slot_time,
          }

          slots.push(slot)
        })

        dispatch(getScheduleSuccess(slots))
      })
      .catch((err) => dispatch(getScheduleFailure(err.message)))
  }
}

export const createSchedule = (vid, slotDate, slotTime) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('vid', vid)
    data.append('slot_date', slotDate)
    data.append('slot_time', slotTime)

    dispatch(createScheduleStarted())

    fetch(`${API_URL}/schedule/create`, { method: 'POST', body: data, credentials: 'include' })
      .then((resp) => resp.json())
      .then((dat) => dispatch(createScheduleSuccess(dat)))
      .catch((err) => dispatch(createScheduleFailure(err.message)))
  }
}
