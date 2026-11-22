import ProjectCard from "./ProjectCard";
import projects from "@/data/projects";
import { useRef, useState } from "react";
import type { Project } from "@/data/project";
import ProjectDetailsModal from "./ProjectDetailsModal";

type ProjectsProps = {
  onDialogChange: (open: boolean) => void;
};

const Projects = ({ onDialogChange }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-[1.25em] @min-[640px]:grid-cols-2">
        {projects.map((project) => (
          <div key={project.name} className="content-animation min-w-0">
            <ProjectCard
              {...project}
              onOpen={(trigger) => {
                triggerRef.current = trigger;
                setSelectedProject(project);
                onDialogChange(true);
                setOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <ProjectDetailsModal
        project={selectedProject}
        open={open}
        onOpenChange={setOpen}
        onCloseComplete={() => {
          setSelectedProject(null);
          onDialogChange(false);
        }}
        triggerRef={triggerRef}
      />
    </>
  );
};

export default Projects;
