'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import Nav from '@/app/ui/Nav';

const NavDynamic = dynamic(() => import('@/app/ui/Nav'), { ssr: false });

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='pt-[100px]'>
      <nav className='fixed w-full top-0 left-0'>
        <NavDynamic />
      </nav>
    </header>
  );
}
