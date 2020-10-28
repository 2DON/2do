/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/2DO.svg'
import { AuthContext } from '../../context/AuthContext'
import './Start.scss'

function Start() {
  const history = useHistory()
  const [, setAccount] = useContext(AuthContext)

  // React.useState(() => {
  //   if (token.exists()) {
  //     info().then((account) => {
  //       setAccount(account)
  //       history.push('/app')
  //     })
  //   }
  // }, [setAccount])

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
