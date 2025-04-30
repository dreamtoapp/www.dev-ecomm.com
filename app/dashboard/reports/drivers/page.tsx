import { getDriversReport } from './actions/getDriversReport';
import { DriversReportTable } from './components/DriversReportTable';

export default async function DriversReportPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const drivers = await getDriversReport();
  const sp = await searchParams;
  const page = sp?.page ? Number(sp.page) : 1;

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 rtl text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary">تقرير السائقين والتوصيل</h1>
      <DriversReportTable drivers={drivers} page={page} />
    </div>
  );
}
