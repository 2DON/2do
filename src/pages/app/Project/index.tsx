import React, { useEffect, useState } from 'react'
import * as ProjectService from '../../../services/ProjectService'
import { useParams } from 'react-router-dom'
import { TaskList } from '../../../components/task/Task';
import './styles.scss'

interface ProjectRouteParams {
  projectId: string | undefined
}

const Project: React.FC = () => {
  const { projectId } = useParams<ProjectRouteParams>();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (projectId)
      ProjectService
        .cached
        .get(Number(projectId))
        .then(setProject)
  }, [projectId])

  return (
    <div className="Project">
      <h2>{project?.description}</h2>
      {project?.observation && <p>{project?.observation}</p>}
      <TaskList projectId={Number(projectId)} />
    </div>
  );
}

export default Project
