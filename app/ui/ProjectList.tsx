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
  }, []);
  
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
      {projectList.map((project, i) => (
        <Project key={project.id} metadata={project} index={i} />
      ))}
    </div>
  );

  return (
    <Delayed delay={animate ? 2.25 : 0}>
      <section>
        <h2 className='text-2xl font-bold mb-4'>Projects</h2>

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

function Project({
  metadata,
  index
}: {
  metadata: ProjectMetadata;
  index: number;
}) {
  return (
    <motion.div
      className='max-w-[398px] border border-[--border] bg-[--bg] group'
      data-group={metadata.id}
      initial={{ opacity: 0, x: Math.pow(-1, index) * 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      whileInView='animate'
      viewport={{ once: true }}>
      <a
        href={metadata.projectURL}
        target='_blank'
        className='block h-[145px] overflow-hidden group-hover:h-[290px] transition-all'>
        <Image
          src={metadata.heroImage}
          alt={metadata.title}
          width={396}
          height={290}
          className='opacity-90 group-hover:opacity-100 transition-opacity'
        />
        {/* <HoverVideo youtubeVideoId={metadata.youtubeVideoId} /> */}
      </a>
      <div className='p-5'>
        <a
          href={metadata.projectURL}
          target='_blank'
          className='hover:underline underline-offset-4'>
          <h3 className='mb-2 text-xl font-bold text-gray-200'>
            {metadata.title}
          </h3>
        </a>
        <p className='text-sm text-gray-400'>{metadata.date}</p>
        <p className='mb-3 font-normal'>{metadata.description}</p>
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
