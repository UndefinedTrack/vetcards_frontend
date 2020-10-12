import { combineReducers } from 'redux'
import petInfo from './petInfo'
import petOps from './petOps'
import procsCreate from './procsCreate'
import procsList from './procsList'
import profile from './profile'
import userCreate from './userCreate'

const rootReducer = combineReducers({
    petInfo,
    petOps,
    procsCreate,
    procsList,
    profile,
    userCreate,
})

export default rootReducer