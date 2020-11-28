import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface ProjectRouteParams {
  projectId: string | undefined
}

const Project: React.FC = () => {
  const { projectId } = useParams<ProjectRouteParams>();

  if (projectId == null) throw new Error('-> Project - projectId cannot be undefined');

  useEffect(() => {
    console.log(`loaded with projectId: ${projectId}`);
  })

  return <pre>projectId: {projectId}</pre>
}

export default Project
