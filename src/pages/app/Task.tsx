import React, { useContext, useState } from 'react';
import './Task.scss';

const Task: React.FC = () => {
  const [projects] = useState<Project[]>([]);

  return (
    <form className="Task">
      <div className="wrap-collabsible">
        <input className="input" type="checkbox">
          <label className="prop">in progress</label>
        </input>
        <div className="collapsible-content">
          <div className="content-inner">
            <p>OPOOOORRRAAAAA</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Task;
