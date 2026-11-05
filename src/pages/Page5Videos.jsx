import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, Heart, ExternalLink } from 'lucide-react';
import { videoLinks } from '../data/content';
import { musicManager } from '../utils/musicManager';
import { AnimatedSparkle, FloatingButterfly, ElegantDivider } from '../components/Decorations';

const VideoCard = ({ title, subtitle, description, buttonText, link, icon: Icon, delay = 0 }) => {
  const handleWatch = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 20px 60px rgba(190, 74, 106, 0.1), 0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      {/* Top decorative bar */}
      <div
        className="h-1.5 w-full"
        style={{ background: 'linear-gradient(to right, #be4a6a, #c4869c, #d4a574)' }}
      />

      <div className="p-6 md:p-8">
        {/* Icon area */}
        <motion.div
          className="flex justify-center mb-5"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #be4a6a20, #d4a57420)',
              border: '1px solid rgba(190, 74, 106, 0.2)',
            }}
          >
            <Icon size={28} style={{ color: '#be4a6a' }} />
          </div>
        </motion.div>

        {/* Title */}
        <h3
          className="font-playfair font-bold text-center mb-1"
          style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#7c2d44' }}
        >
          {title}
        </h3>

        {subtitle && (
          <p className="font-dancing text-lg text-center mb-3" style={{ color: '#be4a6a' }}>
            {subtitle}
          </p>
        )}

        {description && (
          <p className="font-poppins text-sm text-center mb-6 leading-relaxed" style={{ color: '#9e7b8c' }}>
            {description}
          </p>
        )}

        {/* Play button */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleWatch}
            className="flex items-center gap-2.5 font-poppins font-medium text-white px-8 py-3.5 rounded-full text-sm tracking-wider relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #be4a6a 0%, #9e7b8c 100%)',
              boxShadow: '0 6px 25px rgba(190, 74, 106, 0.4)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 35px rgba(190, 74, 106, 0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Play size={16} fill="currentColor" />
            <span>{buttonText}</span>
            <ExternalLink size={14} className="opacity-70" />

            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Corner hearts */}
      <div className="absolute top-3 right-3 opacity-30">
        <Heart size={16} fill="#be4a6a" color="#be4a6a" />
      </div>
      <div className="absolute bottom-3 left-3 opacity-20">
        <Heart size={12} fill="#d4a574" color="#d4a574" />
      </div>
    </motion.div>
  );
};

const Page5Videos = ({ onNext }) => {
  useEffect(() => {
    // No background music on page 5
    musicManager.stop();
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fdf0f5 0%, #fce7f3 30%, #f5e6d3 70%, #fff7ed 100%)',
      }}
    >
      <FloatingButterfly style={{ top: '8%', left: '5%' }} delay={0} size={40} />
      <FloatingButterfly style={{ top: '10%', right: '6%' }} delay={2} size={35} />
      <AnimatedSparkle style={{ top: '25%', left: '15%' }} delay={0.5} size={16} />
      <AnimatedSparkle style={{ top: '30%', right: '18%' }} delay={1} size={14} />
      <AnimatedSparkle style={{ bottom: '25%', left: '20%' }} delay={1.5} size={18} />

      {/* Soft background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f5e6d3, transparent)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 pb-28">
        {/* Page header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-dancing text-xl md:text-2xl" style={{ color: '#be4a6a' }}>
            For you, Jiyaa 🎀
          </span>
          <h2
            className="font-playfair font-bold mt-2"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              background: 'linear-gradient(135deg, #7c2d44, #be4a6a, #d4a574)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Two Special Videos
          </h2>
          <p className="font-poppins text-sm mt-3" style={{ color: '#9e7b8c' }}>
            Click to watch them in a new tab 🎬
          </p>

          <ElegantDivider color="#c4869c" />
        </motion.div>

        {/* Video cards */}
        <div className="grid gap-6 md:gap-8">
          <VideoCard
            title="Memories"
            subtitle="A reel of our moments..."
            description="A video of everything we've shared — the laughs, the moments, the memories that live on even when time moves forward."
            buttonText="Watch Memories"
            link={videoLinks.memories}
            icon={Film}
            delay={0.3}
          />

          <VideoCard
            title="Personal Talk"
            subtitle="From Riddhii's heart..."
            description="Something I wanted to tell you but couldn't quite put into words. This is for you, Jiyaa. No one else."
            buttonText="Watch Personal Talk"
            link={videoLinks.personalTalk}
            icon={Heart}
            delay={0.6}
          />
        </div>

        {/* Note */}
        <motion.p
          className="font-poppins text-xs text-center mt-8 leading-relaxed"
          style={{ color: '#c4869c' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ✦ Videos will open in Google Drive in a new tab ✦<br />
          No background music plays on this page — the videos speak for themselves.
        </motion.p>

        {/* Next page button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={onNext}
            className="font-poppins font-medium text-white px-8 py-4 rounded-full text-sm tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #be4a6a 0%, #9e7b8c 100%)',
              boxShadow: '0 6px 25px rgba(190, 74, 106, 0.4)',
              letterSpacing: '0.06em',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Go To The Last Page... The End 💌
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Page5Videos;
