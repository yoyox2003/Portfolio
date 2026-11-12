type ProjectCardProps = {
  project: {};
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="content-animation w-full min-w-0 overflow-hidden rounded-[2em] bg-[#262422]">
      <div
        className={`grid aspect-video place-items-center text-[0.8em] font-semibold tracking-[0.08em] text-[#292536] uppercase`}
        aria-hidden="true"
      >
        <span>Project image</span>
      </div>
      <div className="px-[1.75em] pt-[1.625em] pb-[1.875em]">
        <h3 className="mb-[0.5em] text-[1.25em]">{}</h3>
        <p className="leading-[1.6] text-[#c1bdb9]">{}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
