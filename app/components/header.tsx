import Link from "next/link";
import React from "react";

interface HeaderProps {
  heading: string;
}

function Header({ heading }: HeaderProps) {
  return (
    <div className="flex gap-4 items-center ">
      <Link href="/" className="text-red-400 text-lg p-1 rounded-xl">
        back
      </Link>
      <h1 className="font-bold text-5xl">{heading}</h1>
    </div>
  );
}

export default Header;
