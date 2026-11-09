// Replace these examples with your own projects.
export const projects = [
  {
    title: "Project One",
    description: "Add a short description of your project here.",
    color: "bg-[#c9baf4]",
  },
  {
    title: "Project Two",
    description: "Describe what you built and what it does.",
    color: "bg-[#b3c9db]",
  },
  {
    title: "Project Three",
    description: "Share another project you would like to feature.",
    color: "bg-[#e6c0a8]",
  },
  {
    title: "Project Four",
    description: "Add your project details when you are ready.",
    color: "bg-[#b9cbb9]",
  },
];

type ProjectCardProps = {
  title: string;
  description: string;
  color: string;
};

const ProjectCard = ({ title, description, color }: ProjectCardProps) => {
  return (
    <article className="content-animation w-full min-w-0 overflow-hidden rounded-[2em] bg-[#262422]">
      <div
        className={`grid aspect-video place-items-center text-[0.8em] font-semibold tracking-[0.08em] text-[#292536] uppercase ${color}`}
        aria-hidden="true"
      >
        <span>Project image</span>
      </div>
      <div className="px-[1.75em] pt-[1.625em] pb-[1.875em]">
        <h3 className="mb-[0.5em] text-[1.25em]">{title}</h3>
        <p className="leading-[1.6] text-[#c1bdb9]">{description}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
