import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" aria-label="الصفحة الرئيسية">
      <motion.div
        whileHover={{ scale: 1.05 }} // Add hover animation
        whileTap={{ scale: 0.95 }} // Add tap animation
        className="  relative   bg-blue-600  flex justify-center items-center rounded-lg overflow-hidden h-[50px]   aspect-video"
      >
        <Image
          src="/assets/logo.png"
          alt="امواج للمياة الصحية"
          fill
          priority
          className="w-full h-full object-contain"
        />
      </motion.div>
    </Link>
  );
}
