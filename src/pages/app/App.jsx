import React, { useContext, useState } from 'react'
import person from '../../assets/person.svg'
import { AuthContext } from '../../context/AuthContext'
import './App.scss'

function App() {
  const [account] = useContext(AuthContext)

  const [selected, setSelected] = useState(-1)

  return (
    <div className="App">
      <aside className="Sidebar">
        <div
          className={`icon ${selected === -1 ? 'selected' : ''}`}
          onCLick={() => setSelected(-1)}
        >
          <img src={account?.avatarUrl || person} alt="ProjectProfile" />
        </div>

        <div className="separator"></div>

        {/* map(projects) */}

        <div
          className={`icon ${selected === -2 ? 'selected' : ''}`}
          onClick={() => setSelected(-2)}
        ></div>
      </aside>
      <main>main</main>
    </div>
  )
}

export default App
