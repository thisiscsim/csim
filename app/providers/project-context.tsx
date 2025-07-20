'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Project } from '@/app/data';

interface ProjectContextValue {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function ProjectProvider({
  children,
  initialProject = null,
}: {
  children: ReactNode;
  initialProject?: Project | null;
}) {
  const [currentProject, setCurrentProject] = useState<Project | null>(initialProject);

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
