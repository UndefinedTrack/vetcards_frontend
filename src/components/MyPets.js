/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MyPets.module.css'
import AboutPet from './AboutPet'
import { getPetsList } from '../actions/profile'
import MedicalHistory from './MedicalHistory'
import { ReactComponent as Plus } from '../icons/plus.svg'
import { getVetProcs } from '../actions/procsList'

let procs
let searchString
// eslint-disable-next-line
function MyPets({ petList, getInfo, procsList, getVetProcs, input, setInput }) {
  const uid = 3
  if (procs === undefined) {
    procs = []
  }

  if (searchString === undefined) {
    searchString = []
  }

  if (petList === undefined) {
    petList = []
    getInfo(uid)
  }

  useEffect(() => {
    if (!petList.length) {
      getInfo(uid)
    }

    setTimeout(() => getInfo(uid), 100)
    // eslint-disable-next-line
  }, [getInfo])

  return (
    <div className={styles.Content}>
      {Boolean(!petList.length) && (
        <div className={styles.NotPet}>
          <div className={styles.NotPetText}>У вас нет ни одного питомца :(</div>
          <a href="#/create-pet" className={`${styles.Button} ${styles.NotPetButton}`}>
            Добавить!
          </a>
        </div>
      )}
      {Boolean(petList.length) && (
        <div className={styles.ContainerButton}>
          <a href="#/create-pet" className={`${styles.Button} ${styles.NewPetButton}`}>
            <Plus className={styles.Plus} />
            Добавить питомца
          </a>
        </div>
      )}
      {Boolean(petList.length) &&
        petList.map((pet) => (
          <div className={styles.Container} key={pet.petId}>
            <AboutPet pet={pet} />
            <MedicalHistory pet={pet} procs={procs} input={input} setInput={setInput} searchString={searchString} />
          </div>
        ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  petList: state.profile.petsList,
  procsList: state.procsList.vetProcs,
})

const mapDispatchToProps = (dispatch) => ({
  getInfo: (uid) => dispatch(getPetsList(uid)),
  getVetProcs: (pid, uid, name) => dispatch(getVetProcs(pid, uid, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPets)
