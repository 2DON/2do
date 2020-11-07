import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/2DO.svg';
import AuthContext from '../../context/AuthContext';
import './Start.scss';

const Start: React.FC = () => {
  const history = useHistory();
  const { authorized } = useContext(AuthContext) as AuthContext;

  // AUTO LOGIN
  useEffect(() => {
    if (!authorized) return;

    history.push('/app');
  }, [authorized, history]);

  return (
    <div className="Start">
      <img className="logo" src={logo} alt="2DO.svg" />
      <button
        type="button"
        className="primary"
        onClick={() => history.push('/sign-in')}
      >
        ENTRAR
      </button>
      <p className="caption" onClick={() => history.push('/sign-up')}>
        Novo? Crie uma Conta!
      </p>
      <button
        type="button"
        className="primary"
        onClick={() => history.push('/error')}
      />
    </div>
  );
};

export default Start;
