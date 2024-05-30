'use client';

import { createContext, useEffect, useState } from 'react';

export const AnimationContext = createContext(true);

const ANIMATE_AGAIN_AFTER = 30 * 60 * 1000; // 30 minutes

export default function AnimationContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [animateNav, setAnimateNav] = useState(true);

  useEffect(() => {
    function shouldAnimate(): boolean {
      const lastAnimated = localStorage.getItem('lastAnimated');

      if (lastAnimated) {
        const timeDiff = Date.now() - parseInt(lastAnimated);

        // If the last animation was more than 30 minutes ago or less than 500ms ago
        // checking 500ms to account React double render during development
        if (timeDiff > ANIMATE_AGAIN_AFTER || timeDiff < 500) {
          localStorage.removeItem('lastAnimated');

          return true;
        }

        return false;
      }

      localStorage.setItem('lastAnimated', Date.now().toString());

      return true;
    }

    setAnimateNav(shouldAnimate());

    return () => {
      // localStorage.removeItem('lastAnimated');
    };
  }, []);

  return (
    <AnimationContext.Provider value={animateNav}>
      {children}
    </AnimationContext.Provider>
  );
}
