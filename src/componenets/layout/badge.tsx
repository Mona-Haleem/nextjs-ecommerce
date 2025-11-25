import React from "react";

interface BadgeProps {
  count?: number;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ count, children }) => {
  return (
       <div className="relative inline-block">
      {children}
      {!!count && count > 0 && (
        <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>

  );
};

export default Badge;
