import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const tickTock = ["Tick", "Tock"];

export default function Progress({
  isVisible = false,
  dialog = false,
  message,
}) {
  const timerRef = useRef(-1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isVisible) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % 2);
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
      };
    } else {
      clearInterval(timerRef.current);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`bg-white bg-opacity-50 backdrop-blur-sm flex flex-col justify-center items-center h-full w-full ${
            dialog && "absolute z-50 h-screen w-screen top-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { ease: "easeInOut", staggerChildren: 0.2 },
          }}
          exit={{ opacity: 0 }}
        >
          <div className="text-xl">{message}</div>
          <div className="flex flex-col justify-center h-12 overflow-hidden">
            <motion.div
              key={index}
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -48, opacity: 0 }}
              className="text-lg font-extrabold"
            >
              {tickTock[index]}
            </motion.div>
          </div>
          {dialog && (
            <div className="absolute inset-x-0 bottom-0 py-4 flex justify-center items-center font-bold">
              L.O.T.
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Progress.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  dialog: PropTypes.bool,
  message: PropTypes.string,
};
