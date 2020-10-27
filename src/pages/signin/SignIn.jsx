import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/2DO.svg'
import BackButton from '../../components/backbutton/BackButton'
import Input from '../../components/input/Input'
import { AuthContext } from '../../context/AuthContext'
import { info, signIn } from '../../services/AuthService'
import { email as emailPattern } from '../../utils/Patterns'
import './SignIn.scss'

function SignIn() {
  const history = useHistory()
  const [, setAccount] = useContext(AuthContext)
  const [errors, setErrors] = useState()

  async function handleSubmit(event) {
    event.preventDefault()
    if (errors) return

    const form = new FormData(event.target)

    switch (
      await signIn(form.get('email').trim(), form.get('password').trim())
    ) {
      case 200:
        setAccount(await info())
        history.push('/app')
        break
      case 404:
        setErrors({ email: 'conta não encontrada' })
        break
      case 403:
        setErrors({ password: 'senha invalida' })
        break
      default:
        console.error('unknown error at sign-in')
    }
  }

  return (
    <div className="SignIn">
      <BackButton onClick={() => history.push('/home')} />

      <img className="logo" src={logo} alt="2DO.svg" />

      <form onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        <Input
          placeholder="E-mail"
          id="email"
          type="email"
          required
          pattern={emailPattern}
          onChange={errors?.email && (() => setErrors())}
          invalid={!!errors?.email}
          message={errors?.email}
        />
        <Input
          placeholder="Senha"
          id="password"
          type="password"
          min={8}
          required
          onChange={errors?.password && (() => setErrors())}
          invalid={!!errors?.password}
          message={errors?.password}
        />
        <button type="submit" className="primary">
          ENTRAR
        </button>
        <p className="caption">Esqueceu a senha?</p>
      </form>
    </div>
  )
}

export default SignIn
