import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  external: [
    'vue'
  ],
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.json', '.vue' ]
    }),
    vue({
      compileTemplate: true
    }),
    buble(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
