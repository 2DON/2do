import React, { useContext, useState } from 'react';
import './Task.scss';

const Task: React.FC = () => {


  return (
    <form className="Task">
      <div className="wrap-collabsible">
        <input className="input" id="put" type="checkbox" />
        <label htmlFor="put" className="prop">in progress</label>
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
