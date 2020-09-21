import React from 'react'
import logo from '../../assets/2DO.svg'
import './Start.scss'

function Start() {
  return (
    <div className="Start">
      <img className="logo" src={logo} alt="2DO.svg" />
      <button type="button" className="primary">
        ENTRAR
      </button>
      <p className="caption">Novo? Crie uma Conta!</p>
    </div>
  )
}

export default Start
