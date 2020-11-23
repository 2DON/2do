import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/2DO.svg';
import AuthContext from '../../context/AuthContext';
import App from '../app/App';
import SignIn from '../signin/SignIn';
import './Start.scss';

const Start: Page = () => {
  const history = useHistory();
  const { authorized } = useContext(AuthContext) as AuthContext;

  // AUTO LOGIN
  useEffect(() => {
    if (!authorized) return;

    history.push(App.path);
  }, [authorized, history]);

  return (
    <div className="Start">
      <img className="logo" src={logo} alt="2DO.svg" />
      <button
        type="button"
        className="primary"
        onClick={() => history.push(SignIn.path)}
      >
        ENTRAR
      </button>
      <p className="caption" onClick={() => history.push(SignIn.path)}>
        Novo? Crie uma Conta!
      </p>
    </div>
  );
};

Start.path = "/home";

export default Start;
