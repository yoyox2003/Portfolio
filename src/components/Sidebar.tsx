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
      className="flex flex-col justify-between px-[5vw] py-[1.75em] text-[max(1rem,1vw)] min-[801px]:sticky min-[801px]:top-0 min-[801px]:h-screen min-[801px]:w-[max(13rem,20%)] min-[801px]:shrink-0 min-[801px]:px-[3vw] min-[801px]:py-[2.625em]"
    >
      <div>
        <p
          className={`${linkStyle} sidebar-item text-[1.25em] font-bold cursor-pointer transition-colors duration-150`}
        >
          {myInfo.name.first + " " + myInfo.name.second}
        </p>
        <p className="mt-[0.875em] sidebar-item mb-[1.25em] leading-[1.6] text-[#aaa6a3] min-[801px]:mb-[2em]">
          {myInfo.title}
          <br />
          {myInfo.location}
        </p>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap gap-[1.25em] min-[801px]:flex-col min-[801px]:items-start min-[801px]:gap-[1em]"
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
      <p className="hidden text-[0.8em] leading-[1.6] text-[#aaa6a3] min-[801px]:block">
        A portfolio in progress.
      </p>
    </aside>
  );
};

export default Sidebar;
