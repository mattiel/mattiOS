import React from 'react';
import type { Project } from '.contentlayer/types'
import clsx from "clsx";

const Toc = ({ project }: { project: Project }) => {
  const parse = () => {
    return project.body.raw.split('\n').filter((line) => line.startsWith('#'))
  }

  return (
    <aside className="hidden 2xl:block relative px-12 h-full w-full overflow-hidden max-w-xs">
      <nav className="top-36 fixed">
        <p className="text-white text-sm font-medium mb-4">
          On this page
        </p>
        <ul className="">
          {
            parse().map((line, i) => {
              const isSubHeader = line.startsWith('###')
              const [, title] = line.split('# ')
              return (
                <li key={i} className={clsx("text-sm", isSubHeader && 'ml-3')}>
                  <a
                    href={`#${title?.toLowerCase().replace(/ /g, '-')}`}
                    className="dark:text-gray-400 dark:hover:text-white leading-relaxed"
                  >
                    {title}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </aside>
  );
};

export default Toc;