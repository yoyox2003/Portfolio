const eyebrow =
  "mb-[1.33em] text-[0.75em] font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";
const heading = "text-[2em] tracking-[-0.03em]";

const Contact = () => {
  return (
    <section id="contact" className="pt-[4.375em] pb-[1.25em] min-[561px]:pt-[6.25em]">
      <p className={eyebrow}>Get in touch</p>
      <h2 className={`${heading} mb-4`}>Contact</h2>
      <p className="leading-[1.6] text-[#c1bdb9]">Add clickable contacts here</p>
    </section>
  );
};

export default Contact;
