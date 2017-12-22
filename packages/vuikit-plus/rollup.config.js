import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.json', '.vue' ]
    }),
    vue({
      compileTemplate: true
    }),
    buble()
  ]
}
