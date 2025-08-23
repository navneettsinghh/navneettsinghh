import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">Screenshot-to-Code</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/#features">Features</Link>
            </li>
            <li>
              <Link href="/#pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
