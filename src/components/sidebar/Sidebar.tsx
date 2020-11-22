import React, { useContext, useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import * as ProjectService from '../../services/ProjectService';
import AccountContext from '../../context/AccountContext';
import ProjectContext from '../../context/ProjectContext';
import './Sidebar.scss';
import SidebarTile from './SidebarTile';

const Sidebar: React.FC = () => {
  const { project, setProject } = useContext(ProjectContext) as ProjectContext;
  const { account } = useContext(AccountContext) as AccountContext;

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    ProjectService.index().then(projects => setProjects(projects));
  }, []);

  return (
    <aside className="Sidebar">
      <div
        className={`SidebarTile ${project === null ? 'selected' : ''}`}
        title="Home"
        onDragStart={(e) => e.preventDefault()}
        onClick={() => setProject(null)}
      >
        {account?.avatarUrl &&
        account?.avatarUrl !== 'data:image/png;base64,' ? (
          <img src={account.avatarUrl} alt="Avatar" />
        ) : (
          <FiUser />
        )}
      </div>
      {projects.map((proj) => (
        <SidebarTile
          key={proj.id}
          project={proj}
          selected={proj.id === project?.id}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
