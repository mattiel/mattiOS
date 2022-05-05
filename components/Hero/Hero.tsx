import { motion } from 'framer-motion';
import NowPlaying from '@components/NowPlaying';

const Hero = () => {
  return (
    <section className="dark:text-white mt-64 flex flex-col justify-end items-start mb-32">
      <div className="flex flex-col w-full">
        <motion.span
          className="text-4xl origin-center inline-block self-start mb-4"
          animate={{
            rotate: [-30, 45, -30, 0],
            x: [-10, 10, -10, 0],
            y: [10, 0, 10, 0],
          }}
          transition={{
            type: 'spring',
            damping: 30,
            mass: 0.1,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          👋
        </motion.span>
        <h2 className="text-3xl leading-relaxed max-w-prose">
          Hello! 안녕하세요! I&apos;m Mattie — a multi-disciplinary experience designer
          {""} with emphasis in <u className="underline decoration-4 underline-offset-2 decoration-pink-600">🧑‍🚀 design systems</u>
          {""} and <u className="underline decoration-4 underline-offset-2 decoration-blue-600">🛠 front end development</u>.
        </h2>
        <div className="relative">
          <div className=" w-full snap-x snap-mandatory overflow-x-auto whitespace-nowrap flex lg:flex-wrap gap-4 pb-4 items-start pt-12">
            <a className="inline-flex items-center h-8 text-sm snap-x snap-start snap-mandatory bg-gray-50 shrink-0 dark:bg-pink-900 dark:border-pink-700 border pl-2 pr-4 rounded-full">
              📍 Los Angeles, CA
            </a>

            <a
              className="inline-flex items-center h-8 text-sm snap-x snap-start snap-mandatory bg-gray-50shrink-0 dark:bg-blue-900 dark:border-blue-700 border pl-3 pr-4 rounded-full"
              href="https://canoo.com"
              rel="noreferrer"
            >
              🚗 Upcoming Product Designer @ Canoo
            </a>
            <NowPlaying />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;