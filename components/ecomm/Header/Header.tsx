"use client";
import {
  useEffect,
  useState,
} from 'react';

import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import {
  bingAdmin,
} from '../../../app/dashboard/(dashboard)/component/pusherNotifaction/action/binAdmin';
import CartIcon from './CartIcon';
import Logo from './Logo';
import NavLinks from './NavLinks';

interface headerProp {
  logo: string;
  logoAlt: string;
  session: any
}

// Skeleton components
const UserMenuSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="h-9 w-9 rounded-full" />
    <Skeleton className="h-4 w-20" />
  </div>
);

const MobileMenuSkeleton = () => (
  <Skeleton className="h-9 w-9 rounded-lg md:hidden" />
);

// Dynamically import components with skeletons
const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
  loading: () => <MobileMenuSkeleton />,
});




const UserMenu = dynamic(() => import("./UserMenu"), {
  ssr: false,
  loading: () => <UserMenuSkeleton />,
});



export default function Header({ session, logo, logoAlt }: headerProp) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md shadow-md dark:shadow-lg dark:shadow-gray-800/50 border-b border-border h-[80px]"> {/* Adjusted header height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        {/* Logo */}
        <Testbtn />
        <Logo logo={logo} logoAlt={logoAlt} />

        {/* Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>

        {/* Right Actions (Cart, User Avatar, Mobile Menu) */}
        <div className="flex items-center gap-4 md:gap-6">
          <CartIcon />
          {isMounted ? <UserMenu session={session} /> : <UserMenuSkeleton />}
          {isMounted ? <MobileMenu /> : <MobileMenuSkeleton />}
        </div>
      </div>
    </header>
  );
}


const Testbtn = () => {

  const handleBing = async () => {
    await bingAdmin()

  }
  return (<Button onClick={handleBing}

  >Bing Admin</Button>)

}