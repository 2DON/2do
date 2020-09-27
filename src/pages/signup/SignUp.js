import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/2DO.svg'
import BackButton from '../../components/backbutton/BackButton'
import Input from '../../components/input/Input'
import './SignUp.scss'

function SignUp() {
  const history = useHistory()

  return (
    <div className="SignUp">
      <BackButton onClick={() => history.push('/home')} />

      <form>
        <h2>Cadastro</h2>
        <Input placeholder="E-mail" id="email" required />
        <Input placeholder="Senha" id="password" required />
        <Input placeholder="Confirmar a Senha" id="password-confirm" required />
        <button type="submit" className="primary">
          CRIAR CONTA
        </button>
      </form>

      <img className="logo" src={logo} alt="2DO.svg" />
    </div>
  )
}

export default SignUp
