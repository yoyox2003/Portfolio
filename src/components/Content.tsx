import ProjectCard, { projects } from "./ProjectCard";
import myInfo from "@/data/info";

const eyebrow = "mb-4 text-xs font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";
const heading = "text-[2rem] tracking-[-0.03em]";

const Content = () => {
  return (
    <main className="max-w-[1600px] px-6 pb-12 min-[801px]:ml-[260px] min-[801px]:pt-[42px] min-[801px]:pr-[42px] min-[801px]:pb-[60px] min-[801px]:pl-0">
      <section
        id="about"
        className="max-w-[740px] pt-[60px] pb-[70px] min-[801px]:pt-14 min-[801px]:pb-[90px]"
      >
        <p className={eyebrow}>Hello, I'm</p>
        <h1 className="mb-6 text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-[-0.06em]">
          {`${myInfo.name.first} ${myInfo.name.second}`}
          <span className="text-[#b7a0f5]">.</span>
        </h1>
        <p className="max-w-[550px] text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.6] text-[#c1bdb9]">
          {myInfo.summary}
        </p>
      </section>

      <section id="projects">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className={eyebrow}>A selection of work</p>
            <h2 className={heading}>Projects</h2>
          </div>
          <p className="mb-1 hidden text-[0.8rem] text-[#aaa6a3] min-[561px]:block">
            Selected projects / Examples
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 min-[561px]:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section id="contact" className="pt-[70px] pb-5 min-[561px]:pt-[100px]">
        <p className={eyebrow}>Get in touch</p>
        <h2 className={`${heading} mb-4`}>Contact</h2>
        <p className="leading-[1.6] text-[#c1bdb9]">Add clickable contacts here</p>
      </section>
    </main>
  );
};

export default Content;
