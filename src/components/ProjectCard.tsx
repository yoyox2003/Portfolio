import { useRef, type PointerEvent } from "react";
import Link from "./ui/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import type { Project } from "@/data/project";

type ProjectCardProps = Project & {
  onOpen: (trigger: HTMLButtonElement) => void;
};

const ProjectCard = ({
  name,
  assets,
  description,
  repository,
  textOnly,
  onOpen,
}: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
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
    <article
      className="relative h-full w-full min-w-0 overflow-hidden rounded-[1em] bg-[#262422] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:scale-[1.02]"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {!textOnly && (
        <div
          className="grid aspect-video place-items-center overflow-hidden text-[0.8em] font-semibold tracking-[0.08em] text-[#c0bccb] uppercase"
          aria-hidden="true"
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
          <div className="relative z-20">
            <Link href={repository} ariaLabel={`View ${name} on GitHub`}>
              <FontAwesomeIcon icon={faGithub} aria-hidden="true" className="size-6!" />
            </Link>
          </div>
        </div>
        <p className="leading-[1.6] text-[#c1bdb9]">{description}</p>
      </div>
      <button
        type="button"
        className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#cbbcff]"
        aria-label={`View details for ${name}`}
        aria-haspopup="dialog"
        onClick={(event) => {
          videoRef.current?.pause();
          onOpen(event.currentTarget);
        }}
      />
    </article>
  );
};

export default ProjectCard;
