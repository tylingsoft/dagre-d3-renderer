/* global window */

let dagre

if (require) {
  try {
    dagre = require('dagre')
  } catch (e) {}
}

if (!dagre) {
  dagre = window.dagre
}

module.exports = dagre
