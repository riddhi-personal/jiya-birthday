import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { musicManager } from '../utils/musicManager';
import ParticleBackground from '../components/ParticleBackground';
import { FloatingButterfly, AnimatedSparkle, HeartLine } from '../components/Decorations';

const Page1Welcome = ({ onNext }) => {
  useEffect(() => {
    // Start mashup in loop from Page 1; loop=true means it restarts automatically
    musicManager.setUserInteracted();
    musicManager.play('mashup', true);
  }, []);

  const handleBegin = () => {
    // Music is already running; don't restart
    onNext();
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #fdf0f5 0%, #fce7f3 20%, #f9e1ee 40%, #f5e6d3 70%, #fff7ed 100%)',
      }}
    >
      <ParticleBackground count={35} />

      {/* Butterflies */}
      <FloatingButterfly style={{ top: '8%', left: '5%' }} delay={0} size={50} />
      <FloatingButterfly style={{ top: '12%', right: '7%' }} delay={3} size={40} />
      <FloatingButterfly style={{ bottom: '25%', left: '8%' }} delay={1.5} size={35} />
      <FloatingButterfly style={{ bottom: '20%', right: '5%' }} delay={2.5} size={45} />
      <FloatingButterfly style={{ top: '45%', left: '3%' }} delay={5} size={30} />
      <FloatingButterfly style={{ top: '55%', right: '4%' }} delay={4} size={28} />

      {/* Sparkles */}
      {[
        { top: '15%', left: '25%', delay: 0.2, size: 20 },
        { top: '20%', right: '20%', delay: 0.8, size: 16 },
        { top: '70%', left: '20%', delay: 1.2, size: 18 },
        { top: '75%', right: '22%', delay: 0.5, size: 14 },
        { top: '40%', left: '15%', delay: 1.8, size: 12 },
        { top: '35%', right: '12%', delay: 2.2, size: 22 },
        { bottom: '10%', left: '40%', delay: 0.7, size: 16 },
      ].map((s, i) => (
        <AnimatedSparkle key={i} style={{ top: s.top, bottom: s.bottom, left: s.left, right: s.right }} delay={s.delay} size={s.size} />
      ))}

      {/* Soft radial glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,167,190,0.2), transparent 70%)' }} />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.15), transparent 70%)' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">

        {/* Top ornament */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to right, transparent, #c4869c)' }} />
          <HeartLine size={18} color="#be4a6a" />
          <div className="h-px w-16 md:w-24" style={{ background: 'linear-gradient(to left, transparent, #c4869c)' }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-dancing text-xl md:text-2xl mb-4"
          style={{ color: '#9e7b8c' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A birthday surprise from Riddhii 💌
        </motion.p>

        {/* Main heading — "Happiest B'day" */}
        <motion.h1
          className="font-playfair font-bold leading-tight"
          style={{
            fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
            background: 'linear-gradient(135deg, #7c2d44 0%, #be4a6a 50%, #d4a574 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 8px rgba(190,74,106,0.2))',
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Happiest B'day
        </motion.h1>

        {/* "Jiyaa" — uses Dancing Script so the J is unmistakably a J, not an F */}
        <motion.h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            background: 'linear-gradient(135deg, #be4a6a 0%, #9e7b8c 40%, #d4a574 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 3px 12px rgba(190,74,106,0.25))',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Jiyaa
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="flex items-center gap-3 mt-6 mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="h-px w-20 md:w-32" style={{ background: 'linear-gradient(to right, transparent, #d4a574)' }} />
          <span className="font-dancing text-2xl" style={{ color: '#d4a574' }}>✦</span>
          <div className="h-px w-20 md:w-32" style={{ background: 'linear-gradient(to left, transparent, #d4a574)' }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-poppins font-light text-sm md:text-base mb-12 max-w-sm"
          style={{ color: '#9e7b8c', letterSpacing: '0.08em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          A little world crafted just for you...
        </motion.p>

        {/* CTA button */}
        <motion.button
          onClick={handleBegin}
          className="relative overflow-hidden font-poppins font-medium text-white px-10 py-4 rounded-full text-sm md:text-base tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #be4a6a 0%, #9e7b8c 50%, #c4869c 100%)',
            boxShadow: '0 8px 30px rgba(190, 74, 106, 0.45), 0 2px 10px rgba(0,0,0,0.1)',
            letterSpacing: '0.08em',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(190, 74, 106, 0.55)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Let's Begin, Jiya 💌</span>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' }}
          />
        </motion.button>

        {/* Bottom ornament */}
        <motion.div
          className="mt-14 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          {['💗', '🎀', '✨', '🎀', '💗'].map((e, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Page1Welcome;
