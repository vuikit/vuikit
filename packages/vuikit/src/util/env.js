/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */

/* eslint-disable no-mixed-operators */
/* global DocumentTouch */
import {attr} from './attr'

export const isRtl = global.document && attr(document.documentElement, 'dir') === 'rtl'

const hasTouchEvents = global.window && 'ontouchstart' in window

const hasPointerEvents = global.window && window.PointerEvent

export const hasTouch = hasTouchEvents ||
  global.window && global.document && window.DocumentTouch && document instanceof DocumentTouch ||
  global.navigator && navigator.maxTouchPoints // IE >=11

export const pointerDown = !hasTouch ? 'mousedown' : `mousedown ${hasTouchEvents ? 'touchstart' : 'pointerdown'}`
export const pointerMove = !hasTouch ? 'mousemove' : `mousemove ${hasTouchEvents ? 'touchmove' : 'pointermove'}`
export const pointerUp = !hasTouch ? 'mouseup' : `mouseup ${hasTouchEvents ? 'touchend' : 'pointerup'}`
export const pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter'
export const pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave'
