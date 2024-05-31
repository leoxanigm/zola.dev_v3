'use client';

import { AnimationContext, Delayed } from '@/contexts/animationContext';
import { motion } from 'framer-motion';
import { useContext } from 'react';

const tools = [
  'JavaScript',
  'Python',
  'TypeScript',
  'Node.js',
  'React',
  'Next.js',
  'Express',
  'Django',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Git',
  'AWS'
];

let sequenceAnimationVariants = {
  initial: {
    opacity: 0,
    y: 40
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.05
    }
  })
};

export default function Intro() {
  const animate = useContext(AnimationContext);

  return (
    <Delayed delay={animate ? 2.25 : 0}>
      <section className='mx-auto leading-8'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView='animate'
          viewport={{ once: true }}>
          <p>Hello, Bonjour, Guten Tag, Ciao</p>

          <h1 className='text-xl font-bold inline-block'>I am Zelalem (Zola)</h1>
          <span>, thank you for taking time to visit my website.</span>
          <p>I am a problem solver who is skilled in these tools:</p>
        </motion.div>

        <ul className='list-none flex flex-wrap gap-2 my-4 max-w-[700px] text-[14px]'>
          {tools.map((tool, i) => (
            <motion.li
              key={tool}
              className='text-gray-400 bg-gray-800/20 border-[1px] border-gray-800/50 py-[0.1rem] px-[0.5rem]'
              variants={sequenceAnimationVariants}
              initial='initial'
              whileInView='animate'
              custom={i}
              viewport={{ once: true }}>
              {tool}
            </motion.li>
          ))}
        </ul>

        <hr className='my-12 border-[--border]' />
      </section>
    </Delayed>
  );
}
