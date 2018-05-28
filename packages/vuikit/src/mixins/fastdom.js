import { apply } from 'vuikit/src/util/vue'
import { ready } from 'vuikit/src/util/dom'
import { fastdom } from 'vuikit/src/util/fastdom'
import { on, createEvent } from 'vuikit/src/util/event'
import { includes, assign, isPlainObject } from 'vuikit/src/util/lang'

const DATA = '_vk_fastdom_data'
const FRAMES = '_vk_fastdom_frames'

let scroll = 0
const instances = []

if (typeof window !== 'undefined') {
  on(window, 'load resize', () =>
    instances.forEach(i => i.fastdomUpdate())
  )
  on(window, 'scroll', e => {
    e.dir = scroll <= window.pageYOffset ? 'down' : 'up'
    e.scrollY = scroll = window.pageYOffset
    instances.forEach(inst => inst.fastdomUpdate(e))
  })
}

export default {
  methods: {
    fastdomUpdate (e, parents = false) {
      e = createEvent(e || 'update')
      let instance = this

      if (parents) {

        do {
          if (instance._fastdom_ready) {
            instance._fastdomUpdate(e)
          }
          instance = instance.$parent()
        } while (instance)

      } else {

        apply(instance, instance => {
          if (instance._fastdom_ready) {
            instance._fastdomUpdate(e)
          }
        })
      }
    },
    _fastdomUpdate (e) {
      e = createEvent(e || 'update')

      const { type } = e

      const updates = this.$options.fastdom
      const { reads, writes } = this[FRAMES]

      if (!updates) {
        return
      }

      updates.forEach(({ read, write, events }, i) => {
        if (type !== 'update' && !includes(events, type)) {
          return
        }

        if (read && !includes(fastdom.reads, reads[i])) {
          reads[i] = fastdom.read(() => {

            const result = read.call(this, this[DATA], e)

            if (result === false && write) {
              fastdom.clear(writes[i])
              delete writes[i]
            } else if (isPlainObject(result)) {
              assign(this[DATA], result)
            }
            delete reads[i]
          })
        }

        if (write && !includes(fastdom.writes, writes[i])) {
          writes[i] = fastdom.write(() => {
            write.call(this, this[DATA], e)
            delete writes[i]
          })
        }
      })
    }
  },
  created () {
    this[DATA] = {}
    this[FRAMES] = { reads: {}, writes: {} }
    instances.push(this)
  },
  mounted () {
    this._fastdom_ready || ready(() => {
      const hook = this.$options.domReady

      hook && hook.call(this)

      this._fastdom_ready = true
      this._fastdomUpdate()
    })

    this._fastdomUpdate()
  },
  beforeDestroy () {
    // remove from active instances
    const index = instances.indexOf(instances.filter(inst => inst === this)[0])
    instances.splice(index, 1)
  }
}
