import { getDriversReport } from './actions/getDriversReport';
import { DriversReportTable } from './components/DriversReportTable';

export default async function DriversReportPage() {
  const drivers = await getDriversReport();

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 rtl text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary">تقرير السائقين والتوصيل</h1>
      <DriversReportTable drivers={drivers} />
    </div>
  );
}
