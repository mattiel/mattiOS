import React from 'react';
import Navbar from '@components/Navbar';
import Link from 'next/link'

const Layout: React.FC = (props) => {
  const { children } = props;
  return (
    <main className="layout w-full h-full relative">
      <Navbar />
      {children}
      <footer className="mt-16 pb-12">
        <hr className="dark:border-gray-900 border-gray-50 pb-8" />
        <div className="grid grid-cols-2 gap-6 place-items-start">
          <div className="flex flex-col justify-between h-full">
            <p className="text-sm">Made with ❤️ with Typescript & React</p>
            <h6 className="text-sm">© {new Date().getFullYear()} Mattie Lee — LA/KR</h6>
          </div>
          <div className="flex text-sm md:text-base justify-evenly w-full">
            <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
              <li className="hover:text-white transition-color">
                <Link href="/">
                  <a>
                    Home
                  </a>
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
              <li className="hover:text-white transition-color">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/mattiel">
                  Github
                </a>
              </li>
              <li className="hover:text-white transition-color">
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jsmattly/">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Layout;