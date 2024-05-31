'use client';

import { AnimationContext, Delayed } from '@/contexts/animationContext';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import HoverVideo from './HoverVideo';

export type ProjectMetadata = {
  id: string;
  title: string;
  description: string;
  projectURL: string;
  heroImage: string;
  techStack: string[];
  youtubeVideoId: string;
  date: string;
};

export default function ProjectList({
  projects
}: {
  projects: ProjectMetadata[];
}) {
  const [windowSize, setWindowSize] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 861
  );

  const animate = useContext(AnimationContext);

  useEffect(() => {
    window.addEventListener('resize', e => setWindowSize(window.innerWidth));
    return () => window.removeEventListener('resize', e => setWindowSize(window.innerWidth));
  }, []);

  // Re-render when window size changes
  useEffect(() => {}, [windowSize]);

  const sortedProjects = projects.sort((p1, p2) =>
    new Date(p1.date) > new Date(p2.date) ? -1 : 1
  );

  const leftSide = sortedProjects.filter((_, i) =>
    windowSize > 860 ? i % 2 === 0 : true
  );
  const rightSide = sortedProjects.filter((_, i) =>
    windowSize > 860 ? i % 2 === 1 : false
  );

  const projectDisplay = (projectList: ProjectMetadata[]) => (
    <div className='flex flex-col gap-4'>
      {projectList.map(project => (
        <Project key={project.id} metadata={project} />
      ))}
    </div>
  );

  return (
    <Delayed delay={animate ? 2.25 : 0}>
      <section>
        <h2 className='text-2xl font-bold mb-8'>Projects</h2>

        <div className='flex flex-wrap gap-4 justify-center'>
          {/* Two columns on screens greater than 860px, one for mobile.
            Using this to show grid of project with varying heights.
          */}

          {projectDisplay(leftSide)}

          {rightSide.length > 0 && projectDisplay(rightSide)}
        </div>
      </section>
    </Delayed>
  );
}

function Project({ metadata }: { metadata: ProjectMetadata }) {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      x: -50
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2
      }
    }
  };

  const hoverClasses =
    'before:absolute before:inset-0 before:-translate-x-full hover:before:animate-[shimmer_0.5s] before:border-t before:border-gray-500/10 before:bg-gradient-to-r before:from-transparent before:via-gray-500/10 before:to-transparent';

  return (
    <motion.div
      className={
        'relative overflow-hidden max-w-[398px] border border-[--border] bg-[--bg] group ' +
        hoverClasses
      }
      variants={fadeInAnimationVariants}
      initial='initial'
      whileInView='animate'
      viewport={{
        once: true
      }}>
      <div className='block h-[145px] overflow-hidden group-hover:h-[290px] transition-all'>
        <Image
          src={metadata.heroImage}
          alt={metadata.title}
          width={396}
          height={290}
          className='opacity-90 group-hover:opacity-100 transition-opacity'
        />
        {/* <HoverVideo youtubeVideoId={metadata.youtubeVideoId} /> */}
      </div>
      <div className='p-5'>
        <a
          href={metadata.projectURL}
          target='_blank'
          className='hover:underline underline-offset-4'>
          <h3 className='mb-2 text-xl font-bold text-gray-200'>
            {metadata.title}
          </h3>
        </a>
        <p className='mb-3 font-normal leading-7'>{metadata.description}</p>
        <ul className='flex flex-wrap gap-1'>
          {metadata.techStack.map(tech => (
            <li
              key={tech}
              className='text-sm text-gray-400 bg-[#10151d] border-[1px] border-gray-800/50 py-1 px-2'>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
