import Logo from './Logo';

export default function Header() {
  return (
    <header>
      <nav className='relative flex'>
        {/* Left animated side with slanting edge */}
        <div className='w-full h-[50px] bg-yellow-500'></div>

        {/* Logo placeholder */}
        <div className='w-60 bg-red-500'></div>

        <Logo />

        <div className='w-full h-[50px] bg-blue-500'></div>
      </nav>
    </header>
  )
}
