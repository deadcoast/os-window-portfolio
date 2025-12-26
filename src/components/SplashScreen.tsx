import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const text = 'MIV|VIM';

  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0e27]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-7xl md:text-8xl font-bold text-white tracking-wider"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 + i * 0.08,
              ease: 'easeOut'
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
