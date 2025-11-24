import Link from 'next/link';

const emojiMap: Record<string, string> = {
    "men's clothing": '🧥',
    "women's clothing": '👗',
    "jewelery": '💍',
    "electronics": '📱',
  };

  
interface CategoryCardProps {
    category: string;
};
  
  const CategoryCard = ({ category }: CategoryCardProps) => {
    return (
        <Link
            key={category}
            href={`/category/${category}`}
            className="group border rounded-lg p-4 flex flex-col items-center justify-center bg-white shadow hover:shadow-md transition"
        >
        <div className="text-6xl mb-2">{emojiMap[category] || '🛒'}</div>
        <h2 className="text-lg capitalize font-semibold text-center group-hover:text-blue-600 transition">
          {category}
        </h2>
      </Link>
    );
  };
  
  export default CategoryCard;
  