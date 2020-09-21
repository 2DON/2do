import React from 'react'
import logo from '../../assets/2DO.svg'
import Input from '../../components/input/Input'
import './SignUp.scss'

function SignUp() {
  return (
    <div className="SignUp">
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
