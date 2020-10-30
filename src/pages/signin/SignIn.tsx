import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/2DO.svg';
import BackButton from '../../components/backbutton/BackButton';
import Input from '../../components/input/Input';
import AuthContext from '../../context/AuthContext';
import { info, signIn } from '../../services/AuthService';
import { email as emailPattern } from '../../utils/Patterns';
import './SignIn.scss';

const SignIn: React.FC = () => {
  const history = useHistory();
  // TODO Account Interface
  const [, setAccount]: any = useContext(AuthContext);
  const [errors, setErrors] = useState<Dict<string> | null>(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (errors) return;

    const form = new FormData(event.currentTarget);

    switch (
      await signIn(
        (form.get('email') as string)?.trim(),
        (form.get('password') as string)?.trim()
      )
    ) {
      case 200:
        setAccount(await info());
        history.push('/app');
        break;
      case 404:
        setErrors({ email: 'conta não encontrada' });
        break;
      case 403:
        setErrors({ password: 'senha invalida' });
        break;
      default:
        console.error('unknown error at sign-in');
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
