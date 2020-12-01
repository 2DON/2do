import React, { useEffect, useState } from 'react'
import { BsGear } from 'react-icons/bs'
import { useHistory, useParams } from 'react-router-dom'
import { project_edit_path } from '../../../pages'
import * as ProjectService from '../../../services/ProjectService'
import TaskList from '../TaskList'
import './styles.scss'

const Project: React.FC = () => {
  const history = useHistory()
  const { projectId } = useParams<Dict<string>>()
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    setProject(ProjectService
      .cached
      .get(Number(projectId)))
  }, [projectId])

  return (
    <div className="Project">
      <h2>
        {project?.description}
        <BsGear onClick={() => history.push(project_edit_path.replace(/:projectId/, projectId))} />
      </h2>
      {project?.observation &&
        <p>{project?.observation
          .split('\n')
          .map((text, index) => (
            <span key={index}>
              {text}<br/>
            </span>
          ))}
        </p>}
      <TaskList projectId={Number(projectId)} />
    </div>
  );
}

export default Project
