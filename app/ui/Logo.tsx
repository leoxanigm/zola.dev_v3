'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { motion } from 'framer-motion';

import { animateLogo } from '@/app/lib/animateLogo';
import clsx from 'clsx';

export default function Logo({ animate }: { animate: boolean }) {
  // Load snap.svg
  // I could probably use framer-motion to animate the logo but I'm not sure if it's worth it
  // as I already have written the animation in snap.svg
  useEffect(() => {
    if (!animate) return;

    function loadSnapSvg(): Promise<HTMLScriptElement> {
      return new Promise((resolve, reject) => {
        const scriptEl = document.createElement('script');
        scriptEl.src = '/js/snap.svg.js';
        scriptEl.className = 'snap-svg';
        scriptEl.async = true;
        scriptEl.onload = () => {
          try {
            resolve(scriptEl);
          } catch (e) {
            reject(undefined);
          }
        };

        document.body.appendChild(scriptEl);
      });
    }

    let scriptEl: HTMLScriptElement | undefined;

    loadSnapSvg().then(async el => {
      scriptEl = el;

      // Check if the logo has been animated in the last 24 hours
      // If it has, don't animate it again for better UX
      localStorage.setItem('lastAnimated', Date.now().toString());

      await animateLogo();
    });

    return () => {
      scriptEl && document.body.removeChild(scriptEl);
    };
  }, []);

  return (
    <motion.div
      className={clsx(
        'fixed top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rotate-0',
        !animate &&
          '!top-0 w-[50px] h-[50px] translate-y-1/2 rotate-[-45deg] opacity-70'
      )}
      transition={{ duration: 0.75, delay: 1 }}
      animate={
        animate && {
          translateY: ['-50%', '50%', '50%'],
          translateX: ['-50%', '-50%', '-50%'],
          top: ['50%', '0%', '0%'],
          left: ['50%', '50%', '50%'],
          width: ['300px', '50px', '50px'],
          height: ['300px', '50px', '50px'],
          rotate: [0, 0, -45],
          opacity: [1, 1, 0.7]
        }
      }>
      <Link href='/'>
        <svg id='logo' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 301 301'>
          {!animate && (
            <>
              <polyline
                points='0,0,300,0,0,300'
                style={{ fillOpacity: 1 }}
                fill='#000000'></polyline>
              <polyline
                points='75,75,125,75,75,125'
                style={{ fillOpacity: 1 }}
                fill='#ffffff'></polyline>
              <polyline
                points='0,300,300,0,300,300'
                style={{ fillOpacity: 1 }}
                fill='#ffffff'></polyline>
              <polyline
                points='175,225,225,175,225,225'
                style={{ fillOpacity: 1 }}
                fill='#000000'></polyline>
              <polyline points='300,0,300,0' stroke='#ffffff'></polyline>
              <polyline points='0,300,0,300' stroke='#ffffff'></polyline>
              <polyline points='75,300,75,300' stroke='#ffffff'></polyline>
              <polyline points='125,0,125,0' stroke='#ffffff'></polyline>
              <polyline points='175,300,175,300' stroke='#ffffff'></polyline>
              <polyline points='225,0,225,0' stroke='#ffffff'></polyline>
              <polyline
                points='0,0,300,0,0,300'
                style={{ fillOpacity: 1 }}
                fill='#000000'></polyline>
              <polyline
                points='75,75,125,75,75,125'
                style={{ fillOpacity: 1 }}
                fill='#ffffff'></polyline>
              <polyline
                points='0,300,300,0,300,300'
                style={{ fillOpacity: 1 }}
                fill='#ffffff'></polyline>
              <polyline
                points='175,225,225,175,225,225'
                style={{ fillOpacity: 1 }}
                fill='#000000'></polyline>
              <polyline points='300,0,300,0' stroke='#ffffff'></polyline>
              <polyline points='0,300,0,300' stroke='#ffffff'></polyline>
              <polyline points='75,300,75,300' stroke='#ffffff'></polyline>
              <polyline points='125,0,125,0' stroke='#ffffff'></polyline>
              <polyline points='175,300,175,300' stroke='#ffffff'></polyline>
              <polyline points='225,0,225,0' stroke='#ffffff'></polyline>
            </>
          )}
        </svg>
      </Link>
    </motion.div>
  );
}
