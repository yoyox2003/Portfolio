import { useState, useEffect, useRef } from "react";
import myInfo from "@/data/info";
import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "./ui/Link";
import Toast from "./ui/Toast";

const eyebrow =
  "mb-[1.33em] text-[0.75em] font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";
const heading = "tracking-[-0.03em]";

const Contact = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastColor, setToastColor] = useState<"normal" | "error">("normal");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const showToast = (message: string, color: "normal" | "error") => {
    setToastMessage(message);
    setToastColor(color);

    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current);
    }

    toastTimer.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimer.current = null;
    }, 2000);
  };

  const copyHandler = async () => {
    try {
      // First checking if its its available incase its open on an older browser.
      if (navigator.clipboard) await navigator.clipboard.writeText(myInfo.contact.email);
      else {
        throw new Error("Failed to copy email");
      }
      showToast("Copied", "normal");
    } catch {
      showToast("Copy Failed - Select email to copy it", "error");
    }
  };

  return (
    <section id="contact" className="pt-[4.375em] pb-[1.25em] min-[561px]:pt-[6.25em]">
      <p className={eyebrow}>Get in touch</p>
      <h2 className={`${heading} text-[2em]`}>Contact</h2>

      <h3 className={`${heading} text-[1.5em] mb-3`}>
        <Link href={`mailto:${myInfo.contact.email}`} ariaLabel="Contact me via Email">
          {myInfo.contact.email}
        </Link>
        <button
          type="button"
          className="rounded-sm hover:text-[#cbbcff] transition-colors text-[#f4f2f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cbbcff] duration-150"
          aria-label="Copy my Email"
          onClick={copyHandler}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </h3>
      <Link
        href={myInfo.contact.linkedin}
        ariaLabel="Visit my LinkedIn profile (opens in a new tab)"
      >
        <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" className="size-13!" />
      </Link>
      <Link href={myInfo.contact.github} ariaLabel="Visit my Github (opens in a new tab)">
        <FontAwesomeIcon icon={faSquareGithub} aria-hidden="true" className="size-13!" />
      </Link>

      <Toast message={toastMessage} color={toastColor} />
    </section>
  );
};

export default Contact;
