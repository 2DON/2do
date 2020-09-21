import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/2DO.svg'
import BackButton from '../../components/backbutton/BackButton'
import Input from '../../components/input/Input'
import './SignIn.scss'

function SignIn() {
  const history = useHistory()

  return (
    <div className="SignIn">
      <BackButton onClick={() => history.push('/home')} />

      <img className="logo" src={logo} alt="2DO.svg" />

      <form>
        <h2>Entrar</h2>
        <Input placeholder="E-mail" id="email" required />
        <Input placeholder="Senha" id="password" required />
        <button type="submit" className="primary">
          ENTRAR
        </button>
        <p className="caption">Esqueceu a senha?</p>
      </form>
    </div>
  )
}

export default SignIn
