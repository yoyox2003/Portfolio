import ProjectCard from "./ProjectCard";
import projects from "@/data/projects";

const Projects = () => {
  return (
    <div className="grid grid-cols-1 gap-[1.25em] @min-[640px]:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.name} {...project} />
      ))}
    </div>
  );
};

export default Projects;
