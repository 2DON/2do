import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/2DO.svg';
import BackButton from '../../components/backbutton/BackButton';
import Input from '../../components/input/Input';
import AuthContext from '../../context/AuthContext';
import { exists, info, signIn, signUp } from '../../services/AuthService';
import { email as emailPattern } from '../../utils/Patterns';
import timed from '../../utils/timed';
import './SignUp.scss';

const SignUp: React.FC = () => {
  const history = useHistory();
  // TODO Account
  const [, setAccount]: any = useContext(AuthContext);
  const [errors, setErrors] = useState<Dict<string> | null>(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (errors) return;

    const form = new FormData(event.currentTarget);

    const email = (form.get('email') as string)?.trim();
    const password = form.get('password') as string;

    if (password !== form.get('password-confirmation')) {
      setErrors({
        passwordConfirmation: 'senha e confirmação são diferentes',
      });
      return;
    }

    switch (await signUp(email, password)) {
      case 201:
        await signIn(email, password).then(async () => {
          setAccount(await info());
          history.push('/sign-up/first-steps');
        });
        break;
      case 409:
        setErrors({ email: 'email em uso' });
        break;
      default:
        console.error('unknown error at sign-up');
    }
  }

  const emailRegex = new RegExp(emailPattern);
  const timedExistsEmail = timed(500, async (email: string) => {
    if (errors?.email) setErrors(null);

    if (!emailRegex.test(email)) {
      setErrors({ email: 'email invalido' });
      return;
    }

    exists(email).then((used) => {
      if (!used) return;

      setErrors({ email: 'email em uso' });
    });
  });

  return (
    <div className="SignUp">
      <BackButton onClick={() => history.push('/home')} />

      <form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <Input
          placeholder="E-mail"
          id="email"
          type="email"
          required
          pattern={emailPattern}
          onChange={(event) => timedExistsEmail(event.target.value.trim())}
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
        <Input
          placeholder="Confirmar a Senha"
          id="password-confirmation"
          type="password"
          min={8}
          required
          onChange={
            errors?.passwordConfirmation ? () => setErrors(null) : undefined
          }
          invalid={!!errors?.passwordConfirmation}
          message={errors?.passwordConfirmation}
        />
        <button type="submit" className="primary">
          CRIAR CONTA
        </button>
      </form>

      <img className="logo" src={logo} alt="2DO.svg" />
    </div>
  );
};

export default SignUp;
