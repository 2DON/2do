import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/2DO.svg';
import AuthContext from '../../context/AuthContext';
import { app_path, sign_in_path, sign_up_path } from '../../pages';
import './Start.scss';

const Start: React.FC = () => {
  const history = useHistory();
  const { authorized } = useContext(AuthContext) as AuthContext;

  // AUTO LOGIN
  useEffect(() => {
    sessionStorage.removeItem('sign-up-cache')

    if (!authorized) return;

    history.push(app_path);
  }, [authorized, history]);

  return (
    <div className="Start">
      <img className="logo" src={logo} alt="2DO.svg" />
      <button
        type="button"
        className="primary"
        onClick={() => history.push(sign_in_path)}
      >
        ENTRAR
      </button>
      <p className="caption" onClick={() => history.push(sign_up_path)}>
        Novo? Crie uma Conta!
      </p>
    </div>
  );
};

export default Start;
