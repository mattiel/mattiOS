import React from 'react';
import Link from 'next/link'

const links = [
  { href: '/resume.pdf', label: 'Resume' },
  { href: 'mailto:hello@mattiel.dev', label: 'Contact' },
]

const Navbar = () => {
  return (
    <header className="layout fixed top-0 left-0 w-full bg-gradient-to-b dark:from-black from-white backdrop-blur-md dark:bg-opacity-0 z-40">
      <div className="flex items-center justify-between w-full py-4">
        <Link href="/">
          <a><h1 className="tracking-wide font-semibold">mattie</h1></a>
        </Link>
        <ul className="flex gap-12 dark:text-gray-400 text-gray-500">
          {links.map(({ href, label }) => (
            <li className="dark:hover:text-white px-2 transition-all" key={`${href}${label}`}>
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;