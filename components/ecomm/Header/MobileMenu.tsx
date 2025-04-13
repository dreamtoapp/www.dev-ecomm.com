import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import NavLinks from './NavLinks'

export default function MobileMenu() {
  return (
    <Sheet>
      {/* Menu Trigger Button */}
      <SheetTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open side menu"
          className="p-2 rounded-lg md:hidden hover:bg-gray-100 transition-all"
        >
          <Menu size={24} className="text-blue-600" />
        </motion.button>
      </SheetTrigger>

      {/* Menu Content */}
      <SheetContent
        side="right"
        className="w-72 bg-white/95 backdrop-blur-md p-6 border-l border-gray-200 flex flex-col items-center"
      >
        {/* Close Button */}
        {/* <SheetClose className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <X size={24} className="text-gray-800" />
          </motion.div>
          <span className="sr-only">Close menu</span>
        </SheetClose> */}

        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <SheetTitle className="text-3xl font-extrabold text-blue-600">
            مرحبا بك
          </SheetTitle>
        </motion.div>

        {/* Logo */}
        <div className="w-full mb-8">
          <Link href="/" aria-label="Home page">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full h-24 flex justify-center items-center shadow-sm rounded-lg overflow-hidden"
            >
              <Image
                src="/assets/logo.png"
                alt="Company Logo"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 w-full">
          <NavLinks />
        </div>
      </SheetContent>
    </Sheet>
  );
}