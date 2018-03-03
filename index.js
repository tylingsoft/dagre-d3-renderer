import * as d3 from 'd3'
import dagre from 'dagre-layout'

import intersect from './lib/intersect'
import render from './lib/render'
import util from './lib/util'
import { version } from './package.json'

export default {
  d3,
  dagre,
  intersect,
  render,
  util,
  version
}
