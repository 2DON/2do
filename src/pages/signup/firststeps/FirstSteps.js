import React, { useState } from 'react'
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom'
import person from '../../../assets/person.svg'
import Input from '../../../components/input/Input'
import { edit } from '../../../services/AuthService'
import '../../../styles/FullScreenQuestion.scss'
import './FirstSteps.scss'

function FirstSteps() {
  const match = useRouteMatch()

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
  )
}

function SetupName() {
  const next = '/sign-up/first-steps/avatar'
  const history = useHistory()

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.target)

    if ((await edit({ name: form.get('name').trim() })) === 200) {
      history.push(next)
    } else {
      console.error('unknown error at first-steps/name')
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
  )
}

function SetupAvatar() {
  const next = '/app'
  const history = useHistory()

  const [preview, setPreview] = useState(person)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.target)

    const avatar = form.get('avatar')
    if (!avatar.path) history.push(next)

    if ((await edit({ avatar })) === 200) {
      history.push(next)
    } else {
      console.error('unknown error at first-steps/avatar')
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
              if (event.target.files)
                setPreview(URL.createObjectURL(event.target.files[0]))
            }}
          />

          <img src={preview} alt="avatar" />
          <span>SELECIONAR AVATAR</span>
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
  )
}

export default FirstSteps
