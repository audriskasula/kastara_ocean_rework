import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel() {
  const [page, setPage] = useState(0);
  const direction = 1;
  const items = [0, 1, 2, 3, 4, 5];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "calc(100% + 20px)" : "calc(-100% - 20px)",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "calc(-100% - 20px)" : "calc(100% + 20px)",
      opacity: 0,
    }),
  };

  return (
    <div className="overflow-hidden relative w-full flex gap-[20px]">
      <AnimatePresence mode="popLayout" custom={direction}>
        {[0, 1, 2].map((offset) => {
          const abs = page + offset;
          const idx = abs % items.length;
          return (
            <motion.div
              layout
              key={abs}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full md:w-[calc(33.333%-13.33px)] shrink-0 bg-blue-500 h-32"
            >
              {idx}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
