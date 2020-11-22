import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import Input from '../../components/input/Input';
import AccountContext from '../../context/AccountContext';
import { email as emailPattern } from '../../utils/Patterns';
import './Dados.scss';

const Dados: React.FC = () => {
  const [projects] = useState<Project[]>([]);
  const { account } = useContext(AccountContext) as AccountContext;

  return (
    <div className="Data">
      <p id="title">Avatar</p>
      <caption>
        {account?.avatarUrl &&
          account?.avatarUrl !== 'data:image/png;base64,' ? (
            <img src={account.avatarUrl} alt="Avatar" />
          ) : (
            <FiUser />
          )}
      </caption>
      <Input
        placeholder="Nome"
        id="Nome"
        type="text"
        defaultValue={account?.name}
      />

      <Input
        placeholder="Email"
        id="Email"
        type="email"
        pattern={emailPattern}
        defaultValue={account?.email}
      />

      <Input placeholder="Senha" id="Senha" type="password" />
      <button type="submit">Salvar Mudanças</button>
    </div>
  );
};

export default Dados;
