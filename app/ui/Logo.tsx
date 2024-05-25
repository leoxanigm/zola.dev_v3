'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { motion, useAnimate } from 'framer-motion';

import { animateLogo } from '@/app/lib/animateLogo';
import Image from 'next/image';
import clsx from 'clsx';

export default function Logo() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoScope, logoScopeAnimate] = useAnimate();

  // Load snap.svg
  // I could probably use framer-motion to animate the logo but I'm not sure if it's worth it
  // as I already have written the animation in snap.svg
  useEffect(() => {
    function loadSnapSvg(): Promise<HTMLScriptElement> {
      return new Promise((resolve, reject) => {
        const scriptEl = document.createElement('script');
        scriptEl.src = '/js/snap.svg.js';
        scriptEl.className = 'snap-svg';
        scriptEl.async = true;
        scriptEl.onload = () => {
          try {
            setLogoLoaded(true);
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
        !logoLoaded && 'flex items-center justify-center'
      )}
      // ref={logoScope}
      // initial='initial'
      // animate={{ top: 0, translateY: 0, width: '50px', height: '50px' }}
      transition={{ duration: 0.75, delay: 1 }}
      animate={{
        translateY: ['-50%', '50%', '50%'],
        translateX: ['-50%', '-50%', '-50%'],
        top: ['50%', '0%', '0%'],
        left: ['50%', '50%', '50%'],
        width: ['300px', '50px', '50px'],
        height: ['300px', '50px', '50px'],
        rotate: [0, 0, -45]
      }}>
      <Link href='/'>
        {logoLoaded ? (
          <svg
            id='logo'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 301 301'></svg>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.5 }}
          >
            <Image
              src='/img/yinyang.jpeg'
              alt='Zola Logo'
              width={50}
              height={50}
            />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}
