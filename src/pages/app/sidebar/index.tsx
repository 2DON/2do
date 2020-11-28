import React, { useContext, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdViewQuilt } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import Avatar from '../../../components/App';
import AccountContext from '../../../context/AccountContext';
import { app_path, project_path } from '../../../pages';
import * as ProjectService from '../../../services/ProjectService';
import './styles.scss';

const activeClassName = "active"

const Sidebar = () => {
  const { account } = useContext(AccountContext) as AccountContext;
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    ProjectService.index().then(projects => setProjects(projects));
  }, []);

  return (
    <aside className="Sidebar">
      <NavLink
        className="SidebarTile"
        title={account?.name}
        children={<Avatar url={account?.avatarUrl} />}

        exact
        to={app_path}
        activeClassName={activeClassName}/>

      {projects.map((project) => (
        <NavLink
          key={project.id}

          className="SidebarTile"
          title={project.description}

          to={`${project_path}/${project.id}`}
          activeClassName={activeClassName}
        >
          {project.icon
            ? <img src={project.icon} alt={project.description} />
            : <MdViewQuilt />}
        </NavLink>
      ))}

      <Link
        className="SidebarTile CreateProject"
        title="Create Project"
        children={<FiPlus />}

        to="/app/create-project"
      />
    </aside>
  )
}

export default Sidebar;
