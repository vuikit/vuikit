import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  plugins: [
    nodeResolve({
      extensions: [ '.js' ]
    }),
    buble(),
    cleanup()
  ]
}
