import alias from './alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import rollupAlias from 'rollup-plugin-alias'
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
    rollupAlias(alias)
  ]
}
