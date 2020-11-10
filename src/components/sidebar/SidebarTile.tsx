import React, { useContext } from 'react';
import { MdViewQuilt } from 'react-icons/md';
import ProjectContext from '../../context/ProjectContext';

const SidebarTile: React.FC<SidebarTileProps> = ({
  project,
  selected,
  fallback = <MdViewQuilt />,
}) => {
  const { setProject } = useContext(ProjectContext) as ProjectContext;

  const className = `SidebarTile ${selected ? 'selected' : ''}`;
  const title = project.description;
  const image = project.avatarUrl;

  return (
    <div
      className={className}
      title={title}
      onDragStart={(e) => e.preventDefault()}
      onClick={() => setProject(project)}
    >
      {image ? <img src={image} alt={title} /> : fallback}
    </div>
  );
};

interface SidebarTileProps {
  project: Project;
  selected: boolean;
  fallback?: React.ReactNode | React.FC;
}

export default SidebarTile;
