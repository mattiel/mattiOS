import React from 'react';
import type { Project } from '.contentlayer/types'


const Toc = ({ project }: { project: Project }) => {
  const parse = () => {
    return project.body.raw.split('\n').filter((line) => line.startsWith('#'))
  }

  return (
    <nav className="hidden fixed lg:flex flex-col top-32 px-12 w-full overflow-hidden max-w-xs">
      <p className="text-white text-sm font-medium leading-loose">
        Table of Contents
      </p>
      <ul className="">
        {
          parse().map((line, i) => {
            const [, title] = line.split('# ')
            return (
              <li key={i} className="mb-2">
                <a href={`#${title.toLowerCase().replace(/ /g, '-')}`} className="text-white text-sm font-medium leading-loose">
                  {title}
                </a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
};

export default Toc;