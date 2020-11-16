/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import { ReactComponent as BackButton } from '../../icons/mdi_keyboard_arrow_left.svg'
import { ReactComponent as ArrowDown } from '../../icons/arrow_down_square.svg'
import { ReactComponent as ArrowUp } from '../../icons/arrow_up.svg'

function CreateReminder({ backClick }) {
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  const date = formatter.format(today)
  // const [popUpDispl, setPopUpDispl] = useState(false)
  // const [reminderType, setReminderType] = useState('')
  // const [firstDate, setFirstDate] = useState('')
  // const [reminderFrequency, setReminderFrequency] = useState('')
  // const [remark, setRemark] = useState('')

  const reminderFrequencies = ['Раз в день', 'Раз в неделю', 'Раз в год']

  function handleInputChange(event) {
    event.preventDefault()
  }

  function handleSubmit(event) {
    event.preventDefault()
    backClick()
  }

  return (
    <div className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        <BackButton className={styles.BackButton} onClick={backClick} />
        <div className={`${styles.Name} ${styles.NewProcedureName}`}>Новое напоминание</div>
      </div>
      <hr className={styles.Line} />
      <form className={styles.ProcedureContainer} onSubmit={handleSubmit}>
        <div className={styles.inputAndTextWrapper}>
          <div className={styles.ProcedureEntryBlock}>
            <div className={styles.ReminderText}>Тип напоминания</div>
            <span className={styles.noteReminderText}>*</span>
          </div>
          <input
            type="text"
            className={styles.input}
            onChange={handleInputChange}
            name="reminderName"
            required
            pattern=".{3,}"
            title="Название напоминания должно содержать не менее 3 символов"
            maxLength="25"
            placeholder="Назовите напоминание"
          />
        </div>
        <div className={styles.inputAndTextWrapper}>
          <div className={styles.ProcedureEntryBlock}>
            <div className={styles.ReminderText}>Дата первого напоминания</div>
            <span className={styles.noteReminderText}>*</span>
          </div>
          <input
            type="text"
            className={styles.input}
            onChange={handleInputChange}
            required
            name="date"
            title="Введите дату в формате дд.мм.гггг"
            pattern="([0][1-9]|[1-2][1-9]|[1-3][1-1]|[1-3][0])\.([0][1-9]|[1][0-2])\.([1][0-9][0-9][0-9]|[2][0][0-1][0-9]|[2][0][2][0])"
            placeholder={date}
            defaultValue={date}
          />
        </div>
        <div className={styles.inputAndTextWrapper}>
          <div className={styles.ProcedureEntryBlock}>
            <div className={styles.ReminderText}>Частота напоминаний</div>
            <span className={styles.noteReminderText}>*</span>
          </div>
          <DropDownList
            options={reminderFrequencies}
            changeInputHandler={handleInputChange}
          />
        </div>
        <div className={styles.inputAndTextWrapper}>
          <div className={styles.ProcedureEntryBlock}>
            <div className={styles.ReminderText}>Примечание</div>
          </div>
          <textarea
            type="text"
            className={styles.input}
            onChange={handleInputChange}
            name="remark"
            placeholder="Оставьте примечание"
          />
        </div>
        <p className={styles.noteReminderText}>* - обязательные для заполнения поля</p>
        <button type="submit" className={styles.saveButton}>
          Добавить
        </button>
      </form>
    </div>
  )
}

CreateReminder.propTypes = {
  backClick: PropTypes.func.isRequired,
}

// Выпадающий список

function DropDownList({ changeInputHandler, options }) {
  const [isVisible, setIsVisible] = useState(false)

  const [chosenOption, setChosenOption] = useState(options[0])

  function handleOptionClick(optionName) {
    setChosenOption(optionName)
    setIsVisible(false)
  }

  function handleArrowClick() {
    setIsVisible(!isVisible)
  }

  return (
    <div className={styles.diaryOptionWrapper}>
      <div
        className={styles.diaryOptionBlock}
        role='button'
        tabIndex='0'
        onKeyDown={handleArrowClick}
        onClick={handleArrowClick}
      >
        {chosenOption}
        <Arrow
          isVisible={isVisible}
          handleArrowClick={handleArrowClick}
        />
      </div>
      <OptionsList
          isVisible={isVisible}
          handleOptionClick={handleOptionClick}
          options={options}
          changeInputHandler={changeInputHandler}
        />
    </div>
  )
}

DropDownList.propTypes = {
  changeInputHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}

function Arrow({ isVisible, handleArrowClick }) {
  if (!isVisible) {
    return (
      <button
        type='button'
        onClick={handleArrowClick}
        className={styles.diaryOptionArrowButton}
      >
        <ArrowDown />
      </button>
    )
  }
  return (
    <button
        type='button'
        onClick={handleArrowClick}
        className={styles.diaryOptionArrowButton}
      >
        <ArrowUp />
      </button>
  )
}

Arrow.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleArrowClick: PropTypes.func.isRequired,
}

function OptionsList({ isVisible, handleOptionClick, options, changeInputHandler }) {
  const optionsComponents = []
  for (let i = 0; i < options.length; i += 1) {
    optionsComponents.push(
      <Option
        key={i}
        name={options[i]}
        handleOptionClick={handleOptionClick}
        changeInputHandler={changeInputHandler}
      />
    )
  }
  if (isVisible) {
    return (
      <div className={styles.diaryOptionsBox} >
        {optionsComponents}
      </div>
   )
  }
  return null
}

OptionsList.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
}

function Option({ name, handleOptionClick, changeInputHandler }) {
  return (
    <div className={styles.diaryOption}>
      <input
        id={name}
        type='checkbox'
        value={name}
        name='option'
        className={styles.diaryOptionInput}
        onClick={() => handleOptionClick(name)}
        onChange={changeInputHandler}
      />
      <label className={styles.diaryOptionLabel} htmlFor={name}>{name}</label>
    </div>
  )
}

Option.propTypes = {
  name: PropTypes.string.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  changeInputHandler: PropTypes.func.isRequired,
}

export default CreateReminder
