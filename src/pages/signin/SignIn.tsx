import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/2DO.svg';
import BackButton from '../../components/backbutton/BackButton';
import Input from '../../components/input/Input';
import AccountContext from '../../context/AccountContext';
import AuthContext from '../../context/AuthContext';
import * as AccountService from '../../services/AccountService';
import * as AuthService from '../../services/AuthService';
import * as Patterns from '../../utils/Patterns';
import { isStatus, NOT_FOUND, UNAUTHORIZED } from '../../utils/Status';
import './SignIn.scss';

const SignIn: React.FC = () => {
  const history = useHistory();
  const { setToken } = useContext(AuthContext) as AuthContext;
  const { setAccount } = useContext(AccountContext) as AccountContext;
  const [errors, setErrors] = useState<Dict<string> | null>(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (errors) return;

    const form = new FormData(event.currentTarget);

    try {
      const token = await AuthService.signIn(
        (form.get('email') as string)?.trim(), 
        form.get('password') as string);

      setToken(token);
      setAccount(await AccountService.me());

      history.push('/app');
    } catch (status) {
      if (!isStatus(status)) throw status;
      switch (status) {
        case NOT_FOUND:
          setErrors({ email: 'conta não encontrada' });
          break;
        case UNAUTHORIZED:
          setErrors({ password: 'senha invalida' });
          break;
        default:
          console.error('unknown error at sign-in');
      }
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
          pattern={Patterns.email}
          onChange={errors?.email ? () => setErrors(null) : undefined}
          invalid={!!errors?.email}
          message={errors?.email}
        />
        <Input
          placeholder="Senha"
          id="password"
          type="password"
          min={8}
          required
          onChange={errors?.password ? () => setErrors(null) : undefined}
          invalid={!!errors?.password}
          message={errors?.password}
        />
        <button type="submit" className="primary">
          ENTRAR
        </button>
        <p className="caption">Esqueceu a senha?</p>
      </form>
    </div>
  );
};

export default SignIn;
