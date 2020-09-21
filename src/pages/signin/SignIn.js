import React from 'react'
import logo from '../../assets/2DO.svg'
import Input from '../../components/input/Input'
import './SignIn.scss'

function SignIn() {
  return (
    <div className="SignIn">
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
