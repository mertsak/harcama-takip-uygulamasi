import MonthlyChart from "@/components/report/MonthlyChart";
import YearlyReport from "@/components/report/YearlyChart";

const Report = () => {
  return (
    <div className="flex flex-col gap-4 py-6 px-4 w-full max-w-screen-lg mx-auto min-h-[calc(100vh-146px)] overflow-y-auto dark:bg-gray-900">
      <MonthlyChart />
      <YearlyReport />
    </div>
  );
};

export default Report;
