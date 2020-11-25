/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/vet/VisitsHistory.module.css'
import { createVetProc } from '../../actions/procsCreate'
import { updateVetProc } from '../../actions/procsUpdate'
import { ReactComponent as ArrowDown } from '../../icons/arrow_down_square.svg'
import { ReactComponent as ArrowDownDisabled } from '../../icons/arrow_down_disabled.svg'
import { ReactComponent as ArrowUp } from '../../icons/arrow_up.svg'

function CreateVisitForm({ createProc, uid, currentProc, setCurrentProc, updateProc }) {
  const { pid } = useParams()
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  const date = formatter.format(today)
  const token = localStorage.getItem('token')

  const visitPurposes = ["Первичный приём", "Вторичный приём", "Диагностика", "Процедурный приём", "Узкие специалисты", "Консультация без животного", "Хирургическое лечение"]
  const visitPurposesNames = {
    "Первичный приём": [""],
    "Вторичный приём": [""],
    "Диагностика": ["УЗИ", "Рентген"],
    "Процедурный приём": ["Таблетка", "Инъекция", "Обработка раны", "Уколы", "Перевязки", "Капельницы", "Анализы"],
    "Узкие специалисты": ["Кардиолог", "Офтальмолог"],
    "Консультация без животного": [""],
    "Консультация по телефону": [""],
    "Хирургическое лечение": [""],
  }

  let defaultPurpose = visitPurposes[0]
  let defaultName = visitPurposesNames[defaultPurpose][0]
  let defaultDate = date
  let defaultSymptoms = ''
  let defaultDiagnosis = ''
  let defaultRecomms = ''
  let defaultRecipe = ''

  if (currentProc !== undefined) {
    const year = currentProc.procDate.slice(0, 4)
    let month = currentProc.procDate.slice(5, 7)
    let day = currentProc.procDate.slice(8, 10)
    if (String(month).length === 1) month = `0${month}`
    if (String(day).length === 1) day = `0${day}`
    const currentDate = `${day}.${month}.${year}`
    defaultPurpose = currentProc.purpose
    defaultName = currentProc.name
    defaultDate = currentDate
    defaultSymptoms = currentProc.symptoms
    defaultDiagnosis = currentProc.diagnosis
    defaultRecomms = currentProc.recomms
    defaultRecipe = currentProc.recipe
  }

  const [state, setState] = useState({
    name: defaultName,
    date: defaultDate,
    purpose: defaultPurpose,
    symptoms: defaultSymptoms,
    diagnosis: defaultDiagnosis,
    recomms: defaultRecomms,
    recipe: defaultRecipe,
  })

  useEffect(() => {
    setState({
      name: defaultName,
      date: defaultDate,
      purpose: defaultPurpose,
      symptoms: defaultSymptoms,
      diagnosis: defaultDiagnosis,
      recomms: defaultRecomms,
      recipe: defaultRecipe,
    })
    // eslint-disable-next-line
  }, [currentProc])

  function closeEditForm() {
    setCurrentProc(undefined)
  }

  function submitHandler(e) {
    e.preventDefault()

    const { name, purpose, symptoms, diagnosis, recomms, recipe } = state
    const procDate = state.date

    createProc(pid, uid, name, procDate, purpose, symptoms, diagnosis, recomms, recipe, token)
    setState({
      name: '',
      date,
      purpose: 'Первичный приём',
      symptoms: '',
      diagnosis: '',
      recomms: '',
      recipe: '',
    })
  }

  function saveEdit() {
    const { name, purpose, symptoms, diagnosis, recomms, recipe } = state
    const procDate = state.date

    updateProc(uid, currentProc.procId, purpose, name, symptoms, diagnosis, recomms, recipe, procDate, token)
  }

  function changeInputHandler(event) {
    event.persist()
    if (event.target.name === 'purpose') {
      setState((prev) => ({
        ...prev,
        ...{
          [event.target.name]: event.target.value,
          'name': visitPurposesNames[event.target.value][0],
        },
      }))
    }
    else {
      setState((prev) => ({
        ...prev,
        ...{
          [event.target.name]: event.target.value,
        },
      }))
    }
  }

  return (
    <form onSubmit={submitHandler} className={styles.CreateVFContainer}>
      <div className={styles.DFlex}>
        <div className={`${styles.VisitInf} ${styles.purpose}`}>
          <div>
            Цель визита <span className={styles.noteText}>*</span>
          </div>
          <DropDownList
            isActive
            name="purpose"
            changeInputHandler={changeInputHandler}
            options={visitPurposes}
            value={state.purpose}
          />
        </div>
        <div className={`${styles.VisitInf} ${styles.date}`}>
          <div>
            Дата визита <span className={styles.noteText}>*</span>
          </div>
          <DateBlock changeInputHandler={changeInputHandler} defaultValue={state.date} />
        </div>
      </div>
      <div className={styles.DFlexColumn}>
        <ClarificationBlock
          changeInputHandler={changeInputHandler}
          options={visitPurposesNames[state.purpose]}
          value={state.name}
        />
        <div className={styles.FormName}>Симптомы</div>
        <TextAreaBlock
          changeInputHandler={changeInputHandler}
          placeholder="Опишите симптомы"
          name="symptoms"
          defaultValue={state.symptoms}
        />
        <div className={styles.FormName}>Диагноз</div>
        <InputBlock
          changeInputHandler={changeInputHandler}
          placeholder="Поставьте диагноз"
          name="diagnosis"
          defaultValue={state.diagnosis}
        />
        <div className={styles.FormName}>Рекомендации по лечению</div>
        <TextAreaBlock
          changeInputHandler={changeInputHandler}
          placeholder="Укажите рекомендации по лечению"
          defaultValue={state.recomms}
          name="recomms"
        />
      </div>
      <p className={styles.noteText}>* - обязательные для заполнения поля</p>
      <div className={styles.SaveButtons}>
        {currentProc && (
          <button type="button" className={`${styles.saveButton} ${styles.Canel}`} onClick={closeEditForm}>
            <span>Отмена</span>
          </button>
        )}
        <div>
          {!currentProc && (
            <button type="submit" className={styles.saveButton}>
              Добавить
            </button>
          )}
          {currentProc && (
            <button type="button" className={styles.saveButton} onClick={saveEdit}>
              Сохранить
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

function ClarificationBlock({ changeInputHandler, options, value}) {
  let isActive = true
  if (options === undefined) {
    isActive = false
  }
  else if (options[0] === '') {
    isActive = false
  }

  let divStyle
  if (!isActive) {
    divStyle = styles.textDisabled
  }

  return (
    <div>
      <div className={divStyle} >
        Уточните цель визита
      </div>
      <DropDownList
        isActive={isActive}
        name="name"
        changeInputHandler={changeInputHandler}
        options={options}
        value={value}
      />
    </div>
  )
}
ClarificationBlock.propTypes = {
  value: PropTypes.string.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}

function DateBlock({ changeInputHandler, defaultValue }) {
  return (
    <input
      required
      type="text"
      value={defaultValue}
      onChange={changeInputHandler}
      className={styles.InputBlock}
      name="date"
      title="Введите дату в формате дд.мм.гггг"
      pattern="([0][1-9]|[1-2][1-9]|[1-3][1-1]|[1-3][0])\.([0][1-9]|[1][0-2])\.([1][0-9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0])"
      placeholder={defaultValue}
      maxLength="10"
    />
  )
}

function TextAreaBlock({ placeholder, name, changeInputHandler, defaultValue }) {
  return (
    <textarea
      type="text"
      name={name}
      onChange={changeInputHandler}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`${styles.InputBlock} ${styles.Input} ${styles.TextArea}`}
    />
  )
}

function InputBlock({ placeholder, name, changeInputHandler, defaultValue }) {
  return (
    <input
      type="text"
      name={name}
      onChange={changeInputHandler}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`${styles.InputBlock} ${styles.Input}`}
    />
  )
}

TextAreaBlock.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

InputBlock.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

// Выпадающий список

function DropDownList({ changeInputHandler, options, value, name, isActive }) {
  const [isVisible, setIsVisible] = useState(false)
  const dropDown = React.useRef(null)

  function handleClickOutside(event) {
    if ((!dropDown || !dropDown.current.contains(event.target))) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return function cleanup() {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })

  function handleOptionClick() {
    setIsVisible(false)
  }

  function handleArrowClick() {
    if (isActive) {
      setIsVisible(!isVisible)
    }
  }
  
  let style = `${styles.dropDownBlock} ${styles.purposeBlock}`

  if (name === 'name') {
    style = `${styles.dropDownBlock} ${styles.nameBlock}`
    if (!isActive) {
      style = `${styles.dropDownBlock} ${styles.nameBlock} ${styles.nameBlockDisabled}`
    }
  }

  return (
    <div className={styles.purposeWrapper} ref={dropDown} >
      <div
        className={style}
        role="button"
        tabIndex="0"
        onKeyDown={handleArrowClick}
        onClick={handleArrowClick}
      >
        {value}
        <Arrow
          isActive={isActive}
          isVisible={isVisible}
          handleArrowClick={handleArrowClick}
        />
      </div>
      <OptionsList
        name={name}
        isVisible={isVisible}
        handleOptionClick={handleOptionClick}
        options={options}
        changeInputHandler={changeInputHandler}
      />
    </div>
  )
}

DropDownList.propTypes = {
  isActive: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}

function Arrow({ isVisible, handleArrowClick, isActive }) {
  if (!isVisible) {
    if (isActive) {
      return (
        <button type="button" onClick={handleArrowClick} className={styles.purposeArrowButton}>
          <ArrowDown />
        </button>
      )
    }
    return (
      <button disabled type="button" onClick={handleArrowClick} className={styles.purposeArrowButton}>
        <ArrowDownDisabled />
      </button>
    )
  }
  return (
    <button type="button" onClick={handleArrowClick} className={styles.purposeArrowButton}>
      <ArrowUp />
    </button>
  )
}

Arrow.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
}

function OptionsList({ isVisible, handleOptionClick, options, changeInputHandler, name }) {
  const optionsComponents = []

  if (options !== undefined) {
    for (let i = 0; i < options.length; i += 1) {
      optionsComponents.push(
        <Option
          name={name}
          key={i}
          value={options[i]}
          handleOptionClick={handleOptionClick}
          changeInputHandler={changeInputHandler}
        />,
      )
    }
  }

  let optionBoxStyle
  if (name === 'name') {
    optionBoxStyle = `${styles.optionsBox} ${styles.nameOptionsBox}`
  }
  if (name === 'purpose') {
    optionBoxStyle = `${styles.optionsBox} ${styles.purposeOptionsBox}`
  }


  if (isVisible) {
    return <div className={optionBoxStyle}>{optionsComponents}</div>
  }
  return null
}

OptionsList.propTypes = {
  name: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
}

function Option({ value, handleOptionClick, changeInputHandler, name }) {
  let labelStyle
  if (name === 'name') {
    labelStyle = `${styles.label} ${styles.nameLabel}`
  }
  if (name === 'purpose') {
    labelStyle = `${styles.label} ${styles.purposeLabel}`
  }

  return (
    <div className={styles.option}>
      <input
        id={value}
        type="checkbox"
        value={value}
        name={name}
        className={styles.purposeOptionInput}
        onClick={handleOptionClick}
        onChange={changeInputHandler}
      />
      <label className={labelStyle} htmlFor={value}>
        {value}
      </label>
    </div>
  )
}

Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createProc: (pid, uid, name, date, purpose, symptoms, diagnosis, recomms, recipe, token) =>
    dispatch(createVetProc(pid, uid, name, date, purpose, symptoms, diagnosis, recomms, recipe, token)),
  updateProc: (uid, procId, purpose, name, symptoms, diagnosis, recomms, recipe, date, token) =>
    dispatch(updateVetProc(uid, procId, purpose, name, symptoms, diagnosis, recomms, recipe, date, token)),
})

export default connect(null, mapDispatchToProps)(CreateVisitForm)
