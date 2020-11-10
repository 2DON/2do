interface ProjectContext {
  project: Project | null;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
}
