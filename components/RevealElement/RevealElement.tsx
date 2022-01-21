import React from 'react';
import { motion, Variants } from 'framer-motion'

type RevealElementProps = {
  children: React.ReactNode
  className?: string
  // loaded?: boolean
}

const RevealElement: React.FC<RevealElementProps> = ({ children, className }) => {
  // const [isLoaded, setIsLoaded] = React.useState(loaded || true)

  const variants: Variants = {
    offscreen: {
      clipPath: 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)',
      opacity: 0,
    },
    onscreen: {
      clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
      opacity: 1,
      transition: {
        easeIn: [0.4, 0.8, 0.9, 1],
        duration: .5,
      }
    }
  }

  return (
    // Chrome work around -- extra motion.div element with variant is needed.
    <motion.div
      className={className}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div variants={variants}>
        {children}
      </motion.div>
    </motion.div>
  );
};

// Chrome has a bug where clip-path animation doesn't work when scrolled into view.
// function useIntersection(ref: React.Ref<HTMLElement>) {
//   const [isIntersecting, setIntersecting] = React.useState(false)
//
//   React.useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIntersecting(entry.isIntersecting)
//       },
//       {
//         rootMargin: '0px',
//         threshold: 0.1
//       }
//     )
//
//     if (ref.current) {
//       observer.observe(ref.current)
//     }
//
//     return () => {
//       observer.disconnect()
//     }
//   }, [ref])
//
//   return isIntersecting
// }
//
// const ref = React.useRef<HTMLDivElement>(null);
// const isIntersecting = useIntersection(ref);
//
// return (
//   <div
//     className={className}
//     ref={ref}
//     style={{
//       // clipPath: isIntersecting ? 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)' : 'polygon(0% 100%,100% 100%,100% 100%,0% 100%)',
//       // opacity: isIntersecting ? 1 : 0,
//       transition: 'all 0.5s ease-in-out',
//     }}
//   >
//     {children}
//   </div>
// )
export default RevealElement;