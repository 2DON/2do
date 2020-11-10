import React, { useContext, useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import api from '../../api';
import AccountContext from '../../context/AccountContext';
import { auth } from '../../context/AuthContext';
import ProjectContext from '../../context/ProjectContext';
import './Sidebar.scss';
import SidebarTile from './SidebarTile';

const Sidebar: React.FC = () => {
  const { project, setProject } = useContext(ProjectContext) as ProjectContext;
  const { account } = useContext(AccountContext) as AccountContext;

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      setProjects(
        (await (await api.get('/projects', { headers: auth() }))
          .data) as Project[]
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
