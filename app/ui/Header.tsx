'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const NavDynamic = dynamic(() => import('@/app/ui/Nav'), { ssr: false });

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='pt-[100px]'>
      <nav className='fixed w-full z-[9000] top-0 left-0'>
        <NavDynamic />
      </nav>
    </header>
  );
}
