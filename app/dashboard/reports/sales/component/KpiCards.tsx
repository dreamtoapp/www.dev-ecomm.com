import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Kpi {
  label: string;
  value: string;
  icon: string;
}

export default function KpiCards({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="text-center shadow-md border-blue-100">
          <CardHeader>
            <span className="text-3xl">{kpi.icon}</span>
            <CardTitle className="text-lg mt-2">{kpi.value}</CardTitle>
            <CardDescription className="text-blue-700 font-semibold">{kpi.label}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
