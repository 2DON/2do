import { createContext, useMemo, useState } from 'react';

export function useProjectContext(): ProjectContext {
  const [project, setProject] = useState<Project | null>(null);
  return useMemo(() => ({ project, setProject }), [project, setProject]);
}

export default createContext<ProjectContext | null>(null);
