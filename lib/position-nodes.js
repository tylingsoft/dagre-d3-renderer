const d3 = require('d3')

const util = require('./util')

module.exports = positionNodes

function positionNodes (selection, g) {
  const created = selection.filter(function () { return !d3.select(this).classed('update') })

  function translate (v) {
    const node = g.node(v)
    return 'translate(' + node.x + ',' + node.y + ')'
  }

  created.attr('transform', translate)

  util.applyTransition(selection, g)
    .style('opacity', 1)
    .attr('transform', translate)
}
