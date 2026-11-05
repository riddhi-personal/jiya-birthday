import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeartScene3D from '../components/HeartScene3D';
import { AnimatedSparkle, ElegantDivider } from '../components/Decorations';
import { bdayNote } from '../data/content';
// Mashup continues from Page 1 — no music change needed here

const Page3Heart = ({ onNext }) => {
  const [heartOpened, setHeartOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [liquidActive, setLiquidActive] = useState(false);

  const handleHeartClick = () => {
    if (!heartOpened) {
      setHeartOpened(true);
      setLiquidActive(true);
      setTimeout(() => setShowMessage(true), 1500);
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0a0f 0%, #2d0f1a 30%, #1f0812 60%, #0d0005 100%)',
      }}
    >
      {/* Crimson liquid overlay effect */}
      <AnimatePresence>
        {liquidActive && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Dripping effect */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0"
                style={{
                  left: `${5 + i * 8}%`,
                  width: `${1 + Math.random() * 2}px`,
                  background: `linear-gradient(to bottom, #8b0000, #cc2244, transparent)`,
                  opacity: 0.6,
                  borderRadius: '0 0 50% 50%',
                }}
                initial={{ height: 0 }}
                animate={{ height: `${20 + Math.random() * 60}vh` }}
                transition={{
                  duration: 1.5 + Math.random() * 1,
                  delay: Math.random() * 0.8,
                  ease: 'easeIn',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background sparkles */}
      <AnimatedSparkle style={{ top: '10%', left: '5%' }} delay={0} size={12} />
      <AnimatedSparkle style={{ top: '20%', right: '8%' }} delay={0.5} size={10} />
      <AnimatedSparkle style={{ bottom: '30%', left: '10%' }} delay={1} size={14} />
      <AnimatedSparkle style={{ bottom: '20%', right: '12%' }} delay={0.8} size={11} />

      {/* Top intro text */}
      <motion.div
        className="relative z-30 pt-12 pb-4 text-center px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-dancing text-xl md:text-2xl" style={{ color: '#c4869c' }}>
          Let's see what's written inside
        </p>
        <h2
          className="font-playfair font-bold italic mt-1"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, #be4a6a, #d4a574)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Riddhi's heart...
        </h2>

        {!heartOpened && (
          <motion.p
            className="font-poppins text-sm mt-3"
            style={{ color: '#9e7b8c' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Click the heart to open it ✦
          </motion.p>
        )}
      </motion.div>

      {/* 3D Heart */}
      <div className="relative z-10" style={{ height: '45vh', maxHeight: '400px' }}>
        <Suspense fallback={
          <div className="h-full flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full"
              style={{ background: 'radial-gradient(circle, #be4a6a, #7c2d44)' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        }>
          <HeartScene3D isOpen={heartOpened} onHeartClick={handleHeartClick} />
        </Suspense>

        {/* Pulsing glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(190,74,106,0.15), transparent 70%)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Message reveal */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="relative z-30 mx-auto max-w-2xl px-4 md:px-8 pb-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div
              className="rounded-3xl p-6 md:p-10"
              style={{
                background: 'rgba(253, 242, 248, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(196, 134, 156, 0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <div className="text-center mb-6">
                <span className="font-dancing text-2xl" style={{ color: '#d4a574' }}>
                  ✦ From Riddhi's heart ✦
                </span>
              </div>

              <ElegantDivider color="#be4a6a" />

              <div className="space-y-4 font-poppins text-sm md:text-base leading-relaxed" style={{ color: '#fdf2f8' }}>
                {bdayNote.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={line.startsWith('Happiest') || line.includes('💓') ? 'font-playfair text-center text-lg md:text-xl font-semibold' : ''}
                    style={{
                      color: line.startsWith('Happiest') || line.includes('💓')
                        ? '#f5a7be'
                        : line.includes('🔥')
                        ? '#d4a574'
                        : 'rgba(253, 242, 248, 0.9)',
                    }}
                  >
                    {line || '\u00A0'}
                  </motion.p>
                ))}
              </div>

              <ElegantDivider color="#be4a6a" />

              {/* Next button */}
              <div className="flex justify-center mt-8">
                <motion.button
                  onClick={handleNext}
                  className="relative overflow-hidden font-poppins font-medium text-white px-10 py-4 rounded-full text-sm tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, #be4a6a, #9e7b8c)',
                    boxShadow: '0 8px 30px rgba(190, 74, 106, 0.5)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Something About You ✨
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient bottom overlay */}
      <div
        className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to top, #0d0005, transparent)' }}
      />
    </div>
  );
};

export default Page3Heart;
