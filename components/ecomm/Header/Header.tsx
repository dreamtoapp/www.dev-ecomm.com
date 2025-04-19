import HeaderClient from './HeaderClient';
// Header.tsx (Server Component)
import Logo from './Logo';
import NavLinks from './NavLinks';

interface HeaderProps {
  logo: string;
  logoAlt: string;
  session: any;
}

export default function Header({ session, logo, logoAlt }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-md dark:shadow-lg dark:shadow-gray-800/50 border-b border-border h-20">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center"
        aria-label="Main navigation"
      >
        <div className="flex-shrink-0">
          <Logo logo={logo} logoAlt={logoAlt} />
        </div>

        <div className="hidden md:flex flex-1 justify-center ml-6">
          <NavLinks />
        </div>

        {/* Client-side components wrapper */}
        <HeaderClient session={session} />
      </nav>
    </header>
  );
}