import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/backbutton/BackButton';
import Input from '../../components/input/Input';
import Textarea from '../../components/textarea/Textarea';
import { index, store, update } from '../../services/ProjectService';
import '../signup/firststeps/FirstSteps.scss';
import './CreateProject.scss';

const CreateProject: React.FC = () => {
  const next = '/app/CreateProject/index/first-steps/avatarUrl';
  const history = useHistory();
  const [errors, setErrors] = useState<Dict<string> | null>(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formData.set(
      'description',
      (formData.get('description') as string)?.trim()
    );
    formData.set(
      'observation',
      (formData.get('observation') as string)?.trim()
    );

    try {
      await store(formData);

      history.push(next);
    } catch (err) {
      switch (err?.response?.status) {
        case 400:
          setErrors({ name: 'Ops! Verifique o nome do projeto!' });
          break;
        default:
          console.error('unknown error at create-project', new Error(err));
      }
    }
  }

  return (
    <div className="FullScreenQuestion">
      <BackButton onClick={() => history.push('/app')} />

      <form className="FullScreenQuestion" onSubmit={handleSubmit}>
        <h2>Criar Projeto</h2>
        <Input
          placeholder="Como se chama o seu projeto?"
          id="description"
          type="text"
          required
          onChange={errors?.name ? () => setErrors(null) : undefined}
          invalid={!!errors?.name}
          message={errors?.name}
        />

        <Textarea
          placeholder="Alguma observação do projeto?"
          id="observation"
        />

        <div className="options">
          <button type="submit" className="primary">
            AVANÇAR
          </button>
        </div>
      </form>
    </div>
  );
};

const SetupAvatar: React.FC = () => {
  const next = '/app';
  const history = useHistory();
  const [preview, setPreview] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projects: Promise<Project[]> | null = index();

    if (!preview) history.push(next);

    try {
      await update(1, formData);
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
      <h2>Avatar Projeto</h2>
      <div className="avatar">
        <label>
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/x-png,image/jpeg"
            name="avatarUrl"
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

export const ProjectFirstSteps: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/description`}>
        <CreateProject />
      </Route>
      <Route path={`${match.path}/avatarUrl`}>
        <SetupAvatar />
      </Route>
    </Switch>
  );
};

export default CreateProject;
