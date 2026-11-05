import React from 'react';
import { motion } from 'framer-motion';

// Decorative butterfly SVG
export const Butterfly = ({ size = 40, color = '#be4a6a', style = {} }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 60 42" fill="none" style={style}>
    <ellipse cx="22" cy="18" rx="18" ry="12" fill={color} fillOpacity="0.6" />
    <ellipse cx="38" cy="18" rx="18" ry="12" fill={color} fillOpacity="0.6" />
    <ellipse cx="20" cy="30" rx="12" ry="8" fill={color} fillOpacity="0.4" />
    <ellipse cx="40" cy="30" rx="12" ry="8" fill={color} fillOpacity="0.4" />
    <path d="M30 8 Q30 22 30 36" stroke="#7c2d44" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M27 6 Q28 2 30 1 Q32 2 33 6" stroke="#7c2d44" strokeWidth="1" fill="none" strokeLinecap="round" />
  </svg>
);

// Animated floating butterflies
export const FloatingButterfly = ({ style = {}, delay = 0, size = 40 }) => {
  const colors = ['#be4a6a', '#c4869c', '#d4a574', '#9e7b8c'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      style={{ position: 'absolute', ...style }}
      animate={{
        x: [0, 30, -20, 40, 0],
        y: [0, -40, -80, -50, -20],
        rotate: [-5, 10, -15, 5, 0],
        opacity: [0, 0.8, 0.9, 0.6, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        animate={{ rotateY: [0, 60, 0, -60, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <Butterfly size={size} color={color} />
      </motion.div>
    </motion.div>
  );
};

// Fine-line heart
export const HeartLine = ({ size = 24, color = '#be4a6a', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 21.6C12 21.6 2 14.4 2 7.2C2 4.4 4.3 2 7 2C9 2 10.7 3.1 12 4.8C13.3 3.1 15 2 17 2C19.7 2 22 4.4 22 7.2C22 14.4 12 21.6 12 21.6Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Sparkle element
export const Sparkle = ({ size = 20, color = '#d4a574', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
    <path d="M10 1 L10.8 8.2 L18 10 L10.8 11.8 L10 19 L9.2 11.8 L2 10 L9.2 8.2 Z" fill={color} />
  </svg>
);

// Animated sparkle
export const AnimatedSparkle = ({ style = {}, delay = 0, size = 20 }) => (
  <motion.div
    style={{ position: 'absolute', ...style }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
    transition={{ duration: 2 + Math.random(), delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Sparkle size={size} color={['#d4a574', '#f5a7be', '#be4a6a', '#c4869c'][Math.floor(Math.random() * 4)]} />
  </motion.div>
);

// Decorative divider
export const ElegantDivider = ({ color = '#c4869c' }) => (
  <div className="flex items-center gap-3 my-6">
    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}40, ${color}, ${color}40, transparent)` }} />
    <HeartLine size={16} color={color} />
    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}40, ${color}, ${color}40, transparent)` }} />
  </div>
);
