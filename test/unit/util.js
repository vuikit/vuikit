import Vue from 'vue'
import Vuikit from 'src'

Vue.use(Vuikit)

let id = 0

const createElm = function () {
  const elm = document.createElement('div')

  elm.id = 'app' + ++id
  document.body.appendChild(elm)

  return elm
}

/**
 * @param  {Object} vm
 */
export function destroyVM (vm) {
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * @param  {Object|String}  Compo
 * @param  {Boolean=false} mounted
 * @return {Object} vm
 */
export function createVue (Compo, mounted = false) {
  const elm = createElm()

  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo }
  }
  return new Vue(Compo).$mount(mounted === false ? null : elm)
}

/**
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo
 * @param  {Object}  propsData
 * @param  {Boolean=false} mounted
 * @return {Object} vm
 */
export function createTest (Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData
    propsData = {}
  }
  const elm = createElm()
  const Ctor = Vue.extend(Compo)
  return new Ctor({ propsData }).$mount(mounted === false ? null : elm)
}

/**
 * mouseenter, mouseleave, mouseover, keyup, change, click
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
export function triggerEvent (elm, name, ...opts) {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt)

  return elm
}

/**
 * esc = 27
 * @param  {Element} elm
 * @param  {String} keyCode
 */
export function triggerKeyEvent (elm, keyCode) {
  const evt = document.createEvent('Events')

  evt.initEvent('keyup', true, true)
  evt.keyCode = keyCode
  elm.dispatchEvent(evt)
}

export function queryByTagAll (vm, name) {
  let result = []
  for (let i = 0; i < vm.$children.length; i++) {
    const child = vm.$children[i]

    if (getComponentTag(child) === name) {
      result.push(child)
    }

    if (child.$children && child.$children.length) {
      result = [...result, ...queryByTagAll(child, name)]
    }
  }
  return result
}

export function queryByTag (vm, name) {
  for (let i = 0; i < vm.$children.length; i++) {
    const child = vm.$children[i]

    if (getComponentTag(child) === name) {
      return child
    }

    if (child.$children && child.$children.length) {
      return queryByTag(child, name)
    }
  }
  return false
}

function getComponentTag (vm) {
  return vm.$options && vm.$options._componentTag
}
