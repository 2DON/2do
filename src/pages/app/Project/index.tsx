import React, { useEffect, useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { useHistory, useParams } from 'react-router-dom'
import { project_edit_path } from '../../../pages'
import * as ProjectService from '../../../services/ProjectService'
import TaskList from '../TaskList'
import './styles.scss'

interface ProjectRouteParams {
  projectId: string | undefined
}

const Project: React.FC = () => {
  const history = useHistory()
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
      <h2>
        {project?.description}
        <BsGear onClick={() => history.push(project_edit_path.replace(/:projectId/, projectId as string))} />
      </h2>
      {project?.observation && <p>{project?.observation}</p>}
      <TaskList projectId={Number(projectId)} />
    </div>
  );
}

export default Project
