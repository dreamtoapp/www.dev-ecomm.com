import Image from 'next/image';

import Link from '@/components/link';

export default function Logo({ logo, logoAlt }: { logo: string; logoAlt: string }) {
  return (
    <Link href="/" aria-label="الصفحة الرئيسية">
      <div
        className="relative flex justify-center items-center rounded-full overflow-hidden h-[30px] w-[120px] md:h-[40px] md:w-[160px] transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95" // Added Tailwind classes for hover and active animations
      >
        <Image
          src={logo || "/assets/logo.png"}
          alt={logoAlt}
          fill
          priority
          className="object-contain rounded-full"
          sizes="(max-width: 768px) 120px, 160px"
        />
      </div>
    </Link>
  );
}
