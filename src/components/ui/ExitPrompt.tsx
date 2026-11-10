import { motion, useReducedMotion } from "motion/react";

const ExitPrompt = () => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
      transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
      className="pointer-events-none fixed inset-x-8 top-6 z-50 flex justify-end min-[801px]:inset-x-4 min-[801px]:justify-center"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-[#262422] px-5 py-3 text-sm text-[#f4f2f0] shadow-lg">
        <span aria-hidden="true" className="text-lg leading-none text-[#cbbcff]">
          ↑
        </span>
        <span>Scroll up again</span>
      </div>
    </motion.div>
  );
};

export default ExitPrompt;
