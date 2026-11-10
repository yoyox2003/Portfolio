import { type ReactNode } from "react";

type LinkProps = {
  href: string;
  ariaLabel: string;
  children: ReactNode;
};

const Link = ({ href, ariaLabel, children }: LinkProps) => {
  const isEmail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noreferrer"}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center rounded-sm hover:text-[#cbbcff] transition-colors text-[#f4f2f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cbbcff] duration-150 mr-4"
    >
      {children}
    </a>
  );
};

export default Link;
