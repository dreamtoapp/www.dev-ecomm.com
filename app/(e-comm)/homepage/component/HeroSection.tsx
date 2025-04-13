// app/components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="h-[400px] bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Summer Sale: 20% Off</h1>
        <p className="mt-2 text-lg">Discover amazing deals today!</p>
        <button className="mt-4 bg-red-500 text-white px-6 py-3 rounded">
          Shop Now
        </button>
      </div>
    </section>
  );
}
