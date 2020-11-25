/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/pet/Diary.module.css'
import HomeProcedure from './HomeProcedure'
import { getOwnerProcs } from '../../actions/procsList'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Plus } from '../../icons/plus.svg'

function OwnerProcedures({
  name,
  search,
  plusClick,
  procsList,
  // eslint-disable-next-line
  getOwnerProcs,
  uid,
  setCreateProcedureWindow,
  setProc,
}) {
  const { pid } = useParams()
  const [searchLine, setSearchLine] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const token = localStorage.getItem('token')
  const [deleteProc, setDeleteProc] = useState(false)

  useEffect(() => {
    // if (!procsList.length) {
    //   getOwnerProcs(pid, uid, searchInput, token)
    // }

    if (deleteProc === true) {
      setDeleteProc(false)
    }

    setTimeout(() => getOwnerProcs(pid, uid, searchInput, token), 100)
    // eslint-disable-next-line
  }, [searchInput, pid, uid, deleteProc])

  return (
    <section className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        {!searchLine && <div className={styles.Name}>{name}</div>}
        {searchLine && (
          <div className={styles.SearchContainer}>
            <Search className={styles.SearchButton} />
            <input
              type="text"
              // eslint-disable-next-line
              autoFocus
              onChange={changeInputHandler}
              className={styles.SearchLine}
              placeholder="Поиск"
            />
          </div>
        )}
        <div className={styles.Buttons}>
          {search && !searchLine && <Search onClick={searchLineDisplay} className={styles.Button} />}
          <Plus className={styles.Button} onClick={plusClick} />
        </div>
      </div>
      <hr className={styles.Line} />
      <section className={styles.Procedures}>
        {procsList.length === 0 && (
          <div className={styles.EmptyStoryContainer}>
            <div className={styles.EmptyStory}>Не проведено ни одной процедуры</div>
          </div>
        )}
        {procsList
          .map((proc) => {
            const day = proc.procDate.slice(8, 10)
            const month = Number(proc.procDate.slice(5, 7)) - 1
            const year = proc.procDate.slice(0, 4)
            const date = new Date(year, month, day)
            return (
              <HomeProcedure
                key={proc.procId}
                uid={uid}
                proc={proc}
                date={date}
                setCreateProcedureWindow={setCreateProcedureWindow}
                setProc={setProc}
                setDeleteProc={setDeleteProc}
              />
            )
          })
          .reverse()
          .sort((a, b) => {
            return b.props.date - a.props.date
          })}
      </section>
    </section>
  )

  function searchLineDisplay() {
    setSearchLine(!searchLine)
  }

  function changeInputHandler(event) {
    setSearchInput(event.target.value)
    getOwnerProcs(pid, uid, searchInput, token)
  }
}

OwnerProcedures.defaultProps = {
  plusClick: () => {},
}

OwnerProcedures.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  plusClick: PropTypes.func,
}

const mapStateToProps = (state) => ({
  procsList: state.procsList.ownerProcs,
})

const mapDispatchToProps = (dispatch) => ({
  getOwnerProcs: (pid, uid, name, token) => dispatch(getOwnerProcs(pid, uid, name, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProcedures)
