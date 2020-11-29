import React, { useEffect, useState } from 'react'
import * as ProjectService from '../../../services/ProjectService'
import { useParams } from 'react-router-dom'
import './styles.scss'
import TaskList from '../TaskList'

interface ProjectRouteParams {
  projectId: string | undefined
}

const Project: React.FC = () => {
  const { projectId } = useParams<ProjectRouteParams>()
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    if (projectId)
      setProject(ProjectService
        .cached
        .get(Number(projectId)))
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
