import { useRef, type PointerEvent } from "react";
import Link from "./ui/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type ProjectCardProps = {
  textOnly: boolean;
  name: string;
  context: string;
  description: string;
  technologies: string[];
  repository: string;
  features?: string[];
  assets: {
    video: {
      preview_loop: string | null;
      demo: string | null;
      specific: string | null;
    };
    photo: {
      preview: string | null;
      screenshots: string[];
    };
  };
  contributions?: string[];
  researchDetails?: string[];
  authors?: string[];
};

const ProjectCard = ({ name, assets, description, repository, textOnly }: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    void videoRef.current?.play().catch(() => {});
  };

  const handlePointerLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  };

  return (
    <article className="content-animation w-full min-w-0 overflow-hidden rounded-[1em] bg-[#262422]  border-cyan-950">
      {!textOnly && (
        <div
          className="grid aspect-video place-items-center overflow-hidden text-[0.8em] font-semibold tracking-[0.08em] text-[#c0bccb] uppercase"
          aria-hidden="true"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {assets.video.preview_loop ? (
            <video
              ref={videoRef}
              src={assets.video.preview_loop}
              className="h-full w-full object-cover"
              preload="auto"
              muted
              loop
              playsInline
            />
          ) : assets.photo.preview ? (
            <img src={assets.photo.preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span>{name} preview</span>
          )}
        </div>
      )}
      <div className="px-[1.75em] pt-[1.625em] pb-[1.875em]">
        <div className="mb-[0.5em] flex items-center gap-2">
          <h3 className="text-[1.25em]">{name}</h3>
          <Link href={repository} ariaLabel="Go to project GitHub page">
            <FontAwesomeIcon icon={faGithub} aria-hidden="true" className="size-6!" />
          </Link>
        </div>
        <p className="leading-[1.6] text-[#c1bdb9]">{description}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
