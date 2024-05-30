import Projects from './projects/page';
import Intro from './ui/Intro';

export default function Home() {
  return (
    <main className=''>
      <Intro />
      {/* <Projects showSelected={true}/> */}
      <Projects showSelected={false} />
    </main>
  );
}
