import React, { useContext } from 'react';
import { FiUser } from 'react-icons/fi';
import Input from '../../../components/input/Input';
import AccountContext from '../../../context/AccountContext';
import { email as emailPattern } from '../../../utils/Patterns';
import './styles.scss';

const Dados: React.FC = () => {

  const { account } = useContext(AccountContext) as AccountContext;

  return (
    <div className="Data">
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

      <Input
        placeholder="Senha"
        id="Senha"
        type="password"
      />

    </div>
  );
};

const DataUser: React.FC<{ id: number, status: TaskStatus, onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ id, status, onChange }) => {

  return (
    <select>

      <button type="submit">Salvar Mudanças</button>
      <button type="reset">Cancelar</button>

    </select>
  );
};

export default Dados;
