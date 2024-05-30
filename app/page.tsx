import Projects from './projects/page';
import Intro from './ui/Intro';

export default function Home() {
  return (
    <main className=''>
      <Intro/>
      <hr className='my-8 border-[--border]'/>
      <Projects/>
    </main>
  );
}
