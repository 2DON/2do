import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import Input from '../../../components/input/Input';
import AccountContext from '../../../context/AccountContext';
import { app_path } from '../../../pages';
import * as AccountService from '../../../services/AccountService';
import * as AuthService from '../../../services/AuthService';
import '../../../styles/FullScreenQuestion.scss';
import './FirstSteps.scss';

const SetupName: React.FC = () => {
  const next = '/sign-up/first-steps/avatar';
  const history = useHistory();

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const { email, password } = JSON.parse(sessionStorage.getItem('sign-up-cache') as string) as {email: string, password: string};

    sessionStorage.setItem('sign-up-cache', JSON.stringify({ email, password, name: (formData.get('name') as string)?.trim() }))

    history.push(next);
  }

  return (
    <form className="FullScreenQuestion" onSubmit={handleSubmit}>
      <h2>Nome</h2>
      <Input
        placeholder="Como gostaria de ser chamado?"
        id="name"
        type="text"
        required
      />
      <div className="options">
        <button
          type="button"
          className="outlined"
          onClick={() => history.push(next)}
        >
          PULAR
        </button>
        <button type="submit" className="primary">
          AVANÇAR
        </button>
      </div>
    </form>
  );
};

const SetupAvatar: React.FC = () => {
  const next = '/app';
  const { setAccount } = useContext(AccountContext) as AccountContext;
  const history = useHistory();

  const [preview, setPreview] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!preview) return; // TODO make avatar red? alert?

    const { email, password, name } = JSON.parse(sessionStorage.getItem('sign-up-cache') as string);

    formData.set('email', email);
    formData.set('password', password);
    formData.set('name', name);

    try {
      await AuthService.signUp(formData);
      sessionStorage.removeItem('sign-up-cache')

      history.push(app_path);
      // TODO now the user needs to verify his email
    } catch {
      console.error('unknown error at first-steps/name');
    }

    try {
      const account = await AccountService.updateAvatar(formData);
      setAccount(account);
      history.push(next);
    } catch {
      console.error('unknown error at first-steps/avatar');
    }
  }

  return (
    <form
      className="FirstSteps SetupAvatar FullScreenQuestion"
      onSubmit={handleSubmit}
    >
      <h2>Avatar</h2>
      <div className="avatar">
        <label>
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/x-png,image/jpeg"
            name="avatar"
            onChange={(event) => {
              if (!event.target.files || event.target.files.length < 1) return;

              const [image] = event.target.files;

              if (image.size > /* 900KB */ 900000) {
                setWrong(true);
                return;
              }

              setWrong(false);
              setPreview(URL.createObjectURL(image));
            }}
          />
          {preview ? (
            <img src={preview} alt="avatar" className="img" />
          ) : (
            <FiUser className="img" />
          )}
          <span>SELECIONAR AVATAR</span>
          <p className={`message ${wrong ? 'wrong' : ''}`}>
            tamanho maximo 900KB
          </p>
        </label>
      </div>
      <div className="options">
        <button
          type="button"
          className="outlined"
          onClick={() => history.push(next)}
        >
          PULAR
        </button>
        <button type="submit" className="primary">
          AVANÇAR
        </button>
      </div>
    </form>
  );
};

const FirstSteps: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/name`}>
        <SetupName />
      </Route>
      <Route path={`${match.path}/avatar`}>
        <SetupAvatar />
      </Route>
      <Redirect to={`${match.path}/name`} />
    </Switch>
  );
};

export default FirstSteps;
