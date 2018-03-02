import { assign, each } from './'

export default {

  ratio (dimensions, prop, value) {

    const aProp = prop === 'width' ? 'height' : 'width'

    return {
      [aProp]: Math.round(value * dimensions[aProp] / dimensions[prop]),
      [prop]: value
    }
  },

  contain (dimensions, maxDimensions) {
    dimensions = assign({}, dimensions)

    each(dimensions, (_, prop) => {
      dimensions = dimensions[prop] > maxDimensions[prop]
        ? this.ratio(dimensions, prop, maxDimensions[prop])
        : dimensions
    })

    return dimensions
  },

  cover (dimensions, maxDimensions) {
    dimensions = this.contain(dimensions, maxDimensions)

    each(dimensions, (_, prop) => {
      dimensions = dimensions[prop] < maxDimensions[prop]
        ? this.ratio(dimensions, prop, maxDimensions[prop])
        : dimensions
    })

    return dimensions
  }

}
