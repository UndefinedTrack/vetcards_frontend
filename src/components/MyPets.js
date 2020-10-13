/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AboutPet from './AboutPet'
import MedicalHistory from './MedicalHistory'
import styles from '../styles/MyPets.module.css'
import { getPetsList } from '../actions/profile'

function MyPets(props) {
  const uid = 2
  const { petList, getInfo } = props

  useEffect(() => {
    if (!petList.length) {
      getInfo(uid)
    }

    // const interval = setInterval(() => getInfo(uid), 10000)
  }, [getInfo])
  // console.log(petList)

  return (
    <div>
      {Boolean(!petList.length) && (
        <div className={styles.NotPet}>
          <div className={styles.NotPetText}>У вас нет ни одного питомца :(</div>
          <a href="create-pet" className={styles.NotPetButton}>
            Добавить!
          </a>
        </div>
      )}
      {Boolean(petList.length) &&
        petList.map((pet) => (
          <div className={styles.Container} key={pet.petId}>
            <AboutPet pet={pet} />
            <MedicalHistory />
          </div>
        ))}
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
