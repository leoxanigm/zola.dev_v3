export default function Projects() {
  return (
    <section>
      <h2 className='text-2xl font-bold mb-4'>Projects</h2>

      <ProjectList />
    </section>
  );
}

function ProjectList() {
  return (
    <div>
      <Project />
      <Project />
      <Project />
    </div>
  );
}

function Project() {
  return <div>Project</div>;
}
