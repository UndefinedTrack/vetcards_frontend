import { combineReducers } from 'redux'
import petInfo from './petInfo'
import petOps from './petOps'
import procsCreate from './procsCreate'
import procsList from './procsList'
import profile from './profile'
import userCreate from './userCreate'
import schedule from './schedule'
import avatar from './avatar'
import petSearch from './petSearch'
import signIn from './signIn'
import notification from './notification'
import procsUpdate from './procsUpdate'
import clientProfile from './clientProfile'
import getPets from './getPets'
import mailing from './mailing'

const rootReducer = combineReducers({
  petInfo,
  petOps,
  procsCreate,
  procsList,
  profile,
  userCreate,
  schedule,
  avatar,
  petSearch,
  signIn,
  notification,
  procsUpdate,
  clientProfile,
  getPets,
  mailing,
})

export default rootReducer
