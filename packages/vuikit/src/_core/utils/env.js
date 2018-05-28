/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */

/* eslint-disable no-mixed-operators */
import {attr} from './attr'

const doc = typeof document !== 'undefined' && document
const win = typeof window !== 'undefined' && window
const nav = typeof navigator !== 'undefined' && navigator

export const isRtl = doc && attr(document.documentElement, 'dir') === 'rtl'

const hasTouchEvents = win && 'ontouchstart' in window

const hasPointerEvents = win && window.PointerEvent

export const hasTouch = hasTouchEvents ||
  (win && window.DocumentTouch) && (doc && document instanceof window.DocumentTouch) ||
  nav && navigator.maxTouchPoints // IE >=11

export const pointerDown = !hasTouch ? 'mousedown' : `mousedown ${hasTouchEvents ? 'touchstart' : 'pointerdown'}`
export const pointerMove = !hasTouch ? 'mousemove' : `mousemove ${hasTouchEvents ? 'touchmove' : 'pointermove'}`
export const pointerUp = !hasTouch ? 'mouseup' : `mouseup ${hasTouchEvents ? 'touchend' : 'pointerup'}`
export const pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter'
export const pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave'
