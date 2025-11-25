import Link from "next/link";
import { CategoryIcon } from "./categoryIcon";

interface CategoryCardProps {
  category: string;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      key={category}
      href={`/category/${category}`}
      className="group border rounded-lg p-4 flex flex-col items-center justify-center bg-white shadow hover:shadow-md transition"
    >
      <div className="text-6xl mb-2">
            <CategoryIcon category={category} size={28} color="#111827" />

      </div>
      <h2 className="text-lg capitalize font-semibold text-center group-hover:text-blue-600 transition">
        {category}
      </h2>
    </Link>
  );
};

export default CategoryCard;
