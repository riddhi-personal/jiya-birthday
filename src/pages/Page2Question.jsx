import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { FloatingButterfly, AnimatedSparkle } from '../components/Decorations';
import { musicManager } from '../utils/musicManager';

const Page2Question = ({ onNext }) => {
  const [noClicked, setNoClicked] = useState(false);
  const [yesText, setYesText] = useState('YES 💗');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Mashup should still be playing from Page 1 — just let it continue

  const handleNo = () => {
    setNoClicked(true);
    setYesText('😭😭 YES, I\'m ready!');
  };

  const handleYes = () => {
    onNext();
  };

  // Randomly move the NO button when hovered (before clicking)
  const handleNoHover = () => {
    if (!noClicked) {
      setNoPosition({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
      });
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #fff0f5 0%, #fce7f3 30%, #f5e6d3 70%, #fff7ed 100%)',
      }}
    >
      <ParticleBackground count={25} />

      <FloatingButterfly style={{ top: '10%', left: '8%' }} delay={0} size={40} />
      <FloatingButterfly style={{ top: '15%', right: '8%' }} delay={2} size={35} />
      <FloatingButterfly style={{ bottom: '15%', right: '10%' }} delay={1} size={38} />

      <AnimatedSparkle style={{ top: '20%', left: '20%' }} delay={0.3} size={18} />
      <AnimatedSparkle style={{ top: '25%', right: '25%' }} delay={0.9} size={14} />
      <AnimatedSparkle style={{ bottom: '25%', left: '25%' }} delay={1.4} size={16} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-xl">
        {/* Animated heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4"
        >
          <span className="font-dancing text-xl md:text-2xl" style={{ color: '#be4a6a' }}>
            Hey Jiyaa 🎀
          </span>
        </motion.div>

        <motion.h2
          className="font-playfair font-bold mb-4"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
            color: '#7c2d44',
            lineHeight: 1.3,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Are you ready to listen to Riddhi?
        </motion.h2>

        <motion.p
          className="font-poppins text-sm md:text-base mb-14"
          style={{ color: '#9e7b8c' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          (Choose wisely... 🌸)
        </motion.p>

        {/* Buttons area */}
        <div className="relative flex gap-6 items-center justify-center min-h-[80px]">
          {/* YES button */}
          <motion.button
            onClick={handleYes}
            className="relative overflow-hidden font-poppins font-medium text-white px-8 py-3.5 rounded-full text-sm md:text-base tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #be4a6a, #9e7b8c)',
              boxShadow: '0 6px 25px rgba(190, 74, 106, 0.4)',
              minWidth: '160px',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={yesText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {yesText}
              </motion.span>
            </AnimatePresence>

            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            />
          </motion.button>

          {/* NO button */}
          <AnimatePresence>
            {!noClicked && (
              <motion.button
                onClick={handleNo}
                onMouseEnter={handleNoHover}
                className="font-poppins font-medium px-8 py-3.5 rounded-full text-sm md:text-base tracking-wider"
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  border: '2px solid rgba(196, 134, 156, 0.4)',
                  color: '#9e7b8c',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  minWidth: '100px',
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: noPosition.x,
                  y: noPosition.y,
                }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                transition={{
                  opacity: { duration: 0.6, delay: 1.1 },
                  x: { duration: 0.3, ease: 'easeOut' },
                  y: { duration: 0.3, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.9 }}
              >
                NO 🙃
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* After NO is clicked */}
        <AnimatePresence>
          {noClicked && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-dancing text-xl mt-8"
              style={{ color: '#be4a6a' }}
            >
              Okay okay... I know you will 🥺
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page2Question;
