import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '../data/content';
import { musicManager } from '../utils/musicManager';

const FRAME_DURATION = 2800; // ms per photo

const FilmStrip = ({ currentIndex, isSpecialPhase }) => {
  const frameCount = photos.length;

  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: '100%',
        maxWidth: '320px',
        background: '#080808',
      }}
    >
      {/* Film strip with sprocket holes */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Left sprocket column */}
        <div
          className="flex flex-col justify-around items-center py-2 flex-shrink-0"
          style={{ width: '28px', background: '#0d0d0d', borderRight: '2px solid #1a1a1a' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="film-hole" style={{ width: '14px', height: '18px', background: '#282828', borderRadius: '3px', margin: '4px 0' }} />
          ))}
        </div>

        {/* Photo area */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{
            aspectRatio: '9 / 16',
            background: '#000',
            border: '3px solid #111',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <img
                src={photos[currentIndex].src}
                alt={`Photo ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Film grain overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
                  mixBlendMode: 'overlay',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />
              {/* Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Frame number */}
          <div
            className="absolute bottom-2 left-2 font-mono text-xs"
            style={{ color: 'rgba(212,165,116,0.7)', letterSpacing: '0.1em', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
          >
            {String(currentIndex + 1).padStart(2, '0')} / 22
          </div>

          {/* Frame edges */}
          <div className="absolute inset-0 pointer-events-none" style={{ border: '2px solid rgba(255,220,100,0.1)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)' }} />
        </div>

        {/* Right sprocket column */}
        <div
          className="flex flex-col justify-around items-center py-2 flex-shrink-0"
          style={{ width: '28px', background: '#0d0d0d', borderLeft: '2px solid #1a1a1a' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="film-hole" style={{ width: '14px', height: '18px', background: '#282828', borderRadius: '3px', margin: '4px 0' }} />
          ))}
        </div>
      </div>

      {/* Film edge label */}
      <div
        className="text-center py-1 font-mono text-xs tracking-widest"
        style={{ color: 'rgba(212,165,116,0.5)', background: '#0d0d0d' }}
      >
        KODAK GOLD • 400 • JIYA 2005–2026
      </div>
    </div>
  );
};

const Page4Photos = ({ onNext }) => {
  const [phase, setPhase] = useState('intro'); // intro | camera | film | special | done
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [cameraZoomed, setCameraZoomed] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    musicManager.stop();
    setTimeout(() => {
      musicManager.playSequential(['alfaaz01', 'alfaaz02']);
    }, 500);
  }, []);

  // Camera → film transition
  const startCameraZoom = () => {
    setCameraZoomed(true);
    setTimeout(() => setPhase('film'), 1800);
  };

  // Auto-advance film strip
  useEffect(() => {
    if (phase !== 'film') return;

    intervalRef.current = setInterval(() => {
      setCurrentPhotoIndex(prev => {
        if (prev >= photos.length - 2) {
          clearInterval(intervalRef.current);
          setTimeout(() => setPhase('special'), 1000);
          return photos.length - 1;
        }
        return prev + 1;
      });
    }, FRAME_DURATION);

    return () => clearInterval(intervalRef.current);
  }, [phase]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0d0a05 0%, #1a1208 50%, #0d0a05 100%)',
      }}
    >
      {/* Intro phase */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="font-dancing text-xl md:text-2xl mb-3"
              style={{ color: '#c4869c' }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              A little glimpse of you...
            </motion.p>
            <motion.h2
              className="font-playfair font-bold mb-8"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
                background: 'linear-gradient(135deg, #be4a6a, #d4a574)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              21 photographs. 21 years. 💗
            </motion.h2>

            <motion.button
              onClick={() => setPhase('camera')}
              className="font-poppins font-medium text-white px-8 py-3.5 rounded-full text-sm tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #be4a6a, #9e7b8c)',
                boxShadow: '0 6px 25px rgba(190, 74, 106, 0.4)',
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Open the camera 📸
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera phase */}
      <AnimatePresence>
        {phase === 'camera' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="font-dancing text-xl mb-6 text-center"
              style={{ color: '#d4a574' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              A vintage camera holds your story...
            </motion.p>

            {/* CSS-based vintage camera */}
            <motion.div
              className="relative cursor-pointer"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={cameraZoomed
                ? { scale: 15, opacity: 0 }
                : { scale: 1, opacity: 1, y: 0 }
              }
              transition={cameraZoomed
                ? { duration: 1.5, ease: 'easeIn' }
                : { duration: 0.8 }
              }
              onClick={!cameraZoomed ? startCameraZoom : undefined}
            >
              {/* Camera body */}
              <div
                className="relative"
                style={{
                  width: '240px',
                  height: '160px',
                  background: 'linear-gradient(145deg, #1c1408, #0d0905)',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,220,100,0.1)',
                  border: '1px solid #2a1f0a',
                }}
              >
                {/* Top plate */}
                <div
                  className="absolute -top-4 left-0 right-0 h-5 rounded-t-lg"
                  style={{ background: 'linear-gradient(to bottom, #c0a060, #a08040)', boxShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                />

                {/* Lens barrel */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, #888870, #aaa890, #888870, #666650, #888870)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Inner lens */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: '65px',
                      height: '65px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #3366aa, #001133)',
                      boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.15), 0 0 20px rgba(50,100,200,0.3)',
                    }}
                  >
                    {/* Lens reflection */}
                    <div
                      className="absolute"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        top: '12px',
                        left: '12px',
                      }}
                    />
                  </div>
                </div>

                {/* Viewfinder */}
                <div
                  className="absolute top-3 right-5"
                  style={{
                    width: '28px',
                    height: '20px',
                    background: '#0a1522',
                    borderRadius: '3px',
                    border: '1px solid #c0a060',
                  }}
                />

                {/* Film knobs */}
                <div
                  className="absolute -top-2 right-8 w-6 h-6 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, #c0a060, #a08040)' }}
                />
                <div
                  className="absolute -top-2 left-8 w-5 h-5 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, #c0a060, #a08040)' }}
                />

                {/* Shutter button */}
                <div
                  className="absolute -top-2 left-1/2"
                  style={{ width: '14px', height: '10px', background: '#d4b060', borderRadius: '3px', transform: 'translateX(-50%)' }}
                />

                {/* Body texture */}
                <div
                  className="absolute inset-0 rounded-xl opacity-30"
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)' }}
                />
              </div>
            </motion.div>

            {!cameraZoomed && (
              <motion.p
                className="font-poppins text-sm mt-8 text-center"
                style={{ color: '#9e7b8c' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                ✦ Click the camera to begin the journey ✦
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film phase */}
      <AnimatePresence>
        {phase === 'film' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center z-20 py-8 px-4 overflow-y-auto hide-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="font-playfair text-center font-bold mb-2"
              style={{
                fontSize: 'clamp(1.2rem, 3.5vw, 2rem)',
                background: 'linear-gradient(135deg, #be4a6a, #d4a574)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              21 photographs. 21 years.
            </motion.h3>
            <p className="font-dancing text-lg mb-6" style={{ color: '#c4869c' }}>A little glimpse of you. 💗</p>

            {/* Film strip */}
            <motion.div
              className="w-full max-w-xs"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FilmStrip currentIndex={currentPhotoIndex} />
            </motion.div>

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhotoIndex}
                className="mt-6 text-center px-4 max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-dancing text-lg md:text-xl" style={{ color: '#d4a574' }}>
                  {photos[currentPhotoIndex].caption}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex gap-1 mt-5 flex-wrap justify-center max-w-xs">
              {photos.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentPhotoIndex ? '20px' : '6px',
                    height: '6px',
                    background: i <= currentPhotoIndex
                      ? 'linear-gradient(to right, #be4a6a, #d4a574)'
                      : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Special 22nd photo phase */}
      <AnimatePresence>
        {phase === 'special' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ background: 'radial-gradient(ellipse at center, #1f0a14 0%, #0d0005 100%)' }}
          >
            <motion.p
              className="font-dancing text-xl md:text-2xl text-center mb-4"
              style={{ color: '#d4a574' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              And then... there was us ✨
            </motion.p>

            {/* Special frame for photo 22 */}
            <motion.div
              className="relative"
              initial={{ scale: 0.7, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
              style={{ maxWidth: '280px', width: '100%' }}
            >
              {/* Decorative frame */}
              <div
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #2a1a1a, #1a0a0a)',
                  borderRadius: '4px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(190,74,106,0.2)',
                  border: '1px solid rgba(212,165,116,0.3)',
                }}
              >
                <img
                  src={photos[21].src}
                  alt="Riddhi & Jiya"
                  className="w-full"
                  style={{ aspectRatio: '9/16', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded"
                style={{ boxShadow: '0 0 60px rgba(190,74,106,0.4)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.p
              className="font-dancing text-xl text-center mt-4"
              style={{ color: '#f5a7be' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {photos[21].caption}
            </motion.p>

            <motion.button
              onClick={onNext}
              className="mt-8 font-poppins font-medium text-white px-8 py-3.5 rounded-full text-sm tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #be4a6a, #9e7b8c)',
                boxShadow: '0 6px 25px rgba(190, 74, 106, 0.4)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue the journey... 💌
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background golden dust particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: '#d4a574',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Page4Photos;
