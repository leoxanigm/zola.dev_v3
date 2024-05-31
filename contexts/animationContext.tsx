'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const AnimationContext = createContext(true);
export const SetAnimationContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

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
      <SetAnimationContext.Provider value={setAnimateNav}>
        {children}
      </SetAnimationContext.Provider>
    </AnimationContext.Provider>
  );
}

export function Delayed({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [show, setShow] = useState(false);
  const animate = useContext(AnimationContext);

  useEffect(() => {
    if (!animate) {
      setShow(true);
      return;
    }

    const timer = setTimeout(() => {
      setShow(true);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return show ? <>{children}</> : null;
}
