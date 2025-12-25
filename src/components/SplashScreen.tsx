import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(0);
  const text = ' MIV|VIM'.split('');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 3000),
      setTimeout(() => onComplete(), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2e2e2e]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-[500px] h-[160px]">
            {stage >= 1 && (
              <>
                <motion.div
                  className="absolute left-0 top-1/2 w-full h-[12px] overflow-hidden -mt-[5px]"
                  initial={{ x: 250 }}
                  animate={{ x: 0, skewY: stage >= 2 ? -9 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="w-full h-[10px] bg-white absolute top-[1px]"
                    initial={{ x: -500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </motion.div>

                {stage >= 2 && (
                  <>
                    <motion.div
                      className="absolute left-0 top-1/2 w-full h-[10px] bg-white -mt-[4px]"
                      initial={{ y: 0, skewY: -9 }}
                      animate={{ y: 70 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />

                    <motion.div
                      className="absolute left-0 top-1/2 w-full overflow-hidden -mt-[5px]"
                      initial={{ height: 10, y: 70, skewY: -9 }}
                      animate={{ height: 160, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <div className="text-[100px] font-bold text-white leading-none ml-[14px]">
                        {text.map((char, i) => (
                          <motion.span
                            key={i}
                            className="inline-block mr-[20px]"
                            initial={{ y: -160 }}
                            animate={{ y: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: 'easeOut',
                              delay: 0.1 + i * 0.05,
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {stage >= 3 && (
                  <motion.div
                    className="absolute left-0 top-1/2 w-full overflow-hidden -mt-[5px] h-[160px]"
                    initial={{ skewY: -9 }}
                    animate={{ skewY: -9 }}
                  >
                    <div className="text-[100px] font-bold text-white leading-none ml-[14px]">
                      {text.map((char, i) => (
                        <motion.span
                          key={i}
                          className="inline-block mr-[20px]"
                          initial={{ y: 0 }}
                          animate={{ y: -150 }}
                          transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: i * 0.04,
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
