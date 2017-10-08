import alias from './alias'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
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
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    rollupAlias(alias)
  ]
}
