import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PasswordScreen from './pages/PasswordScreen';
import Page1Welcome from './pages/Page1Welcome';
import Page2Question from './pages/Page2Question';
import Page3Heart from './pages/Page3Heart';
import Page4Photos from './pages/Page4Photos';
import Page5Videos from './pages/Page5Videos';
import Page6Letter from './pages/Page6Letter';
import MusicControl from './components/MusicControl';
import { isAuthenticated, logout } from './utils/auth';

// Page transition variants
const pageVariants = {
  initial: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
    scale: 0.97,
    filter: 'blur(6px)',
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    scale: 0.97,
    filter: 'blur(6px)',
  }),
};

// Special cinematic variants for page 3→4
const cinematicVariants = {
  initial: { opacity: 0, scale: 1.3, filter: 'blur(20px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.65, filter: 'blur(20px)' },
};

const TOTAL_PAGES = 6;

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [maxVisited, setMaxVisited] = useState(1); // highest page visited

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
    }
  }, []);

  const navigate = (page) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    setMaxVisited(prev => Math.max(prev, page));
    window.scrollTo(0, 0);
  };

  const handleAuthenticated = () => {
    setAuthenticated(true);
    setCurrentPage(1);
    setMaxVisited(1);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setCurrentPage(0);
    setMaxVisited(1);
  };

  // Which pages can be navigated to (only pages already visited)
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < maxVisited && currentPage < TOTAL_PAGES;

  if (!authenticated) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="password"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PasswordScreen onAuthenticated={handleAuthenticated} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        {currentPage === 1 && (
          <motion.div
            key="page1"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Page1Welcome onNext={() => navigate(2)} />
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="page2"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Page2Question onNext={() => navigate(3)} />
          </motion.div>
        )}

        {currentPage === 3 && (
          <motion.div
            key="page3"
            custom={direction}
            variants={direction < 0 ? pageVariants : cinematicVariants}
            initial="initial"
            animate="animate"
            exit={direction > 0 ? cinematicVariants.exit : pageVariants.exit(direction)}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          >
            <Page3Heart onNext={() => navigate(4)} />
          </motion.div>
        )}

        {currentPage === 4 && (
          <motion.div
            key="page4"
            custom={direction}
            variants={direction > 0 ? cinematicVariants : pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          >
            <Page4Photos onNext={() => navigate(5)} />
          </motion.div>
        )}

        {currentPage === 5 && (
          <motion.div
            key="page5"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Page5Videos onNext={() => navigate(6)} />
          </motion.div>
        )}

        {currentPage === 6 && (
          <motion.div
            key="page6"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Page6Letter onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Persistent UI Overlay ───────────────────────────────────── */}
      {authenticated && currentPage > 0 && (
        <>
          {/* Page indicator dots */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-1.5">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => p <= maxVisited && navigate(p)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: p === currentPage ? '20px' : '6px',
                  height: '6px',
                  background: p === currentPage
                    ? 'linear-gradient(to right, #be4a6a, #d4a574)'
                    : p <= maxVisited
                    ? 'rgba(190, 74, 106, 0.45)'
                    : 'rgba(190, 74, 106, 0.15)',
                  cursor: p <= maxVisited ? 'pointer' : 'default',
                }}
                title={`Page ${p}`}
              />
            ))}
          </div>

          {/* Back button */}
          <AnimatePresence>
            {canGoBack && (
              <motion.button
                key="back-btn"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(currentPage - 1)}
                className="fixed left-3 md:left-5 bottom-20 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.55)',
                  boxShadow: '0 4px 16px rgba(190, 74, 106, 0.18)',
                  color: '#7c2d44',
                }}
                title="Go back"
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Forward button */}
          <AnimatePresence>
            {canGoForward && (
              <motion.button
                key="forward-btn"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(currentPage + 1)}
                className="fixed right-3 md:right-5 bottom-20 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.55)',
                  boxShadow: '0 4px 16px rgba(190, 74, 106, 0.18)',
                  color: '#7c2d44',
                }}
                title="Go forward"
              >
                <ChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Music control */}
          <MusicControl />
        </>
      )}
    </div>
  );
};

export default App;
