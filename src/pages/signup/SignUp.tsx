import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/2DO.svg';
import BackButton from '../../components/backbutton/BackButton';
import Input from '../../components/input/Input';
import { first_steps_path, start_path } from '../../pages';
import * as AccountService from '../../services/AccountService';
import { email as emailPattern } from '../../utils/Patterns';
import { CONFLICT, isStatus } from '../../utils/Status';
import timed from '../../utils/timed';
import './SignUp.scss';

/**
 * @function
 * @description create new user
 * @returns React.FC
 */
const SignUp: React.FC = () => {
  const history = useHistory();
  const [errors, setErrors] = useState<Dict<string> | null>(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (errors) return;

    const formData = new FormData(event.currentTarget);

    formData.set('email', (formData.get('email') as string)?.trim());

    if (formData.get('password') !== formData.get('password-confirmation')) {
      setErrors({
        passwordConfirmation: 'senha e confirmação são diferentes',
      });
      return;
    }

    try {
      sessionStorage.setItem("sign-up-cache", JSON.stringify({ email: (formData.get('email') as string).trim(),
                                                               password: formData.get('password') as string }))

      history.push(first_steps_path);
    } catch (status) {
      if (!isStatus(status)) throw status;
      switch (status) {
        case CONFLICT:
          setErrors({ email: 'email em uso' });
          break;
        default:
          console.error('unknown error at sign-up');
      }
    }
  }

  const emailRegex = new RegExp(emailPattern);
  const timedExistsEmail = timed(500, async (email: string) => {
    if (errors?.email) setErrors(null);

    if (!emailRegex.test(email)) {
      setErrors({ email: 'email invalido' });
      return;
    }

    AccountService.exists(email).then((used) => {
      if (!used) return;

      setErrors({ email: 'email em uso' });
    });
  });

  return (
    <div className="SignUp">
      <BackButton onClick={() => history.push(start_path)} />

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
