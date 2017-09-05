import intersectEllipse from './intersect-ellipse'

module.exports = intersectCircle

function intersectCircle (node, rx, point) {
  return intersectEllipse(node, rx, rx, point)
}
