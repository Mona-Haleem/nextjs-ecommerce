import React from "react";

interface BadgeProps {
  count?: number; 
  children: React.ReactNode; 
}

const Badge: React.FC<BadgeProps> = ({ count, children }) => {
  return (
    <div className="relative inline-block">
      {children}
      {count && count > 0 && (
        <span className="absolute -top-3 -right-3 bg-red-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
};

export default Badge;
