import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ logo, logoAlt }: { logo: string; logoAlt: string }) {
  return (
    <Link href="/" aria-label="الصفحة الرئيسية">
      <motion.div
        whileHover={{ scale: 1.05 }} // Add hover animation
        whileTap={{ scale: 0.95 }} // Add tap animation
        className="relative flex justify-center items-center rounded-full overflow-hidden h-[30px] w-[120px] md:h-[40px] md:w-[160px]" // Adjusted size for desktop and mobile with rounded corners
      >
        <Image
          src={logo || "/assets/logo.png"}
          alt={logoAlt} // Improved alt text for better SEO
          fill // Use fill to ensure the image scales to fit the parent
          priority
          className="object-contain rounded-full" // Ensure the image is rounded
          sizes="(max-width: 768px) 120px, 160px" // Responsive sizes for mobile and desktop
        />
      </motion.div>
    </Link>
  );
}
