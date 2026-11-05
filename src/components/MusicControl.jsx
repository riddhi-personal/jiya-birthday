import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { musicManager } from '../utils/musicManager';

const MusicControl = () => {
  const [isMuted, setIsMuted] = useState(musicManager.getMuteState());
  const [isVisible, setIsVisible] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const unsubscribe = musicManager.subscribe(({ isMuted: m, currentTrack: t }) => {
      setIsMuted(m);
      setCurrentTrack(t);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    musicManager.setUserInteracted();
    musicManager.toggleMute();
  };

  if (!currentTrack) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Sound wave animation */}
      {!isMuted && (
        <motion.div
          className="flex items-end gap-0.5 h-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0.4, 0.8, 0.6, 1, 0.5].map((h, i) => (
            <motion.div
              key={i}
              className="w-0.5 rounded-full"
              style={{ background: 'linear-gradient(to top, #be4a6a, #d4a574)' }}
              animate={{ height: ['30%', `${h * 100}%`, '30%'] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      )}

      <button
        onClick={handleToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 4px 15px rgba(190, 74, 106, 0.2)',
          color: '#7c2d44',
        }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </motion.div>
  );
};

export default MusicControl;
