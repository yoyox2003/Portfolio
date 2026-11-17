import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { RefObject } from "react";
import type { Project } from "@/data/project";

type ProjectDetailsModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseComplete: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const actionStyle =
  "inline-flex items-center justify-center rounded-lg border border-[#cbbcff]/40 px-4 py-2 font-medium text-[#cbbcff] transition-colors hover:bg-[#cbbcff]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cbbcff]";
const sectionHeading = "mb-4 text-xl font-semibold text-[#f4f2f0]";

const DetailsList = ({ title, items }: { title: string; items?: string[] }) => {
  if (!items?.length) return null;

  return (
    <section>
      <h3 className={sectionHeading}>{title}</h3>
      <ul className="list-disc space-y-3 pl-5 leading-relaxed text-[#c1bdb9] marker:text-[#b7a0f5]">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
};

const ProjectDetailsModal = ({
  project,
  open,
  onOpenChange,
  onCloseComplete,
  triggerRef,
}: ProjectDetailsModalProps) => {
  const photos = [...new Set(
    [project?.assets.photo.preview, ...(project?.assets.photo.screenshots ?? [])]
      .filter((src): src is string => Boolean(src)),
  )];
  const videoCandidates = [
    { label: "Demo", src: project?.assets.video.demo },
    { label: "Additional walkthrough", src: project?.assets.video.specific },
  ];
  const videos = videoCandidates.filter((video, index, all) =>
    video.src && all.findIndex((candidate) => candidate.src === video.src) === index,
  );

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) onCloseComplete();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/75 opacity-100 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          finalFocus={triggerRef}
          className="fixed top-1/2 left-1/2 z-50 flex max-h-[92dvh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#262422] text-[#f4f2f0] shadow-2xl outline-none transition-[opacity,scale] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none motion-reduce:data-[starting-style]:scale-100 motion-reduce:data-[ending-style]:scale-100"
        >
          {project && (
            <>
              <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8">
                <div className="min-w-0">
                  <p className="mb-1 text-sm text-[#b8aaa0]">{project.context}</p>
                  <Dialog.Title className="text-2xl font-semibold sm:text-3xl">{project.name}</Dialog.Title>
                </div>
                <Dialog.Close aria-label="Close project details" className="shrink-0 cursor-pointer rounded-lg p-2 text-[#c1bdb9] hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#cbbcff]">
                  <X aria-hidden="true" size={22} />
                </Dialog.Close>
              </header>
              <div className="min-h-0 space-y-8 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
                <Dialog.Description className="leading-relaxed text-[#c1bdb9]">{project.description}</Dialog.Description>
                <div>
                  <div className="flex flex-wrap gap-3">
                    {project.repository && (
                      <a className={actionStyle} href={project.repository} target="_blank" rel="noreferrer">GitHub</a>
                    )}
                    {project.deployment.status === "live" ? (
                      <a className={actionStyle} href={project.deployment.url} target="_blank" rel="noreferrer">Visit website</a>
                    ) : (
                      <button type="button" disabled className="cursor-not-allowed rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-[#aaa6a3]">Visit website</button>
                    )}
                  </div>
                  {project.deployment.status !== "live" && (
                    <p className="mt-3 text-sm text-[#aaa6a3]">
                      {project.deployment.status === "unavailable" ? "Deployment currently unavailable" : "Not deployed"}
                    </p>
                  )}
                </div>
                <section>
                  <h3 className={sectionHeading}>Technologies</h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li key={technology} className="rounded-md bg-[#b7a0f5]/10 px-3 py-1.5 text-sm text-[#cbbcff]">{technology}</li>
                    ))}
                  </ul>
                </section>
                <DetailsList title="Features" items={project.features} />
                <DetailsList title="Contributions" items={project.contributions} />
                <DetailsList title="Research details" items={project.researchDetails} />
                {project.thesis && (
                  <section>
                    <h3 className={sectionHeading}>Thesis</h3>
                    <p className="leading-relaxed text-[#c1bdb9]">{project.thesis}</p>
                  </section>
                )}
                <DetailsList title="Authors" items={project.authors} />
                {open && videos.length > 0 && (
                  <section>
                    <h3 className={sectionHeading}>Videos</h3>
                    <div className="space-y-6">
                      {videos.map((video) => (
                        <figure key={video.src}>
                          <figcaption className="mb-2 text-sm text-[#c1bdb9]">{video.label}</figcaption>
                          <video aria-label={`${project.name} ${video.label}`} src={video.src ?? undefined} controls playsInline preload="metadata" className="aspect-video w-full rounded-lg bg-black object-contain" />
                        </figure>
                      ))}
                    </div>
                  </section>
                )}
                {open && photos.length > 0 && (
                  <section>
                    <h3 className={sectionHeading}>Photos</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {photos.map((src, index) => (
                        <Dialog.Root key={src}>
                          <Dialog.Trigger
                            aria-label={`Enlarge ${project.name} screenshot ${index + 1}`}
                            className="cursor-zoom-in overflow-hidden rounded-lg bg-black/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cbbcff]"
                          >
                            <img src={src} alt={`${project.name} interface screenshot ${index + 1}`} loading="lazy" className="aspect-video w-full object-contain" />
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/90 opacity-100 transition-opacity duration-300 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none" />
                            <Dialog.Popup className="fixed top-1/2 left-1/2 z-[60] flex max-h-[94dvh] w-[calc(100%-2rem)] max-w-[96rem] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#151515] text-[#f4f2f0] shadow-2xl outline-none transition-[opacity,scale] duration-300 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none motion-reduce:data-[starting-style]:scale-100 motion-reduce:data-[ending-style]:scale-100">
                              <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3">
                                <Dialog.Title className="text-sm font-medium">
                                  {project.name} — Screenshot {index + 1}
                                </Dialog.Title>
                                <Dialog.Close aria-label="Close enlarged photo" className="shrink-0 cursor-pointer rounded-lg p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#cbbcff]">
                                  <X aria-hidden="true" size={22} />
                                </Dialog.Close>
                              </header>
                              <img src={src} alt={`${project.name} interface screenshot ${index + 1}`} className="min-h-0 w-full flex-1 object-contain pb-4" />
                            </Dialog.Popup>
                          </Dialog.Portal>
                        </Dialog.Root>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProjectDetailsModal;
