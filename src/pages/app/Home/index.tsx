import React from "react";
import { useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { BiData, BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { VscPerson } from "react-icons/vsc";
import Colaboradores from "../Colaboradores";
import Dados from "../Dados";
import TeamMember from "../TeamMember";
import './styles.scss'

const Home = () => {
  const [selected, setSelected] = useState(0);

  const chooseComponent = (selected: number) => {
    switch (selected) {
      case 0:
        return <Dados />;
      case 2:
        return <div style={{ backgroundColor: 'green', padding: 100 }} />;
    }
  }

  return (
    <div className="Home">
      <h3>Projeto Integrador</h3>
      <div className="HomeIdk">
        <ul>
          <li
            className={`${selected === 0 ? 'selected' : ''}`}
            onClick={() => setSelected(0)}
          >
            <BiData className="icon" /> <p>Meus Dados</p>
          </li>
          <li
            className={`${selected === 1 ? 'selected' : ''}`}
            onClick={() => setSelected(1)}
          >
            <BsListTask className="icon" /> <p>Tarefas</p>
          </li>
          <li
            className={`${selected === 2 ? 'selected' : ''}`}
            onClick={() => setSelected(2)}
          >
            <BiTask className="icon" /> <p>Para mim</p>
          </li>
        </ul>
        {chooseComponent(selected)}
      </div>
    </div>
  )
}

export default Home;
