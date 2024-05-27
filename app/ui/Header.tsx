'use client';

import { motion } from 'framer-motion';

import Logo from './Logo';

export default function Header() {
  return (
    <header>
      <nav className='relative flex'>
        {/* Left animated side with slanting edge */}
        <div className='w-full h-[50px] flex '>
          <motion.div
            className='h-full w-[100%]'
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ delay: 1.75 }}></motion.div>
          <motion.div
            className='nav-bg-left'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.75 }}>
              {/* <div></div> */}
            </motion.div>
        </div>

        {/* Logo placeholder */}
        <div className='w-[25px] bg-transparent'></div>

        <Logo />

        {/* Right animated side with slanting edge */}
        <div className='w-full h-[50px] flex '>
          <motion.div
            className='nav-bg-right'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.75 }}>
              {/* <div></div> */}
            </motion.div>
        </div>
      </nav>
    </header>
  );
}


// /* HTML: <div class="triangle"></div> */
// .triangle {
//   width: 150px;
//   aspect-ratio: 1;
//   clip-path: polygon(0 0,100% 0,0 100%);
// }