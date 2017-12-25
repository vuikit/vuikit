import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  external: id => id.match(/@vuikit\/core/),
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.json', '.vue' ]
    }),
    vue({
      compileTemplate: true
    }),
    buble(),
    cleanup()
  ]
}
