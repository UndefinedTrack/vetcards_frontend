/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/vet/AboutPatient.module.css'
import { getPetInfo, updatePetInfo } from '../../actions/petInfo'

function AboutPatient({ uid, petInfo, getPet, updatePet }) {
  const { pid } = useParams()
  const [flag, setFlag] = useState(true)

  const [state, setState] = useState({
    name: petInfo.name,
    species: petInfo.species,
    breed: petInfo.breed,
    color: petInfo.color,
    birthDate: petInfo.birthDate,
    gender: petInfo.gender,
    chip: petInfo.chip,
    sterilized: petInfo.sterilized,
    vaccinated: petInfo.vaccinated,
    contraindications: petInfo.contraindications,
    remark: petInfo.remark,
    weight: petInfo.weight,
  })

  useEffect(() => {
    if (petInfo.petId !== pid) {
      const token = localStorage.getItem('token')
      getPet(pid, uid, token)
    }
    // eslint-disable-next-line
  }, [pid])

  const checkbox = window.document.getElementById('check-box')
  const checkbox2 = window.document.getElementById('check-box2')
  if (state.sterilized && checkbox) checkbox.checked = 'checked'
  if (state.vaccinated && checkbox2) checkbox2.checked = 'checked'

  function changeInputHandler(event) {
    event.persist()
    setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }

  function changeCheckbox(e) {
    if (state.sterilized) {
      setState((prev) => ({
        ...prev,
        ...{
          sterilized: false,
        },
      }))
    } else {
      setState((prev) => ({
        ...prev,
        ...{
          sterilized: true,
        },
      }))
    }
  }

  function changeCheckbox2(e) {
    if (state.vaccinated) {
      setState((prev) => ({
        ...prev,
        ...{
          vaccinated: false,
        },
      }))
    } else {
      setState((prev) => ({
        ...prev,
        ...{
          vaccinated: true,
        },
      }))
    }
  }

  if (state.name !== petInfo.name && flag) {
    setState({
      petId: petInfo.id,
      userId: petInfo.user,
      name: petInfo.name,
      species: petInfo.species,
      breed: petInfo.breed || '',
      color: petInfo.color || '',
      birthDate: petInfo.birth_date || '',
      gender: petInfo.gender || '',
      chip: petInfo.chip || '',
      sterilized: petInfo.sterilized,
      vaccinated: petInfo.vaccinated,
      contraindications: petInfo.contraindications || '',
      remark: petInfo.notes || '',
      weight: petInfo.weight || '',
      avatar: petInfo.avatar || '',
    })
    setFlag(false)
  }

  function updPet() {
    const {
      name,
      species,
      breed,
      color,
      birthDate,
      gender,
      chip,
      sterilized,
      vaccinated,
      contraindications,
      remark,
      weight,
    } = state
    const token = localStorage.getItem('token')

    // const elem = document.getElementById('pop-up')
    // elem.style = 'display: flex;'
    // setTimeout(() => {
    //   elem.style = 'display: none;'
    // }, 3000)
    updatePet(
      pid,
      uid,
      name,
      species,
      breed,
      color,
      birthDate,
      gender,
      chip,
      sterilized,
      vaccinated,
      contraindications,
      remark,
      weight,
      token,
    )
  }

  return (
    <div className={styles.Container}>
      <div className={styles.MainInfo}>
        <div className={styles.Block}>
          <div className={styles.InputName}>Кличка</div>
          <RequiredInputBlock defaultValue={state.name} changeInputHandler={changeInputHandler} name="name" />
          <div className={styles.InputName}>Дата рождения</div>
          <InputBlock defaultValue={state.birthDate} changeInputHandler={changeInputHandler} name="birthDate" />
          <div className={styles.InputName}>Вид</div>
          <RequiredInputBlock defaultValue={state.species} changeInputHandler={changeInputHandler} name="species" />
        </div>
        <div className={styles.Block}>
          <div className={styles.InputName}>Пол</div>
          <InputBlock defaultValue={state.gender} changeInputHandler={changeInputHandler} name="gender" />
          <div className={styles.InputName}>Порода</div>
          <InputBlock defaultValue={state.breed} changeInputHandler={changeInputHandler} name="breed" />
          <div className={styles.InputName}>Вес</div>
          <InputBlock defaultValue={state.weight} changeInputHandler={changeInputHandler} name="weight" />
        </div>
        <div className={styles.Block}>
          <div className={styles.InputName}>Окрас</div>
          <InputBlock defaultValue={state.color} changeInputHandler={changeInputHandler} name="color" />
          <div className={styles.InputName}>Чип</div>
          <InputBlock defaultValue={state.chip} changeInputHandler={changeInputHandler} name="chip" />
        </div>
        <div className={styles.Block}>
          <div className={styles.CheckName}>
            <input
              type="checkbox"
              className={styles.CustomCheckBox}
              id="check-box"
              name="check-box"
              onChange={changeCheckbox}
            />
            {/* eslint-disable-next-line */}
            <label htmlFor="check-box">Кастрирован/стерилизован</label>
          </div>
          <div className={styles.CheckName}>
            <input
              type="checkbox"
              className={styles.CustomCheckBox}
              id="check-box2"
              name="check-box"
              onChange={changeCheckbox2}
            />
            {/* eslint-disable-next-line */}
            <label htmlFor="check-box2">Привит</label>
          </div>
          <div className={styles.InputName}>Противопоказания</div>
          <Contraindications
            defaultValue={state.contraindications || ''}
            changeInputHandler={changeInputHandler}
            name="contraindications"
          />
        </div>
      </div>
      <div className={styles.InputName}>Примечание</div>
      <Remark defaultValue={state.remark} changeInputHandler={changeInputHandler} name="remark" />
      <button type="button" className={styles.saveButton} onClick={updPet}>
        Сохранить
      </button>
    </div>
  )
}

function RequiredInputBlock({ defaultValue, changeInputHandler, name }) {
  return (
    <div>
      <input
        type="text"
        value={defaultValue}
        required
        className={styles.InputBlock}
        onChange={changeInputHandler}
        name={name}
      />
    </div>
  )
}

function InputBlock({ defaultValue, changeInputHandler, name }) {
  return (
    <div>
      <input
        type="text"
        value={defaultValue || ''}
        className={styles.InputBlock}
        onChange={changeInputHandler}
        name={name}
      />
    </div>
  )
}

function Contraindications({ defaultValue, changeInputHandler }) {
  return (
    <div>
      <textarea
        type="text"
        className={styles.Contraindications}
        value={defaultValue || ''}
        onChange={changeInputHandler}
        name="contraindications"
      />
    </div>
  )
}

function Remark({ defaultValue, changeInputHandler }) {
  return (
    <div>
      <textarea
        type="text"
        className={styles.RemarkTextArea}
        value={defaultValue || ''}
        onChange={changeInputHandler}
        name="remark"
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  petInfo: state.petInfo.pet,
})

const mapDispatchToProps = (dispatch) => ({
  getPet: (pid, uid, token) => dispatch(getPetInfo(pid, uid, token)),
  updatePet: (
    pid,
    uid,
    name,
    species,
    breed,
    color,
    birthDate,
    gender,
    chip,
    sterilized,
    vaccinated,
    contraindications,
    remark,
    weight,
    token,
  ) =>
    dispatch(
      updatePetInfo(
        pid,
        uid,
        name,
        species,
        breed,
        color,
        birthDate,
        gender,
        chip,
        sterilized,
        vaccinated,
        contraindications,
        remark,
        weight,
        token,
      ),
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutPatient)
