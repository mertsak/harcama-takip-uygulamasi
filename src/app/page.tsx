import { CategoryForm } from "@/components/category/CategoryForm";
import { CategoryList } from "@/components/category/CategoryList";

export default function Home() {
  return (
    <div className="flex lg:flex-row flex-col gap-4 justify-center items-start p-6 w-full max-w-screen-lg mx-auto">
      <div className="lg:w-1/3 w-full mx-auto">
        <CategoryForm />
      </div>
      <div className="lg:w-2/3 w-full mx-auto">
        <CategoryList />
      </div>
    </div>
  );
}
