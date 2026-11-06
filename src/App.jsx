import React, { useState } from 'react';
import { Home } from './pages/Home';
import { LoadingScreen } from './components/LoadingScreen';

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#3C3630]">
      {loading && <LoadingScreen onLoaded={() => setLoading(false)} />}
      <Home />
    </div>
  );
}

export default App;
