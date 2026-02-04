import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Gate from './pages/Gate';
import Memories from './pages/Memories';
import { AudioProvider } from './contexts/AudioProvider';
import { Toaster } from './components/ui/toaster';
import LyricCinematic from './components/LyricCinematic';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    // Unlock immediately without flower burst
    setIsUnlocked(true);
  };

  return (
    <AudioProvider>
      <Router>
        <div className="min-h-screen relative overflow-hidden">
          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                isUnlocked ? (
                  <Navigate to="/memories" replace />
                ) : (
                  <Gate onUnlock={handleUnlock} />
                )
              }
            />
            <Route
              path="/memories"
              element={
                isUnlocked ? (
                  <Memories />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>

          {/* Cinematic Lyrics - Always mounted */}
          <LyricCinematic />

          {/* Toast notifications */}
          <Toaster />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
