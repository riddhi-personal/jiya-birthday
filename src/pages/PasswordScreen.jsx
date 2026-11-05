import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Heart } from 'lucide-react';
import { checkPassword, setAuthenticated, checkRateLimit, recordFailedAttempt, clearAttempts } from '../utils/auth';
import { AnimatedSparkle, FloatingButterfly } from '../components/Decorations';

const PasswordScreen = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lockout, setLockout] = useState({ locked: false, seconds: 0 });

  useEffect(() => {
    const { allowed, remainingSeconds } = checkRateLimit();
    if (!allowed) {
      setLockout({ locked: true, seconds: remainingSeconds });
      const timer = setInterval(() => {
        const { allowed: a, remainingSeconds: s } = checkRateLimit();
        if (a) {
          setLockout({ locked: false, seconds: 0 });
          clearInterval(timer);
        } else {
          setLockout({ locked: true, seconds: s });
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockout.locked) return;

    const { allowed } = checkRateLimit();
    if (!allowed) {
      setError(`Too many attempts. Please wait ${lockout.seconds} seconds.`);
      return;
    }

    setIsLoading(true);
    // Small delay to prevent brute force
    await new Promise(r => setTimeout(r, 600));

    if (checkPassword(password)) {
      clearAttempts();
      setAuthenticated();
      setIsLoading(false);
      onAuthenticated();
    } else {
      recordFailedAttempt();
      const { allowed: a, remainingSeconds: s } = checkRateLimit();
      if (!a) {
        setLockout({ locked: true, seconds: s });
        setError(`Too many attempts. Please wait ${s} seconds.`);
      } else {
        setError('Incorrect password. Please try again.');
      }
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      setPassword('');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f5e6d3 60%, #fff1f2 100%)',
      }}
    >
      {/* Decorative elements */}
      <FloatingButterfly style={{ top: '10%', left: '8%' }} delay={0} size={45} />
      <FloatingButterfly style={{ top: '15%', right: '10%' }} delay={2} size={35} />
      <FloatingButterfly style={{ bottom: '20%', left: '15%' }} delay={4} size={30} />
      <FloatingButterfly style={{ bottom: '15%', right: '12%' }} delay={1} size={40} />

      <AnimatedSparkle style={{ top: '25%', left: '20%' }} delay={0.5} size={18} />
      <AnimatedSparkle style={{ top: '30%', right: '25%' }} delay={1} size={14} />
      <AnimatedSparkle style={{ bottom: '30%', left: '30%' }} delay={1.5} size={20} />
      <AnimatedSparkle style={{ top: '60%', right: '15%' }} delay={0.3} size={16} />

      {/* Soft background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', transform: 'translate(-40%, -40%)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #f5e6d3, transparent)', transform: 'translate(40%, 40%)' }} />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <motion.div
          animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 20px 60px rgba(190, 74, 106, 0.15), 0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          {/* Lock icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #be4a6a, #9e7b8c)', boxShadow: '0 8px 25px rgba(190, 74, 106, 0.4)' }}>
              <Lock size={28} color="white" />
            </div>
          </motion.div>

          {/* Heading */}
          <div className="text-center mb-2">
            <h1 className="font-playfair text-2xl md:text-3xl font-bold"
              style={{ color: '#7c2d44' }}>
              A little secret...
            </h1>
            <p className="font-dancing text-lg mt-1" style={{ color: '#be4a6a' }}>
              Just for you, Jiyaa 💗
            </p>
          </div>

          <p className="font-poppins text-center text-sm mt-3 mb-7" style={{ color: '#9e7b8c' }}>
            Enter the password to open your birthday surprise
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter password..."
                disabled={lockout.locked || isLoading}
                className="w-full px-5 py-3.5 pr-12 rounded-2xl font-poppins text-sm outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: error ? '2px solid #be4a6a' : '2px solid rgba(196, 134, 156, 0.3)',
                  color: '#7c2d44',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
                  letterSpacing: showPassword ? 'normal' : '4px',
                }}
                onFocus={e => { e.target.style.borderColor = '#be4a6a'; e.target.style.boxShadow = '0 0 0 3px rgba(190, 74, 106, 0.1), inset 0 2px 8px rgba(0,0,0,0.04)'; }}
                onBlur={e => { e.target.style.borderColor = error ? '#be4a6a' : 'rgba(196, 134, 156, 0.3)'; e.target.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.04)'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#9e7b8c' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-poppins text-xs text-center"
                  style={{ color: '#be4a6a' }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Lockout message */}
            {lockout.locked && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-poppins text-xs text-center"
                style={{ color: '#9e7b8c' }}
              >
                Please wait {lockout.seconds}s before trying again...
              </motion.p>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={lockout.locked || isLoading || !password}
              className="w-full py-3.5 rounded-2xl font-poppins font-medium text-white text-sm tracking-wider transition-all duration-300 relative overflow-hidden"
              style={{
                background: lockout.locked || !password
                  ? 'rgba(196, 134, 156, 0.4)'
                  : 'linear-gradient(135deg, #be4a6a 0%, #9e7b8c 100%)',
                boxShadow: lockout.locked || !password ? 'none' : '0 6px 20px rgba(190, 74, 106, 0.4)',
                cursor: lockout.locked || !password ? 'not-allowed' : 'pointer',
              }}
              whileHover={!lockout.locked && password ? { scale: 1.02 } : {}}
              whileTap={!lockout.locked && password ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={16} />
                  <span>Opening...</span>
                </motion.div>
              ) : (
                'Enter ✨'
              )}
            </motion.button>
          </form>

          {/* Bottom hint */}
          <p className="font-dancing text-center text-sm mt-6" style={{ color: '#c4869c' }}>
            Made with love by Riddhii 🎀
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PasswordScreen;
