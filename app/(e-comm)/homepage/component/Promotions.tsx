// app/components/Promotions.tsx
interface Promotion {
  title: string;
  discount: number;
  startDate: Date;
  endDate: Date;
}

export default function Promotions({
  promotions,
}: {
  promotions: Promotion[];
}) {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold">Active Promotions</h2>
      <div className="flex overflow-x-auto gap-4 mt-4">
        {promotions.map((promotion, index) => (
          <div key={index} className="min-w-[200px] p-4 border rounded-lg">
            <h3>{promotion.title}</h3>
            <p>{promotion.discount}% Off</p>
            <p>
              Valid until: {new Date(promotion.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
