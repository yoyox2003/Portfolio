import myInfo from "@/data/info";

type SkillCategory = keyof typeof myInfo.skills;

const categoryTitles: Record<SkillCategory, string> = {
  languages: "Languages",
  frontend: "Frontend",
  toolsAndDatabases: "Tools and Databases",
  devops: "DevOps",
  computerScience: "Computer Science",
};

const categories = Object.keys(myInfo.skills) as SkillCategory[];

const Skills = () => (
  <section id="skills" aria-labelledby="skills-heading">
    <h2 id="skills-heading" className="mb-[0.9em] text-[2em] tracking-[-0.03em]">
      Skills
    </h2>
    <div className="grid gap-4 @min-[560px]:grid-cols-2">
      {categories.map((category) => (
        <section key={category} className="rounded-[1em] bg-[#262422] p-5">
          <h3 className="mb-3 text-[1.12em] font-semibold">{categoryTitles[category]}</h3>
          <ul className="list-disc space-y-2 ps-5 leading-relaxed text-[#c1bdb9] marker:text-[#b7a0f5]">
            {myInfo.skills[category].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </section>
);

export default Skills;
