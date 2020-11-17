/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/MyPets.module.css'
import AboutPet from './AboutPet'
import { getPetsList } from '../actions/profile'
import MedicalHistory from './MedicalHistory'
import { ReactComponent as Plus } from '../icons/plus.svg'
import { getVetProcs } from '../actions/procsList'

// eslint-disable-next-line
function MyPets({ uid, petList, getInfo, procsList }) {
  const [searchLine, setSearchLine] = useState(-1)
  const token = localStorage.getItem('token')

  if (petList === undefined) {
    petList = []
    getInfo(uid, token)
  }

  function closeSearchString() {
    setSearchLine(-1)
  }

  useEffect(() => {
    if (!petList.length) {
      getInfo(uid, token)
    }
    if (uid !== -1) {
      setTimeout(() => getInfo(uid, token), 100)
    }
    // eslint-disable-next-line
  }, [procsList])

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
        petList
          .map((pet) => (
            <div className={styles.Container} key={pet.petId}>
              <AboutPet pet={pet} closeSearchString={closeSearchString} />
              <MedicalHistory
                pet={pet}
                uid={uid}
                // input={input}
                // setInput={setInput}
                // setPId={setPId}
                ind={pet.petId}
                searchLine={searchLine}
                setSearchLine={setSearchLine}
              />
            </div>
          ))
          .reverse()}
    </div>
  )
}

const mapStateToProps = (state) => ({
  petList: state.profile.petsList,
  procsList: state.procsList.vetProcs,
})

const mapDispatchToProps = (dispatch) => ({
  getInfo: (uid, token) => dispatch(getPetsList(uid, token)),
  getVetProcs: (pid, uid, name, token) => dispatch(getVetProcs(pid, uid, name, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPets)
