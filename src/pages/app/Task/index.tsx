import React from 'react';
import './styles.scss';

const Task: React.FC = () => {


  return (

    < div className="wrap-collabsible" >
      <input id="collapsible" className="toggle" type="checkbox" />
      <label className="lbl-toggle">More Info</label>
      <div className="collapsible-content">
        <div className="content-inner">
          <p> QUnit is by calling one of the object that are embedded in JavaScript
          , and faster JavaScript program could also used with its elegant, well
          documented, and functional programming using JS, HTML pages Modernizr is
          a popular browsers without plug-ins. Test-Driven Development.</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
