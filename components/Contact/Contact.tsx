import React from 'react'

const Contact = () => {
  return (
    <div className="mt-12 border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 rounded-xl p-12 gap-12 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-start">
      <div className="grid gap-2">
        <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          Let&apos;s talk
        </h3>
        <p className="text-gray-700 dark:text-white">
          I&apos;m happy to discuss more about this project or future opportunities. Feel free to reach out to me.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 place-items-end w-full h-full">
        <a
          className="inline-flex items-center text-gray-600 dark:text-gray-400 text-xl underline decoration-gray-600 dark:decoration-gray-400 hover:dark:decoration-white decoration-2 hover:decoration-4 underline-offset-2 hover:text-black hover:decoration-black dark:hover:text-white hover:underline-offset-4 transition-all"
          href="mailto: hello@mattiel.dev">
          hello@mattiel.dev
          <svg
            className="w-5 h-5 ml-1"
            fill="none" stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Contact;