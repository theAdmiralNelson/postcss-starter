import { build } from 'esbuild';
import browserslistToEsbuild from 'browserslist-to-esbuild';

console.log(`Esbuild running in ${process.env.NODE_ENV} mode`)
// Use entryPoints: ['./src/assets/js/main.js', './src/assets/js/alt.js'] for multiple files,
const devOptions = {
  entryPoints: ['./src/js/main.js', './src/js/shopify.js'],
  outdir: './dist/js',
  bundle: true,
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    }
  }
};

const prodOptions = {
  entryPoints: ['./src/js/main.js', './src/js/shopify.js'],
  outdir: './dist/js',
  minify: true,
  bundle: true,
  target: browserslistToEsbuild(),
  legalComments: 'linked'
}

build(process.env.NODE_ENV === 'dev'? devOptions : prodOptions).catch(() => {
	process.exit(1)
})