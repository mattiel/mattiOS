import useSWR from 'swr'
import {useRef, useEffect, useState, MutableRefObject} from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

export type NowPlayingTypes = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

const SpotifyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      version="1.1"
      viewBox="0 0 400 400"
      className="mr-1"
    >
      <g fillRule="evenodd" stroke="none">
        <path fill="#1dda63"
          d="M187.4 42.839c-7.442.779-10.741 1.253-19.2 2.764-3.052.545-12.279 2.976-16.6 4.375-2.828.914-7.491 2.602-9.4 3.402-.66.277-2.46 1.018-4 1.649-30.428 12.452-58.256 37.355-75.512 67.571-1.938 3.394-6.919 13.582-8.116 16.6-.392.99-1.025 2.52-1.405 3.4-2.399 5.549-6.653 20.393-7.966 27.8a432.26 432.26 0 01-.806 4.4c-.391 2.041-1.004 7.34-1.594 13.769-.514 5.605-.516 18.337-.003 23.347.819 8.002 1.286 11.605 2.058 15.884.735 4.07 2.736 12.793 3.578 15.6 1.155 3.851 4.486 13.662 4.753 14 .173.22.449.85.612 1.4.283.955.574 1.648 2.6 6.2 18.112 40.679 58.74 76.064 99.001 86.226.66.166 3.36.871 6 1.565 23.672 6.226 54.191 6.295 76.9.175 1.155-.311 3.135-.842 4.4-1.179 34.324-9.145 67.777-33.325 87.972-63.587 5.199-7.791 14.128-24.161 14.128-25.902 0-.296.153-.709.34-.918.762-.85 5.279-13.545 6.647-18.68.337-1.265.871-3.251 1.186-4.414 6.09-22.488 6.035-52.818-.138-76.686-.655-2.53-1.305-5.05-1.446-5.6-8.146-31.873-33.345-66.603-62.589-86.261-3.413-2.295-9.575-6.139-9.84-6.139-.097 0-.865-.435-1.707-.967-1.66-1.047-9.142-4.858-12.053-6.138-.99-.436-2.97-1.288-4.4-1.895-1.43-.606-3.189-1.36-3.908-1.674-1.403-.613-10.306-3.612-12.292-4.14-20.966-5.58-40.896-7.652-57.2-5.947m10.8 83.584c8.261.594 20.873 1.922 26 2.738 1.32.21 3.715.575 5.322.812 25.531 3.76 53.886 13.061 75.078 24.627 9.791 5.344 13.077 12.165 9.821 20.39-2.94 7.428-12.995 11.358-19.821 7.746-5.806-3.072-17.031-8.682-18.6-9.296-.99-.388-2.34-.94-3-1.225-6.196-2.684-19.574-6.98-28-8.993-1.1-.262-2.99-.723-4.2-1.022-2.489-.617-10.656-2.166-17.8-3.376-34.748-5.888-78.739-4.253-109 4.049-5.042 1.383-6.218 1.571-9 1.435-14.231-.694-19.006-19.075-7-26.946 5.894-3.865 34.163-9.232 57.4-10.899 7.107-.51 35.888-.536 42.8-.04m-11.8 53.965c21.219 1.106 41.747 4.911 61.245 11.352 22.101 7.301 41.834 17.569 44.474 23.142 5.662 11.956-7.722 22.648-18.919 15.113-3.421-2.302-14.74-7.911-21-10.405-24.842-9.9-51.213-14.803-79.532-14.785-18.543.012-34.743 2.199-53.468 7.218-5.053 1.355-6.776 1.356-9.83.005-10.56-4.671-9.849-19.247 1.122-22.971 19.311-6.555 49.752-10.031 75.908-8.669m4.884 51.614c2.264.221 6.006.591 8.316.822 17.785 1.775 38.07 7.491 54.6 15.384 5.601 2.675 14.895 7.862 16.104 8.988 7.366 6.862 1.457 18.899-8.372 17.055-.738-.138-3.499-1.472-6.137-2.963-20.419-11.546-39.862-17.36-65.195-19.498-10.644-.898-31.363-.496-39.934.774-.696.103-2.706.39-4.466.636-5.633.79-13.515 2.062-16.4 2.647-1.54.313-4.597.946-6.794 1.407-9.185 1.929-14.387-1.342-14.4-9.054-.011-5.997 2.61-8.459 10.994-10.333 22.531-5.037 53.898-7.603 71.684-5.865"
        />
      </g>
    </svg>
  )
}

const NowPlaying = () => {
  const { data }  = useSWR<NowPlayingTypes>('/api/now-playing', url => fetch(url).then(res => res.json()));
  const playerTitleRef = useRef() as MutableRefObject<HTMLDivElement>
  const [ marquee, setMarquee ] = useState<boolean>(false);
  const [ marqueeNudge, setMarqueeNudge ] = useState<number>(0);

  useEffect(() => {
    if (data && playerTitleRef) {
      const refWidth = playerTitleRef.current?.getBoundingClientRect().width;
      const refParentWidth: any = playerTitleRef.current?.parentElement?.getBoundingClientRect().width;
      if(refWidth > refParentWidth && refParentWidth !== undefined) {
        setMarquee(true);
        setMarqueeNudge(refParentWidth - refWidth - 40);
      } else {
        setMarquee(false)
      }
    }
  }, [data]);

  return  (
    <motion.div
      className={clsx(
      "inline-flex shrink-0 items-center rounded-full pl-2 pr-4 h-8 text-sm border transition-all duration-500 snap-x snap-start snap-mandatory",
      data?.isPlaying ? 'spotify-pulse bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700' : 'bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700')}
    >
      {
        data?.isPlaying ? (
          <a
            className="max-w-[14rem] flex items-center relative overflow-hidden"
            href={data?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative w-5 h-5 ml-1 mr-2 z-10 rounded-sm overflow-hidden shrink-0">
              <Image
                src={data?.albumImageUrl}
                alt={`Album cover - ${data?.title}`}
                width={24}
                height={24}
              />
            </span>
            <motion.span
              className="inline-block whitespace-nowrap"
              ref={playerTitleRef}
              variants={{
                marquee: {
                  x: [0, marqueeNudge, marqueeNudge, 0],
                  y: 0,
                  transition: {
                    ease: "linear",
                    duration: 20,
                    repeat: Infinity,
                    repeatDelay: 5,
                    velocity: 0
                  }
                }
              }}
              initial={{x: 0, y: 0}}
              animate={marquee && "marquee"}
            >
              {data?.artist + " - " + data?.title}
            </motion.span>
            {
              marquee && (
                <>
                  <div className="absolute left-0 top-0 h-full w-1/6 pointer-events-none bg-gradient-to-r from-green-50 dark:from-green-900" />
                  <div className="absolute right-0 top-0 h-full w-1/12 pointer-events-none bg-gradient-to-l from-green-50 dark:from-green-900" />
                </>
              )
            }
          </a>
        ) : (
          <>
            <SpotifyIcon />
            <span className="dark:text-gray-300 text-gray-600">Not Playing</span>
          </>
        )
      }
    </motion.div>
  )
};

export default NowPlaying;