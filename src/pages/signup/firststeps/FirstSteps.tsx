/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import person from '../../../assets/person.svg';
import Input from '../../../components/input/Input';
import AuthContext from '../../../context/AuthContext';
import { edit } from '../../../services/AuthService';
import '../../../styles/FullScreenQuestion.scss';
import './FirstSteps.scss';

const SetupName: React.FC = () => {
  const next = '/sign-up/first-steps/avatar';
  const [, setAccount]: any = useContext(AuthContext);
  const history = useHistory();

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.set('name', (formData.get('name') as string)?.trim());

    const response = await edit(formData);
    if (response.status === 200) {
      setAccount(await response.json());
      history.push(next);
    } else {
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
  const [, setAccount]: any = useContext(AuthContext);
  const history = useHistory();

  const [preview, setPreview] = useState(person);
  const [wrong, setWrong] = useState(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!preview) history.push(next);

    const response = await edit(formData);
    if (response.status === 200) {
      setAccount(await response.json());
      history.push(next);
    } else {
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
          <img src={preview || person} alt="avatar" />
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
