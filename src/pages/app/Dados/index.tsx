import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import Input from '../../../components/input/Input';
import AccountContext from '../../../context/AccountContext';
import { email as emailPattern } from '../../../utils/Patterns';
import * as AccountService from '../../../services/AccountService'
import './styles.scss';
import timed from '../../../utils/timed';

const Dados: React.FC = () => {

  const { account } = useContext(AccountContext) as AccountContext;
  const [errors, setErrors] = useState<Dict<string> | null>(null);
  const emailRegex = new RegExp(emailPattern);

  const error = timed(500, async (email: string) => {
    if (errors?.email) setErrors(null);

    if (!emailRegex.test(email)) {
      setErrors({ email: 'email invalido' });
      return;
    }

  }
  )

  function update(form: HTMLFormElement) {
    const formData = new FormData(form)
    if (formData.get('email') === account?.email) {
      formData.delete('email');
    }
    AccountService.update(formData);

  }


  return (
    <form className="Data" onSubmit={e => { e.preventDefault(); update(e.currentTarget) }}>
      <p id="title">Avatar</p>
      <p id="avatar">
        {account?.avatarUrl &&
          account?.avatarUrl !== 'data:image/png;base64,' ? (
            <img src={account.avatarUrl} alt="Avatar" />
          ) : (
            <FiUser />
          )}
      </p>

      <Input
        placeholder="Nome"
        id="name"
        type="text"
        defaultValue={account?.name}
        min={3}

      />

      <Input
        placeholder="Email"
        id="email"
        defaultValue={account?.email}
        pattern={emailPattern}
        onChange={(event) => error(event.target.value.trim())}
        invalid={!!errors?.email}
        message={errors?.email}
      />


      <button type="submit">Salvar Mudanças</button>
      <button type="reset">Cancelar</button>



    </form>
  );
};




export default Dados;
