const { withContentlayer } = require('next-contentlayer')

/**
 * @type {import('next').NextConfig}
 */

module.exports = withContentlayer()({
  reactStrictMode: true,
  // Prefer loading of ES Modules over CommonJS
  experimental: {esmExternals: true},
  // Support MDX files as pages:
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  // Support loading `.md`, `.mdx`:
  images: {
    domains: ['i.scdn.co'],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {/* jsxImportSource: …, otherOptions… */}
        }
      ]
    })

    return config
  }
})
