import ReviewsReportTable from "./components/ReviewsReportTable";

export default function ReviewsReportPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-8 text-center">تقرير التقييمات والمراجعات</h1>
      <ReviewsReportTable />
    </div>
  );
}
