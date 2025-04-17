export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 -z-50 h-screen w-screen overflow-hidden">
      {/* Adaptive gradient with smoother transitions */}
      <div className="absolute inset-0 h-full w-full 
        bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200
        dark:from-stone-900 dark:via-stone-800 dark:to-stone-950
        transition-colors duration-300" />

      {/* Dynamic grid texture with theme-aware opacity */}
      <div className="absolute inset-0 h-full w-full 
        bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M5%200h1L0%205V4h1z%22%2F%3E%3Cpath%20d%3D%22M6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]
        dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M5%200h1L0%205V4h1z%22%2F%3E%3Cpath%20d%3D%22M6%205v1H5z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-white/30 via-transparent to-transparent
        dark:from-black/30 mix-blend-overlay" />

      {/* Optimized blur overlay */}
      <div className="absolute inset-0 
        bg-white/5 backdrop-blur-[64px]
        dark:bg-black/10 dark:backdrop-blur-[48px]
        transition-all duration-300" />

      {/* Adaptive noise texture */}
      <div className="absolute inset-0 
        bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201000%201000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.15%22%2F%3E%3C%2Fsvg%3E')]
        dark:opacity-30" />
    </div>
  );
}