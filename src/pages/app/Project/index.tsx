import React, { useEffect, useState } from 'react'
import * as ProjectService from '../../../services/ProjectService'
import { FaRegEdit } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import './styles.scss'
import TaskList from '../TaskList'

/**
 * @interface
 * @description is the interface of the routes params
 */
interface ProjectRouteParams {
  projectId: string | undefined
}

/**
 * @function
 * @description return projects
 * @returns React.FC
 */
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
      <h2>
        {project?.description}
        <FaRegEdit />
      </h2>
      {project?.observation && <p>{project?.observation}</p>}
      <TaskList projectId={Number(projectId)} />
    </div>
  );
}

export default Project
