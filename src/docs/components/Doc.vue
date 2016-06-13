<template>
  <div>
    <slot name="demo"></slot>
    <div class="uk-margin-large">
      <slot name="desc"></slot>
    </div>
    <vk-tabs>
      <vk-tab label="Props">
        <slot name="props">
          <table-props :rows="props"></table-props>
        </slot>
      </vk-tab>
      <vk-tab label="Slots" v-if="slots">
        <slot name="slots">
          <table-slots :rows="slots"></table-slots>
        </slot>
      </vk-tab>
      <vk-tab label="Events" v-if="events">
        <table-events :rows="events"></table-events>
      </vk-tab>
      <vk-tab label="Code">
        <pre><code class="html hljs" v-html="code | beautify | highlight"></code></pre>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { getComponentDefaults } from '../helper'
import hljs from 'highlight.js/lib/highlight'
import beautify from 'js-beautify'
import {
  mapValues,
  pickBy,
  each,
  isEqual,
  isEmpty,
  isArray,
  isObject,
  kebabCase
} from 'lodash'

// init highlight language
hljs.registerLanguage('html', require('highlight.js/lib/languages/xml'))

export default {
  data: () => ({
    showEvents: false
  }),
  props: {
    component: {
      type: String,
      default: ''
    },
    // emulates the content
    // for the code default slot
    codeSlot: {
      type: String,
      default: ''
    },
    // code before the main demo code
    codePre: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      required: false
    },
    slots: {
      type: [Object, Boolean],
      default: false
    },
    events: {
      type: [Object, Boolean],
      default: false
    }
  },
  computed: {
    // code programatically created
    code () {
      var el = document.createElement(`vk-${this.component}`)
      // add props as el attributes
      each(this.propsCustomValues, (value, key) => {
        // true values can be set only with key
        if (value === true) {
          value = ''
        }
        if (isArray(value) || isObject(value)) {
          if (isEmpty(value)) {
            return true
          }
          // convert into literal
          value = JSON.stringify(value)
            .replace(/"/g, '\'') // not double quotes
          // bind is required
          key = `:${key}`
        } else if (Number.isInteger(value) || value === false) {
          key = `:${key}`
        }
        el.setAttribute(kebabCase(key), value)
      })
      // add el inner text
      if (this.codeSlot) {
        el.innerHTML = '\n' + this.codeSlot + '\n'
      }
      // workaround to get el as text
      var tmp = document.createElement('div')
      tmp.appendChild(el)
      return this.codePre + tmp.innerHTML
        .replace(/=""/g, '') // remove empty values
    },
    // return props from demo that
    // differ from component defaults
    propsCustomValues () {
      const propsDefaults = getComponentDefaults(this.component)
      return pickBy(mapValues(this.props, 'value'), (value, name) => {
        if (isObject(value) && !isEmpty(value)) {
          return false
        } else {
          return !isEqual(propsDefaults[name], value)
        }
      })
    }
  },
  filters: {
    beautify (str) {
      return beautify.html(str, {
        wrap_attributes: 'force',
        wrap_attributes_indent_size: 2,
        indent_size: 2
      })
      // add new line for closing tags, if no children
      .replace(/><\/vk-(.*)>$/g, '>\n</vk-$1>')
      // add new line on first attr for main component
      .replace(/^<vk-(\S*) (\S*)/, '<vk-$1\n  $2')
    },
    highlight (str) {
      return hljs.highlight('html', str).value
    }
  }
}
</script>

<style>
/*
github.com style (c) Vasily Polovnyov <vast@whiteants.net>
*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
}

.hljs-comment,
.hljs-quote {
  color: #998;
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #333;
  font-weight: bold;
}

.hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
  color: #008080;
}

.hljs-string,
.hljs-doctag {
  color: #d14;
}

.hljs-title,
.hljs-section,
.hljs-selector-id {
  color: #900;
  font-weight: bold;
}

.hljs-subst {
  font-weight: normal;
}

.hljs-type,
.hljs-class .hljs-title {
  color: #458;
  font-weight: bold;
}

.hljs-tag,
.hljs-name,
.hljs-attribute {
  color: #000080;
  font-weight: normal;
}

.hljs-regexp,
.hljs-link {
  color: #009926;
}

.hljs-symbol,
.hljs-bullet {
  color: #990073;
}

.hljs-built_in,
.hljs-builtin-name {
  color: #0086b3;
}

.hljs-meta {
  color: #999;
  font-weight: bold;
}

.hljs-deletion {
  background: #fdd;
}

.hljs-addition {
  background: #dfd;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
</style>
