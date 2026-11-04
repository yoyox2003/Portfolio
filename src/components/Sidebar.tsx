import { useLayoutEffect, useRef, type RefObject } from "react";
import myInfo from "@/data/info";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const linkStyle =
  "font-semibold text-[#f4f2f0] no-underline hover:text-[#cbbcff] focus-visible:rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#cbbcff] transition-colors duration-150";

type sidebarProps = {
  portfolioRef: RefObject<HTMLDivElement | null>;
};

const Sidebar = ({ portfolioRef }: sidebarProps) => {
  const sidebarRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const portfolio = portfolioRef.current;
    if (!portfolio) return;
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          ".sidebar-item",
          { x: -window.innerWidth },
          {
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: portfolio,
              start: "top 90%",
              end: "top top",
              scrub: 0.5,
            },
          },
        );
      },
      portfolio,
    );

    return () => media.revert();
  }, [portfolioRef, sidebarRef]);

  return (
    <aside
      ref={sidebarRef}
      className="flex flex-col justify-between px-6 py-7 min-[801px]:sticky min-[801px]:top-0 min-[801px]:h-screen min-[801px]:w-[260px] min-[801px]:shrink-0 min-[801px]:px-9 min-[801px]:py-[42px]"
    >
      <div>
        <p
          className={`${linkStyle} sidebar-item text-xl font-bold cursor-pointer transition-colors duration-150`}
        >
          {myInfo.name.first + " " + myInfo.name.second}
        </p>
        <p className="mt-[14px] sidebar-item mb-5 leading-[1.6] text-[#aaa6a3] min-[801px]:mb-8">
          {myInfo.title}
          <br />
          {myInfo.location}
        </p>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap gap-5 min-[801px]:flex-col min-[801px]:items-start min-[801px]:gap-4"
        >
          <a className={linkStyle + " sidebar-item inline-block"} href="#about">
            About
          </a>
          <a className={linkStyle + " sidebar-item inline-block"} href="#projects">
            Skills
          </a>
          <a className={linkStyle + " sidebar-item inline-block"} href="#contact">
            Contact
          </a>
        </nav>
      </div>
      <p className="hidden text-[0.8rem] leading-[1.6] text-[#aaa6a3] min-[801px]:block">
        A portfolio in progress.
      </p>
    </aside>
  );
};

export default Sidebar;
