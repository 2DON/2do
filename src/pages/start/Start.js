/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/2DO.svg'
import './Start.scss'

function Start() {
  const history = useHistory()

  return (
    <div className="Start">
      <img className="logo" src={logo} alt="2DO.svg" />
      <button
        type="button"
        className="primary"
        onClick={() => history.push('/sign-in')}
      >
        ENTRAR
      </button>
      <p className="caption" onClick={() => history.push('/sign-up')}>
        Novo? Crie uma Conta!
      </p>
    </div>
  )
}

export default Start
