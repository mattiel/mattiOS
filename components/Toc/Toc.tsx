import React, {ReactElement, Ref, RefObject} from 'react';
import type { Project } from '.contentlayer/types'
import clsx from "clsx";

const Toc = ({ project }: { project: Project }) => {
  const [slugs, setSlugs] = React.useState(Array<string>());
  const [activeSlug, setActiveSlug] = React.useState('')

  function parse() {
    return project.body.raw.split('\n').filter((line) => line.startsWith('#'))
  }

  const Heading = ({ href, title }: {href: string, title: string}) => {
    return(
      <a
        href={href}
        className={clsx(
          "leading-relaxed",
          activeSlug === href ? "dark:text-white dark:hover:text-gray-300" : "dark:text-gray-400 dark:hover:text-white"
        )}
      >
        {title}
      </a>
    )

  }

  function handleEntries(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      entry.isIntersecting && setActiveSlug(entry.target.getAttribute('id') as string)
      console.log(entry.target, entry.isIntersecting, activeSlug)
    })
  }

  React.useEffect(() => {
    const target = document.body.querySelector('article.prose')
    if (target) {
      setSlugs(Array.from(target.querySelectorAll('h2[id], h3[id]')).map(el => { return el.id }))
      const observer = new IntersectionObserver(handleEntries, {
        root: document.body,
        threshold: 1
      })
      Array.from(target.querySelectorAll('h2[id], h3[id]')).forEach(element => observer.observe(element))
      return () => observer.disconnect()
    }

  },[])

  return (
    <aside className="hidden 2xl:block relative px-12 h-full w-full overflow-hidden max-w-xs">
      <nav className="top-36 fixed">
        <p className="text-white text-sm font-medium mb-4">
          On this page
        </p>
        <ul className="">
          {
            // Slugs are currently generated from the title, doesn't consider duplicate title edge cases yet.
            parse().map((line, i) => {
              const isSubHeader = line.startsWith('###')
              const [, title] = line.split('# ')
              return (
                <li key={i} className={clsx("text-sm", isSubHeader && 'ml-3')}>
                  <Heading
                    href={`#${title?.toLowerCase().replace(/ /g, '-')}`}
                    title={title}
                  />
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