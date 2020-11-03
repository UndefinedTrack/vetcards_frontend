import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/pet/Diary.module.css'
import { ReactComponent as BackButton } from '../../icons/mdi_keyboard_arrow_left.svg'

function CreateReminder({ backClick }) {
  const today = new Date()
  const formatter = new Intl.DateTimeFormat('ru')
  const date = formatter.format(today)
  // const [popUpDispl, setPopUpDispl] = useState(false)
  // const [reminderType, setReminderType] = useState('')
  // const [firstDate, setFirstDate] = useState('')
  // const [reminderFrequency, setReminderFrequency] = useState('')
  // const [remark, setRemark] = useState('')

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
          <input
            type="text"
            className={styles.input}
            onChange={handleInputChange}
            name="reminderFrequency"
            placeholder="Выберите частоту напоминаний"
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

export default CreateReminder
