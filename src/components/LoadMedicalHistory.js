/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AboutPet from './AboutPet'
import MedicalHistory from './MedicalHistory'
import styles from '../styles/MyPets.module.css'
import { getVetProcs } from '../actions/procsList'

function LoadMedicalHistory({ pet, procsList, getProcs }) {
  if (procsList === undefined) {
    procsList = []
    getProcs(pet.petId, pet.userId)
  }

  useEffect(() => {
    if (!procsList.length) {
      getProcs(pet.petId, pet.userId)
    }
    // eslint-disable-next-line
  }, [getProcs])

  return (
    <div className={styles.Container} key={pet.petId}>
      <AboutPet pet={pet} />
      <MedicalHistory procsList={procsList} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  procsList: state.procsList.vetProcs,
})

const mapDispatchToProps = (dispatch) => ({
  getProcs: (pid, uid) => dispatch(getVetProcs(pid, uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadMedicalHistory)
