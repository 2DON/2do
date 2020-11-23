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
import * as AccountService from '../../../services/AccountService';
import '../../../styles/FullScreenQuestion.scss';
import SignUp from '../SignUp';
import './FirstSteps.scss';

const SetupName: React.FC = () => {
  const next = '/sign-up/first-steps/avatar';
  const { setAccount } = useContext(AccountContext) as AccountContext;
  const history = useHistory();

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.set('name', (formData.get('name') as string)?.trim());

    try {
      const account = await AccountService.update(formData);
      setAccount(account);
      history.push(next);
    } catch {
      console.error('unknown error at first-steps/name');
    }
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

const FirstSteps: Page = () => {
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

FirstSteps.path =  `${SignUp.path}/first-steps`

export default FirstSteps;
