import { motion, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollButton()
{
  // const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  // const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  // const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  // const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: lastScrollY > 500 ? 1 : 0,
        scale: lastScrollY > 500 ? 1 : 0,
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary hover:bg-secondary-foreground/90 rounded-full shadow-lg shadow-primary flex items-center justify-center transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="h-5 w-5 text-secondary" />
    </motion.button>
  );
}