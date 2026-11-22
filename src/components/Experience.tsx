import myInfo from "@/data/info";

const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="mb-[0.9em] text-[2em] tracking-[-0.03em]">
        Experience
      </h2>
      <ol className="space-y-8">
        {myInfo.experience.map(({ organization, location, role, period, highlights }) => (
          <li
            key={organization}
            className="grid gap-4 @min-[640px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] @min-[640px]:gap-8"
          >
            <div>
              <h3 className="text-[1.35em] leading-tight font-semibold">{organization}</h3>
              <p className="mt-2 text-sm text-[#aaa6a3]">{location}</p>
            </div>
            <div className="relative border-s border-[#cbbcff]/25 ps-5">
              <span aria-hidden="true" className="absolute start-0 top-[0.4em] size-3 -translate-x-1/2 rounded-full border-2 border-[#b7a0f5] bg-[#151515]" />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h4 className="text-[1.12em] font-semibold">{role}</h4>
                <p className="text-sm text-[#cbbcff]">{period}</p>
              </div>
              <ul className="mt-3 list-disc space-y-2 ps-4 leading-relaxed text-[#c1bdb9] marker:text-[#b7a0f5]">
                {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <section aria-labelledby="education-heading" className="mt-12">
        <h3 id="education-heading" className="mb-[0.9em] text-[1.6em] tracking-[-0.03em]">
          Education
        </h3>
        <div className="grid gap-4 @min-[640px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] @min-[640px]:gap-8">
          <div>
            <p className="text-[1.2em] leading-tight font-semibold">
              {myInfo.education.institutions.join(" & ")}
            </p>
            <p className="mt-2 text-sm text-[#aaa6a3]">{myInfo.education.location}</p>
          </div>
          <div className="relative border-s border-[#cbbcff]/25 ps-5">
            <span aria-hidden="true" className="absolute start-0 top-[0.4em] size-3 -translate-x-1/2 rounded-full border-2 border-[#b7a0f5] bg-[#151515]" />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h4 className="text-[1.12em] font-semibold">{myInfo.education.degree}</h4>
              <p className="text-sm text-[#cbbcff]">{myInfo.education.graduation}</p>
            </div>
            <p className="mt-3 leading-relaxed text-[#c1bdb9]">{myInfo.education.program}</p>
            <p className="mt-2 leading-relaxed text-[#c1bdb9]">GPA: {myInfo.education.gpa}</p>
            <p className="mt-2 leading-relaxed text-[#c1bdb9]">{myInfo.education.distinction}</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Experience;
