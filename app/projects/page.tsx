import { getProjectList } from '../lib/getProjectList';

import ProjectList from '@/app/ui/ProjectList';

const selectedProjects = ['tzmeet', 'evolved-robotic-hand', 'espace'];

export default async function Projects() {
  let projectNames: string[];

  // if (showSelected) {
  //   projectNames = selectedProjects;
  // } else {
  //   projectNames = await getProjectList();
  // }
  
  projectNames = await getProjectList();

  const projectsMetadata = await Promise.all(
    projectNames.map(async projectName => {
      const { metadata } = await import(
        `@/app/projects/${projectName}/page.mdx`
      );

      return metadata;
    })
  );

  return <ProjectList projects={projectsMetadata} />;
}
