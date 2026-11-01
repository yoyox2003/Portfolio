const linkStyle = "font-semibold text-[#f4f2f0] no-underline hover:text-[#cbbcff] focus-visible:rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#cbbcff]";

const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-between px-6 py-7 min-[801px]:fixed min-[801px]:inset-y-0 min-[801px]:left-0 min-[801px]:w-[260px] min-[801px]:px-9 min-[801px]:py-[42px]">
      <div>
        <a className={`${linkStyle} text-xl font-bold`} href="#about">youssef</a>
        <p className="mt-[14px] mb-5 leading-[1.6] text-[#aaa6a3] min-[801px]:mb-8">
          Your title<br />Your location
        </p>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-5 min-[801px]:flex-col min-[801px]:items-start min-[801px]:gap-4">
          <a className={linkStyle} href="#about">About</a>
          <a className={linkStyle} href="#projects">Projects</a>
          <a className={linkStyle} href="#contact">Contact</a>
        </nav>
      </div>
      <p className="hidden text-[0.8rem] leading-[1.6] text-[#aaa6a3] min-[801px]:block">A portfolio in progress.</p>
    </aside>
  );
};

export default Sidebar;
