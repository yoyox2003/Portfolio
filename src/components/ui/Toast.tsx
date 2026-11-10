import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type ToastProps = {
  message: string | null;
  color?: "normal" | "error";
};

const Toast = ({ message, color = "normal" }: ToastProps) => {
  const reducedMotion = useReducedMotion();

  const bgColor = color === "error" ? "bg-red-800" : "bg-[#262422]";

  return (
    <div
      role="status"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
            className={`rounded-full border border-white/15 ${bgColor} px-5 py-3 text-sm text-[#f4f2f0] shadow-lg`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
