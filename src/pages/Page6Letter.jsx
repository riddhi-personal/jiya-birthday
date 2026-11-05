import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalNote } from '../data/content';
import { musicManager } from '../utils/musicManager';
import { AnimatedSparkle, FloatingButterfly, ElegantDivider, HeartLine } from '../components/Decorations';
import { logout } from '../utils/auth';

const Page6Letter = ({ onLogout }) => {
  const [headingPhase, setHeadingPhase] = useState('after'); // 'after' | 'always' | 'letter'
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    musicManager.stop();
    setTimeout(() => {
      musicManager.play('thodiDer', false);
    }, 400);

    // Heading animation sequence
    const t1 = setTimeout(() => setHeadingPhase('pause'), 2200);
    const t2 = setTimeout(() => setHeadingPhase('always'), 3000);
    const t3 = setTimeout(() => setShowLetter(true), 5000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleLogout = () => {
    musicManager.stop();
    logout();
    onLogout();
  };

  const paragraphs = personalNote.split('\n');

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fdf8f2 0%, #faf3e8 30%, #f9eee0 60%, #fdf5ec 100%)',
      }}
    >
      {/* Decorations */}
      <FloatingButterfly style={{ top: '5%', left: '3%' }} delay={0} size={38} />
      <FloatingButterfly style={{ top: '8%', right: '4%' }} delay={3} size={32} />
      <FloatingButterfly style={{ bottom: '30%', left: '4%' }} delay={1.5} size={28} />
      <AnimatedSparkle style={{ top: '15%', left: '18%' }} delay={0.3} size={16} />
      <AnimatedSparkle style={{ top: '20%', right: '20%' }} delay={0.9} size={14} />
      <AnimatedSparkle style={{ bottom: '20%', right: '15%' }} delay={1.4} size={18} />

      {/* Soft glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(245,167,190,0.15), transparent 60%)' }} />

      {/* DRAMATIC HEADING */}
      <div className="relative z-10 pt-16 pb-6 text-center px-6">
        <AnimatePresence mode="wait">
          {headingPhase === 'after' && (
            <motion.div
              key="after"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="font-playfair font-bold italic"
                style={{
                  fontSize: 'clamp(1.8rem, 6vw, 4rem)',
                  color: '#7c2d44',
                  textShadow: '0 2px 20px rgba(190,74,106,0.2)',
                  letterSpacing: '0.02em',
                }}
              >
                AFTER ALL THIS TIME ??
              </h2>
            </motion.div>
          )}

          {headingPhase === 'always' && (
            <motion.div
              key="always"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-playfair font-bold"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 5rem)',
                  background: 'linear-gradient(135deg, #be4a6a, #d4a574)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 4px 20px rgba(190,74,106,0.3))',
                  letterSpacing: '0.08em',
                }}
              >
                ALWAYS !!
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mx-auto mt-3"
                style={{
                  height: '2px',
                  width: '120px',
                  background: 'linear-gradient(to right, #be4a6a, #d4a574)',
                  borderRadius: '2px',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitle after heading reveals */}
        {showLetter && (
          <motion.p
            className="font-dancing text-xl mt-4"
            style={{ color: '#c4869c' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            A letter from Riddhii 💌
          </motion.p>
        )}
      </div>

      {/* Letter */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="relative z-10 max-w-2xl mx-auto px-4 pb-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Letter paper */}
            <div
              className="letter-paper rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 20px 70px rgba(0,0,0,0.12), 0 4px 20px rgba(190,74,106,0.08)',
                border: '1px solid rgba(212,165,116,0.2)',
              }}
            >
              {/* Top decoration */}
              <div
                className="py-4 px-8 text-center"
                style={{ background: 'linear-gradient(to bottom, rgba(212,165,116,0.1), transparent)', borderBottom: '1px solid rgba(212,165,116,0.15)' }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,116,0.5))' }} />
                  <HeartLine size={18} color="#be4a6a" />
                  <span className="font-dancing text-sm" style={{ color: '#c4869c' }}>Personal Note</span>
                  <HeartLine size={18} color="#be4a6a" />
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(212,165,116,0.5))' }} />
                </div>
              </div>

              {/* Letter body */}
              <div className="p-6 md:p-10 pl-10 md:pl-14">
                <div className="font-poppins text-sm md:text-base leading-relaxed space-y-4" style={{ color: '#4a3028' }}>
                  {paragraphs.map((line, i) => {
                    if (line === '---') {
                      return <ElegantDivider key={i} color="#c4869c" />;
                    }
                    if (!line.trim()) {
                      return <div key={i} className="h-2" />;
                    }
                    return (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.5 }}
                        className={
                          line.includes('Madhav') && i > paragraphs.length - 15
                            ? 'font-dancing text-lg md:text-xl'
                            : line.includes('RIDDHI CHOPDA')
                            ? 'font-playfair italic font-semibold'
                            : ''
                        }
                        style={{
                          color: line.includes('Madhav') && i > paragraphs.length - 15
                            ? '#be4a6a'
                            : line.includes('RIDDHI CHOPDA')
                            ? '#7c2d44'
                            : '#4a3028',
                        }}
                      >
                        {line}
                      </motion.p>
                    );
                  })}
                </div>

                <ElegantDivider color="#d4a574" />

                {/* Final two lines */}
                <motion.div
                  className="text-center mt-6 space-y-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <p
                    className="font-playfair font-bold"
                    style={{ fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: '#7c2d44' }}
                  >
                    Happy Birthday Once Again, Jiyaa!! 💗
                  </p>
                  <p
                    className="font-dancing text-xl md:text-2xl"
                    style={{ color: '#be4a6a' }}
                  >
                    With lots of love, Riddhiiii 🎀
                  </p>
                </motion.div>

                {/* Wax seal decoration */}
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5, type: 'spring' }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle, #be4a6a, #7c2d44)',
                      boxShadow: '0 4px 15px rgba(190, 74, 106, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}
                  >
                    <HeartLine size={24} color="rgba(255,255,255,0.8)" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <motion.div
              className="text-center mt-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <div className="flex justify-center gap-2 text-2xl">
                {['💗', '🎀', '✨', '🎀', '💗'].map((e, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>

              <p className="font-dancing text-lg" style={{ color: '#c4869c' }}>
                Made with ♥ for Jiyaa — 7 Nov 2026
              </p>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="font-poppins text-xs underline-offset-2 hover:underline transition-colors"
                style={{ color: '#c4869c', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background floating petals */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            background: ['#fce7f3', '#f5a7be', '#f5e6d3', '#fce7f3'][i % 4],
            left: Math.random() * 100 + '%',
            top: -20,
            opacity: 0.5,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default Page6Letter;
