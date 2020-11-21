import React, { useContext, useState } from 'react';
import { FiUser, FiEdit } from 'react-icons/fi';
import Input from '../../components/input/Input';
import AccountContext from '../../context/AccountContext';
import './Dados.scss';

const Dados: React.FC = () => {
  const [projects] = useState<Project[]>([]);
  const { account } = useContext(AccountContext) as AccountContext;

  return (
    <div className="Data">
      <p id="title">Avatar</p>
      <caption>{account?.avatarUrl && account?.avatarUrl !== 'data:image/png;base64,' ? (
        <img src={account.avatarUrl} alt="Avatar" />
      ) : (
          <FiUser />
        )}</caption>

      <FiEdit id="edit" />

      <Input
        placeholder="Nome"
        id="Nome" />
      <FiEdit id="edit" />
      <Input
        placeholder="Email"
        id="Email" />
      <FiEdit id="edit" />
      <Input
        placeholder="Senha"
        id="Senha" />
    </div>
  );
};

export default Dados;
