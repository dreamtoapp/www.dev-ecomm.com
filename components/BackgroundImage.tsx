// components/Background.tsx
export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 h-screen w-screen bg-[linear-gradient(135deg,#a8edea,#fed6e3,#a8edea80)] dark:bg-[linear-gradient(135deg,#1a1a1a,#2d2d2d,#3a3a3a80)]">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-[2px]"></div>
      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%224%22%20height%3D%224%22%3E%3Cpath%20fill%3D%22%23999%22%20fill-opacity%3D%220.05%22%20d%3D%22M1%203h1v1H1z%20M2%202h1v1H2z%20M3%201h1v1H3z%20M2%200h1v1H2z%22%2F%3E%3C%2Fsvg%3E')]"></div>
    </div>
  );
}

// // components/BackgroundImage.tsx
// import Image from 'next/image'

// import background from '@/public/assets/background.webp'

// export default function BackgroundImage() {
//   return (
//     <div className="fixed inset-0 -z-50 h-screen w-screen transform-gpu">
//       <Image
//         src={background}
//         alt="Background"
//         quality={85}
//         priority
//         // fetchPriority="high"
//         fill
//         sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 33vw"
//         className="object-cover select-none"
//         placeholder="blur"
//         blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
//         decoding="async"

//         style={{
//           imageRendering: '-webkit-optimize-contrast',
//           transform: 'translateZ(0)',
//           backfaceVisibility: 'hidden',
//         }}
//       />
//     </div>
//   );
// }