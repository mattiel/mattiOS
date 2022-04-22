import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx";

enum ScrollDirection {
  Right = 1,
  Left = -1
}

const Scroller: React.FC = ({ children }) => {
  // Note: non-null assertion operator: ref never will be null once component mounts.
  const ref = useRef<HTMLDivElement>(null!)
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [widths, setWidths] = React.useState<number[]>([]);

  function handleScroll(direction: ScrollDirection) {
    if(widths[currentIndex + direction] !== null) {
      ref.current.scrollBy({
        left: direction,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(currentIndex + direction)
  }

  function handleEntries(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      entry.isIntersecting && setCurrentIndex(Array.from(ref.current.children || []).indexOf(entry.target))
    })

  }

  function addElementWidths(elements: HTMLCollection) {
    const elementWidths: Array<number> = []
    Array.from(elements).forEach(element => {
      elementWidths.push(element.clientWidth)
    })
    setWidths(elementWidths)
  }

  useEffect(() => {
    const refChildren = ref?.current?.children
    const observer = new IntersectionObserver(handleEntries,{ root: ref.current, threshold: .995 })
    addElementWidths(refChildren)
    Array.from(refChildren).forEach(element => observer.observe(element))

    return () => observer.disconnect()

  }, [ref?.current?.clientWidth, ref])

  return (
    <section className="relative">
      <div className="flex items-top relative whitespace-nowrap relative overflow-x-auto py-4 snap-mandatory snap-x scrollbar-none space-x-3" ref={ref}>
        {
          React.Children?.map(children, (child, idx) => {
            if(React.isValidElement(child)) {
              return (
                <div className={`${idx} scroller-item inline-block flex-shrink-0 whitespace-normal snap-mandatory snap-x snap-start max-w-[calc(100%-2rem)] not-prose`}>
                  {React.cloneElement(child)}
                </div>
              )
            }
          })
        }
      </div>
      {/*{ref?.current?.scrollLeft > 0 && <div className="absolute top-0 left-0 h-full w-[2%] bg-gradient-to-r from-white dark:from-black" />}*/}
      {/*{currentIndex !== widths.length - 1 && <div className="absolute top-0 right-0 h-full w-[2%] bg-gradient-to-l from-white dark:from-black" />}*/}
      <AnimatePresence>
        <div className="hidden lg:flex items-center absolute top-0 w-full flex items-center top-1/2 transform -translate-y-1/2">
          { currentIndex > 0 && (
            <motion.button
              key="left"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0}}
              onClick={() => handleScroll(ScrollDirection.Left)}
              className={clsx(
                "absolute w-10 h-10 rounded-full -left-5 bg-gray-600 bg-opacity:80 dark:bg-gray-900 dark:bg-opacity-80 grid place-items-center",
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
          { currentIndex < widths.length - 1 && (
            <motion.button
              key="right"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0}}
              onClick={() => handleScroll(ScrollDirection.Right)}
              className={clsx(
                "absolute w-10 h-10 rounded-full -right-5 bg-gray-600 bg-opacity:80 dark:bg-gray-900 dark:bg-opacity-80 grid place-items-center",
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default Scroller;