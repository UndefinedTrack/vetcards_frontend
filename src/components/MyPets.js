/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MyPets.module.css'
import { getPetsList } from '../actions/profile'
import LoadMedicalHistory from './LoadMedicalHistory'

function MyPets({ petList, getInfo, procsList, getProcs }) {
  const uid = 2
  if (petList === undefined) {
    petList = []
    getInfo(uid)
  }

  useEffect(() => {
    if (!petList.length) {
      getInfo(uid)
    }
    // eslint-disable-next-line
  }, [getInfo])

  return (
    <div className={styles.Content}>
      {Boolean(!petList.length) && (
        <div className={styles.NotPet}>
          <div className={styles.NotPetText}>У вас нет ни одного питомца :(</div>
          <a href="#/create-pet" className={styles.NotPetButton}>
            Добавить!
          </a>
        </div>
      )}
      {Boolean(petList.length) && petList.map((pet) => <LoadMedicalHistory key={pet.petId} pet={pet} />)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  petList: state.profile.petsList,
})

const mapDispatchToProps = (dispatch) => ({
  getInfo: (uid) => dispatch(getPetsList(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPets)
