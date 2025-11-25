import React from "react";
import NavBar from "./navBar";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-blue-600/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Logo />
        <NavBar />
      </div>
    </header>
  );
}
