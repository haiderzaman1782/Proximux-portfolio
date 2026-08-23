import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

export const PageLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[var(--saas-dark-bg)] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
      style={{ pointerEvents: 'none' }}
    >
      <motion.span
        className="text-[var(--saas-lime)] text-2xl font-bold tracking-widest"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
        transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1] }}
      >
        PROXIMUX
      </motion.span>
    </motion.div>
  );
};

export const HeadingReveal = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={`flex flex-wrap gap-x-1.5 sm:gap-x-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block h-fit py-1">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'inherit' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

export const FadeInSection = ({ children, delay = 0, direction = "up" }: { children: React.ReactNode, delay?: number, direction?: "up" | "down" | "left" | "right" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const CountUp = ({ end, duration = 2000, suffix = "", start = false }: { end: number, duration?: number, suffix?: string, start?: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return <span>{count}{suffix}</span>;
};
