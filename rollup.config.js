// import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'
// import babel from 'rollup-plugin-babel'

// 组件
const Modal = 'modal';

const wheelName = Modal;

export default {
  input: process.env.BUILD === 'development' ? `src/${wheelName}/index.js` : `src/main.js`,
  output: {
    file: `dist/${wheelName}.js`,
    format: 'umd',
    name: process.env.BUILD === 'development' ? wheelName : 'front-end-components',
    sourcemap: process.env.BUILD === 'development' ? true : false
  },
  plugins: [
    postcss({
      extract: false,
      plugins: [
        require('autoprefixer')
      ]
    }),
    // babel({
    //   exclude: 'node_modules/**'
    // }),
    !process.env.BUILD === 'development' && uglify()
  ]
};
