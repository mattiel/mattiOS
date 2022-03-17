import React, { useCallback } from 'react';
import clsx from "clsx";

const Toc = () => {
  const [headings, setHeadings] = React.useState(Array<Element>());
  const [activeSlug, setActiveSlug] = React.useState<Element>(null!)

  const List = ({ href, title, indent }: {href: string, title: string, indent: boolean}) => {
    return(
      <li className={clsx(
        "border-l-2 border-l-gray-200 dark:border-l-gray-700 bg-opacity-20 dark:bg-opacity-20 px-4 dark:hover:bg-opacity-20",
        indent && 'pl-8',
        `#${activeSlug.id}` === href
          ? "font-bold bg-pink-300 border-l-pink-500 dark:text-white dark:bg-pink-900 dark:border-l-pink-600"
          : "hover:border-pink-500 hover:bg-pink-100 hover:text-pink-600 dark:hover:border-pink-600 dark:hover:bg-pink-900 dark:text-gray-400 dark:hover:text-pink-500")}
      >
        <a
          href={href}
          className={clsx(
            "leading-relaxed",

          )}
        >
          {title}
        </a>
      </li>

    )
  }

  const handleEntries = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        setActiveSlug(entry.target)
      }
    })
  }, [activeSlug])

  React.useEffect(() => {
    const target = document.body.querySelector('article.prose')
    if (target?.querySelector('h2[id], h3[id]')) {
      setHeadings(Array.from(target.querySelectorAll('h2[id], h3[id]')).map(el => { return el }))
      const observer = new IntersectionObserver(handleEntries, {
        rootMargin: '54px 0px 0px 0px',
        threshold: 1
      })
      setActiveSlug(target.querySelector('h2[id]')!)
      Array.from(target.querySelectorAll('h2[id], h3[id]')).forEach(element => observer.observe(element))
      return () => observer.disconnect()
    }
  },[])

  return (
    <aside className="hidden 2xl:block relative px-12 h-full w-full overflow-hidden max-w-xs">
      <nav className="top-36 fixed max-w-full w-64 pr-2">
        <p className="text-white text-sm font-medium mb-4">
          On this page
        </p>
        <ul className="text-sm leading-[2.25] whitespace-nowrap text-ellipsis overflow-hidden">
          {
            headings.map((heading, i) => {
              return (
                <List
                  key={heading.id}
                  href={`#${headings[i].id}`}
                  title={heading.textContent!}
                  indent={heading.tagName === 'H3'}
                />
              )
            })
          }
        </ul>
      </nav>
    </aside>
  );
};

export default Toc;