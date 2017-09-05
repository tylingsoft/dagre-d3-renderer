(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("lodash"), require("dagre"), require("graphlib"));
	else if(typeof define === 'function' && define.amd)
		define(["d3", "lodash", "dagre", "graphlib"], factory);
	else if(typeof exports === 'object')
		exports["dagreD3"] = factory(require("d3"), require("lodash"), require("dagre"), require("graphlib"));
	else
		root["dagreD3"] = factory(root["d3"], root["lodash"], root["dagre"], root["graphlib"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Public utility functions
module.exports = {
  isSubgraph: isSubgraph,
  edgeToId: edgeToId,
  applyStyle: applyStyle,
  applyClass: applyClass,
  applyTransition: applyTransition

  /*
   * Returns true if the specified node in the graph is a subgraph node. A
   * subgraph node is one that contains other nodes.
   */
};function isSubgraph(g, v) {
  return !!g.children(v).length;
}

function edgeToId(e) {
  return escapeId(e.v) + ':' + escapeId(e.w) + ':' + escapeId(e.name);
}

var ID_DELIM = /:/g;
function escapeId(str) {
  return str ? String(str).replace(ID_DELIM, '\\:') : '';
}

function applyStyle(dom, styleFn) {
  if (styleFn) {
    dom.attr('style', styleFn);
  }
}

function applyClass(dom, classFn, otherClasses) {
  if (classFn) {
    dom.attr('class', classFn).attr('class', otherClasses + ' ' + dom.attr('class'));
  }
}

function applyTransition(selection, g) {
  var graph = g.graph();

  if (_lodash2.default.isPlainObject(graph)) {
    var transition = graph.transition;
    if (_lodash2.default.isFunction(transition)) {
      return transition(selection);
    }
  }

  return selection;
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("d3");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = intersectEllipse;

function intersectEllipse(node, rx, ry, point) {
  // Formulae from: http://mathworld.wolfram.com/Ellipse-LineIntersection.html

  var cx = node.x;
  var cy = node.y;

  var px = cx - point.x;
  var py = cy - point.y;

  var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);

  var dx = Math.abs(rx * ry * px / det);
  if (point.x < cx) {
    dx = -dx;
  }
  var dy = Math.abs(rx * ry * py / det);
  if (point.y < cy) {
    dy = -dy;
  }

  return { x: cx + dx, y: cy + dy };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _addTextLabel = __webpack_require__(19);

var _addTextLabel2 = _interopRequireDefault(_addTextLabel);

var _addHtmlLabel = __webpack_require__(20);

var _addHtmlLabel2 = _interopRequireDefault(_addHtmlLabel);

var _addSvgLabel = __webpack_require__(21);

var _addSvgLabel2 = _interopRequireDefault(_addSvgLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = addLabel;

function addLabel(root, node, location) {
  var label = node.label;
  var labelSvg = root.append('g');

  // Allow the label to be a string, a function that returns a DOM element, or
  // a DOM element itself.
  if (node.labelType === 'svg') {
    (0, _addSvgLabel2.default)(labelSvg, node);
  } else if (typeof label !== 'string' || node.labelType === 'html') {
    (0, _addHtmlLabel2.default)(labelSvg, node);
  } else {
    (0, _addTextLabel2.default)(labelSvg, node);
  }

  var labelBBox = labelSvg.node().getBBox();
  var y = void 0;
  switch (location) {
    case 'top':
      y = -node.height / 2;
      break;
    case 'bottom':
      y = node.height / 2 - labelBBox.height;
      break;
    default:
      y = -labelBBox.height / 2;
  }
  labelSvg.attr('transform', 'translate(' + -labelBBox.width / 2 + ',' + y + ')');

  return labelSvg;
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("dagre");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = intersectNode;

function intersectNode(node, point) {
  return node.intersect(point);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _intersectEllipse = __webpack_require__(3);

var _intersectEllipse2 = _interopRequireDefault(_intersectEllipse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = intersectCircle;

function intersectCircle(node, rx, point) {
  return (0, _intersectEllipse2.default)(node, rx, rx, point);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _intersectLine = __webpack_require__(13);

var _intersectLine2 = _interopRequireDefault(_intersectLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = intersectPolygon;

/*
 * Returns the point ({x, y}) at which the point argument intersects with the
 * node argument assuming that it has the shape specified by polygon.
 */
function intersectPolygon(node, polyPoints, point) {
  var x1 = node.x;
  var y1 = node.y;

  var intersections = [];

  var minX = Number.POSITIVE_INFINITY;
  var minY = Number.POSITIVE_INFINITY;
  polyPoints.forEach(function (entry) {
    minX = Math.min(minX, entry.x);
    minY = Math.min(minY, entry.y);
  });

  var left = x1 - node.width / 2 - minX;
  var top = y1 - node.height / 2 - minY;

  for (var i = 0; i < polyPoints.length; i += 1) {
    var p1 = polyPoints[i];
    var p2 = polyPoints[i < polyPoints.length - 1 ? i + 1 : 0];
    var intersect = (0, _intersectLine2.default)(node, point, { x: left + p1.x, y: top + p1.y }, { x: left + p2.x, y: top + p2.y });
    if (intersect) {
      intersections.push(intersect);
    }
  }

  if (!intersections.length) {
    console.log('NO INTERSECTION FOUND, RETURN NODE CENTER', node);
    return node;
  }

  if (intersections.length > 1) {
    // More intersections, find the one nearest to edge end point
    intersections.sort(function (p, q) {
      var pdx = p.x - point.x;
      var pdy = p.y - point.y;
      var distp = Math.sqrt(pdx * pdx + pdy * pdy);

      var qdx = q.x - point.x;
      var qdy = q.y - point.y;
      var distq = Math.sqrt(qdx * qdx + qdy * qdy);

      return distp < distq ? -1 : distp === distq ? 0 : 1;
    });
  }
  return intersections[0];
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = intersectRect;

function intersectRect(node, point) {
  var x = node.x;
  var y = node.y;

  // Rectangle intersection algorithm from:
  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
  var dx = point.x - x;
  var dy = point.y - y;
  var w = node.width / 2;
  var h = node.height / 2;

  var sx = void 0,
      sy = void 0;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    // Intersection is top or bottom of rect.
    if (dy < 0) {
      h = -h;
    }
    sx = dy === 0 ? 0 : h * dx / dy;
    sy = h;
  } else {
    // Intersection is left or right of rect.
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = dx === 0 ? 0 : w * dy / dx;
  }

  return { x: x + sx, y: y + sy };
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _graphlib = __webpack_require__(11);

var _graphlib2 = _interopRequireDefault(_graphlib);

var _dagre = __webpack_require__(5);

var _dagre2 = _interopRequireDefault(_dagre);

var _intersect = __webpack_require__(12);

var _intersect2 = _interopRequireDefault(_intersect);

var _render = __webpack_require__(14);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _version = __webpack_require__(27);

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  d3: _d2.default,
  graphlib: _graphlib2.default,
  dagre: _dagre2.default,
  intersect: _intersect2.default,
  render: _render2.default,
  util: _util2.default,
  version: _version2.default
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("graphlib");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _intersectNode = __webpack_require__(6);

var _intersectNode2 = _interopRequireDefault(_intersectNode);

var _intersectCircle = __webpack_require__(7);

var _intersectCircle2 = _interopRequireDefault(_intersectCircle);

var _intersectEllipse = __webpack_require__(3);

var _intersectEllipse2 = _interopRequireDefault(_intersectEllipse);

var _intersectPolygon = __webpack_require__(8);

var _intersectPolygon2 = _interopRequireDefault(_intersectPolygon);

var _intersectRect = __webpack_require__(9);

var _intersectRect2 = _interopRequireDefault(_intersectRect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  node: _intersectNode2.default,
  circle: _intersectCircle2.default,
  ellipse: _intersectEllipse2.default,
  polygon: _intersectPolygon2.default,
  rect: _intersectRect2.default
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = intersectLine;

/*
 * Returns the point at which two lines, p and q, intersect or returns
 * undefined if they do not intersect.
 */
function intersectLine(p1, p2, q1, q2) {
  // Algorithm from J. Avro, (ed.) Graphics Gems, No 2, Morgan Kaufmann, 1994,
  // p7 and p473.

  // Compute a1, b1, c1, where line joining points 1 and 2 is F(x,y) = a1 x +
  // b1 y + c1 = 0.
  var a1 = p2.y - p1.y;
  var b1 = p1.x - p2.x;
  var c1 = p2.x * p1.y - p1.x * p2.y;

  // Compute r3 and r4.
  var r3 = a1 * q1.x + b1 * q1.y + c1;
  var r4 = a1 * q2.x + b1 * q2.y + c1;

  // Check signs of r3 and r4. If both point 3 and point 4 lie on
  // same side of line 1, the line segments do not intersect.
  if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) {
    return; /* DONT_INTERSECT */
  }

  // Compute a2, b2, c2 where line joining points 3 and 4 is G(x,y) = a2 x + b2 y + c2 = 0
  var a2 = q2.y - q1.y;
  var b2 = q1.x - q2.x;
  var c2 = q2.x * q1.y - q1.x * q2.y;

  // Compute r1 and r2
  var r1 = a2 * p1.x + b2 * p1.y + c2;
  var r2 = a2 * p2.x + b2 * p2.y + c2;

  // Check signs of r1 and r2. If both point 1 and point 2 lie
  // on same side of second line segment, the line segments do
  // not intersect.
  if (r1 !== 0 && r2 !== 0 && sameSign(r1, r2)) {
    return; /* DONT_INTERSECT */
  }

  // Line segments intersect: compute intersection point.
  var denom = a1 * b2 - a2 * b1;
  if (denom === 0) {
    return; /* COLLINEAR */
  }

  var offset = Math.abs(denom / 2);

  // The denom/2 is to get rounding instead of truncating. It
  // is added or subtracted to the numerator, depending upon the
  // sign of the numerator.
  var num = b1 * c2 - b2 * c1;
  var x = num < 0 ? (num - offset) / denom : (num + offset) / denom;

  num = a2 * c1 - a1 * c2;
  var y = num < 0 ? (num - offset) / denom : (num + offset) / denom;

  return { x: x, y: y };
}

function sameSign(r1, r2) {
  return r1 * r2 > 0;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _dagre = __webpack_require__(5);

var _positionNodes = __webpack_require__(15);

var _positionNodes2 = _interopRequireDefault(_positionNodes);

var _positionEdgeLabels = __webpack_require__(16);

var _positionEdgeLabels2 = _interopRequireDefault(_positionEdgeLabels);

var _positionClusters = __webpack_require__(17);

var _positionClusters2 = _interopRequireDefault(_positionClusters);

var _createNodes2 = __webpack_require__(18);

var _createNodes3 = _interopRequireDefault(_createNodes2);

var _createClusters2 = __webpack_require__(22);

var _createClusters3 = _interopRequireDefault(_createClusters2);

var _createEdgeLabels2 = __webpack_require__(23);

var _createEdgeLabels3 = _interopRequireDefault(_createEdgeLabels2);

var _createEdgePaths2 = __webpack_require__(24);

var _createEdgePaths3 = _interopRequireDefault(_createEdgePaths2);

var _shapes2 = __webpack_require__(25);

var _shapes3 = _interopRequireDefault(_shapes2);

var _arrows2 = __webpack_require__(26);

var _arrows3 = _interopRequireDefault(_arrows2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = render;

// This design is based on http://bost.ocks.org/mike/chart/.
function render() {
  var _createNodes = _createNodes3.default;
  var _createClusters = _createClusters3.default;
  var _createEdgeLabels = _createEdgeLabels3.default;
  var _createEdgePaths = _createEdgePaths3.default;
  var _shapes = _shapes3.default;
  var _arrows = _arrows3.default;

  var fn = function fn(svg, g) {
    preProcessGraph(g);

    var outputGroup = createOrSelectGroup(svg, 'output');
    var clustersGroup = createOrSelectGroup(outputGroup, 'clusters');
    var edgePathsGroup = createOrSelectGroup(outputGroup, 'edgePaths');
    var edgeLabels = _createEdgeLabels(createOrSelectGroup(outputGroup, 'edgeLabels'), g);
    var nodes = _createNodes(createOrSelectGroup(outputGroup, 'nodes'), g, _shapes);

    (0, _dagre.layout)(g);

    (0, _positionNodes2.default)(nodes, g);
    (0, _positionEdgeLabels2.default)(edgeLabels, g);
    _createEdgePaths(edgePathsGroup, g, _arrows);

    var clusters = _createClusters(clustersGroup, g);
    (0, _positionClusters2.default)(clusters, g);

    postProcessGraph(g);
  };

  fn.createNodes = function (value) {
    if (!arguments.length) {
      return _createNodes;
    }
    _createNodes = value;
    return fn;
  };

  fn.createClusters = function (value) {
    if (!arguments.length) {
      return _createClusters;
    }
    _createClusters = value;
    return fn;
  };

  fn.createEdgeLabels = function (value) {
    if (!arguments.length) {
      return _createEdgeLabels;
    }
    _createEdgeLabels = value;
    return fn;
  };

  fn.createEdgePaths = function (value) {
    if (!arguments.length) {
      return _createEdgePaths;
    }
    _createEdgePaths = value;
    return fn;
  };

  fn.shapes = function (value) {
    if (!arguments.length) {
      return _shapes;
    }
    _shapes = value;
    return fn;
  };

  fn.arrows = function (value) {
    if (!arguments.length) {
      return _arrows;
    }
    _arrows = value;
    return fn;
  };

  return fn;
}

var NODE_DEFAULT_ATTRS = {
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 10,
  rx: 0,
  ry: 0,
  shape: 'rect'
};

var EDGE_DEFAULT_ATTRS = {
  arrowhead: 'normal',
  lineInterpolate: 'linear'
};

function preProcessGraph(g) {
  g.nodes().forEach(function (v) {
    var node = g.node(v);
    if (!_lodash2.default.has(node, 'label') && !g.children(v).length) {
      node.label = v;
    }

    if (_lodash2.default.has(node, 'paddingX')) {
      _lodash2.default.defaults(node, {
        paddingLeft: node.paddingX,
        paddingRight: node.paddingX
      });
    }

    if (_lodash2.default.has(node, 'paddingY')) {
      _lodash2.default.defaults(node, {
        paddingTop: node.paddingY,
        paddingBottom: node.paddingY
      });
    }

    if (_lodash2.default.has(node, 'padding')) {
      _lodash2.default.defaults(node, {
        paddingLeft: node.padding,
        paddingRight: node.padding,
        paddingTop: node.padding,
        paddingBottom: node.padding
      });
    }

    _lodash2.default.defaults(node, NODE_DEFAULT_ATTRS);

    _lodash2.default.each(['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'], function (k) {
      node[k] = Number(node[k]);
    });

    // Save dimensions for restore during post-processing
    if (_lodash2.default.has(node, 'width')) {
      node._prevWidth = node.width;
    }
    if (_lodash2.default.has(node, 'height')) {
      node._prevHeight = node.height;
    }
  });

  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    if (!_lodash2.default.has(edge, 'label')) {
      edge.label = '';
    }
    _lodash2.default.defaults(edge, EDGE_DEFAULT_ATTRS);
  });
}

function postProcessGraph(g) {
  _lodash2.default.each(g.nodes(), function (v) {
    var node = g.node(v);

    // Restore original dimensions
    if (_lodash2.default.has(node, '_prevWidth')) {
      node.width = node._prevWidth;
    } else {
      delete node.width;
    }

    if (_lodash2.default.has(node, '_prevHeight')) {
      node.height = node._prevHeight;
    } else {
      delete node.height;
    }

    delete node._prevWidth;
    delete node._prevHeight;
  });
}

function createOrSelectGroup(root, name) {
  var selection = root.select('g.' + name);
  if (selection.empty()) {
    selection = root.append('g').attr('class', name);
  }
  return selection;
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = positionNodes;

function positionNodes(selection, g) {
  var created = selection.filter(function () {
    return !_d2.default.select(this).classed('update');
  });

  function translate(v) {
    var node = g.node(v);
    return 'translate(' + node.x + ',' + node.y + ')';
  }

  created.attr('transform', translate);

  _util2.default.applyTransition(selection, g).style('opacity', 1).attr('transform', translate);
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = positionEdgeLabels;

function positionEdgeLabels(selection, g) {
  var created = selection.filter(function () {
    return !_d2.default.select(this).classed('update');
  });

  function translate(e) {
    var edge = g.edge(e);
    return _lodash2.default.has(edge, 'x') ? 'translate(' + edge.x + ',' + edge.y + ')' : '';
  }

  created.attr('transform', translate);

  _util2.default.applyTransition(selection, g).style('opacity', 1).attr('transform', translate);
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = positionClusters;

function positionClusters(selection, g) {
  var created = selection.filter(function () {
    return !_d2.default.select(this).classed('update');
  });

  function translate(v) {
    var node = g.node(v);
    return 'translate(' + node.x + ',' + node.y + ')';
  }

  created.attr('transform', translate);

  _util2.default.applyTransition(selection, g).style('opacity', 1).attr('transform', translate);

  _util2.default.applyTransition(created.selectAll('rect'), g).attr('width', function (v) {
    return g.node(v).width;
  }).attr('height', function (v) {
    return g.node(v).height;
  }).attr('x', function (v) {
    var node = g.node(v);
    return -node.width / 2;
  }).attr('y', function (v) {
    var node = g.node(v);
    return -node.height / 2;
  });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _addLabel = __webpack_require__(4);

var _addLabel2 = _interopRequireDefault(_addLabel);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = createNodes;

function createNodes(selection, g, shapes) {
  var simpleNodes = g.nodes().filter(function (v) {
    return !_util2.default.isSubgraph(g, v);
  });
  var svgNodes = selection.selectAll('g.node').data(simpleNodes, function (v) {
    return v;
  }).classed('update', true);

  svgNodes.selectAll('*').remove();
  svgNodes.enter().append('g').attr('class', 'node').style('opacity', 0);
  svgNodes.each(function (v) {
    var node = g.node(v);
    var thisGroup = _d2.default.select(this);
    var labelGroup = thisGroup.append('g').attr('class', 'label');
    var labelDom = (0, _addLabel2.default)(labelGroup, node);
    var shape = shapes[node.shape];
    var bbox = _lodash2.default.pick(labelDom.node().getBBox(), 'width', 'height');

    node.elem = this;

    if (node.id) {
      thisGroup.attr('id', node.id);
    }
    if (node.labelId) {
      labelGroup.attr('id', node.labelId);
    }
    _util2.default.applyClass(thisGroup, node['class'], (thisGroup.classed('update') ? 'update ' : '') + 'node');

    if (_lodash2.default.has(node, 'width')) {
      bbox.width = node.width;
    }
    if (_lodash2.default.has(node, 'height')) {
      bbox.height = node.height;
    }

    bbox.width += node.paddingLeft + node.paddingRight;
    bbox.height += node.paddingTop + node.paddingBottom;
    labelGroup.attr('transform', 'translate(' + (node.paddingLeft - node.paddingRight) / 2 + ',' + (node.paddingTop - node.paddingBottom) / 2 + ')');

    var shapeSvg = shape(_d2.default.select(this), bbox, node);
    _util2.default.applyStyle(shapeSvg, node.style);

    var shapeBBox = shapeSvg.node().getBBox();
    node.width = shapeBBox.width;
    node.height = shapeBBox.height;
  });

  _util2.default.applyTransition(svgNodes.exit(), g).style('opacity', 0).remove();

  return svgNodes;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = addTextLabel;

/*
 * Attaches a text label to the specified root. Handles escape sequences.
 */
function addTextLabel(root, node) {
  var domNode = root.append('text');

  var lines = processEscapeSequences(node.label).split('\n');
  for (var i = 0; i < lines.length; i += 1) {
    domNode.append('tspan').attr('xml:space', 'preserve').attr('dy', '1em').attr('x', '1').text(lines[i]);
  }

  _util2.default.applyStyle(domNode, node.labelStyle);

  return domNode;
}

function processEscapeSequences(text) {
  var newText = '';
  var escaped = false;
  var ch = null;
  for (var i = 0; i < text.length; i += 1) {
    ch = text[i];
    if (escaped) {
      switch (ch) {
        case 'n':
          newText += '\n';break;
        default:
          newText += ch;
      }
      escaped = false;
    } else if (ch === '\\') {
      escaped = true;
    } else {
      newText += ch;
    }
  }
  return newText;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = addHtmlLabel;

function addHtmlLabel(root, node) {
  var fo = root.append('foreignObject').attr('width', '100000');

  var div = fo.append('xhtml:div');
  div.attr('xmlns', 'http://www.w3.org/1999/xhtml');

  var label = node.label;
  switch (typeof label === 'undefined' ? 'undefined' : _typeof(label)) {
    case 'function':
      div.insert(label);
      break;
    case 'object':
      // Currently we assume this is a DOM object.
      div.insert(function () {
        return label;
      });
      break;
    default:
      div.html(label);
  }

  _util2.default.applyStyle(div, node.labelStyle);
  div.style('display', 'inline-block');
  // Fix for firefox
  div.style('white-space', 'nowrap');

  var client = div[0][0].getBoundingClientRect();
  fo.attr('width', client.width).attr('height', client.height);

  return fo;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = addSVGLabel;

function addSVGLabel(root, node) {
  var domNode = root;

  domNode.node().appendChild(node.label);

  _util2.default.applyStyle(domNode, node.labelStyle);

  return domNode;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _addLabel = __webpack_require__(4);

var _addLabel2 = _interopRequireDefault(_addLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = createClusters;

function createClusters(selection, g) {
  var clusters = g.nodes().filter(function (v) {
    return _util2.default.isSubgraph(g, v);
  });
  var svgClusters = selection.selectAll('g.cluster').data(clusters, function (v) {
    return v;
  });

  svgClusters.selectAll('*').remove();
  svgClusters.enter().append('g').attr('class', 'cluster').attr('id', function (v) {
    var node = g.node(v);
    return node.id;
  }).style('opacity', 0);

  _util2.default.applyTransition(svgClusters, g).style('opacity', 1);

  svgClusters.each(function (v) {
    var node = g.node(v);
    var thisGroup = _d2.default.select(this);
    _d2.default.select(this).append('rect');
    var labelGroup = thisGroup.append('g').attr('class', 'label');
    (0, _addLabel2.default)(labelGroup, node, node.clusterLabelPos);
  });

  svgClusters.selectAll('rect').each(function (c) {
    var node = g.node(c);
    var domCluster = _d2.default.select(this);
    _util2.default.applyStyle(domCluster, node.style);
  });

  _util2.default.applyTransition(svgClusters.exit(), g).style('opacity', 0).remove();

  return svgClusters;
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _addLabel = __webpack_require__(4);

var _addLabel2 = _interopRequireDefault(_addLabel);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = createEdgeLabels;

function createEdgeLabels(selection, g) {
  var svgEdgeLabels = selection.selectAll('g.edgeLabel').data(g.edges(), function (e) {
    return _util2.default.edgeToId(e);
  }).classed('update', true);

  svgEdgeLabels.selectAll('*').remove();
  svgEdgeLabels.enter().append('g').classed('edgeLabel', true).style('opacity', 0);
  svgEdgeLabels.each(function (e) {
    var edge = g.edge(e);
    var label = (0, _addLabel2.default)(_d2.default.select(this), g.edge(e), 0, 0).classed('label', true);
    var bbox = label.node().getBBox();

    if (edge.labelId) {
      label.attr('id', edge.labelId);
    }
    if (!_lodash2.default.has(edge, 'width')) {
      edge.width = bbox.width;
    }
    if (!_lodash2.default.has(edge, 'height')) {
      edge.height = bbox.height;
    }
  });

  _util2.default.applyTransition(svgEdgeLabels.exit(), g).style('opacity', 0).remove();

  return svgEdgeLabels;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _d = __webpack_require__(1);

var _d2 = _interopRequireDefault(_d);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _intersectNode = __webpack_require__(6);

var _intersectNode2 = _interopRequireDefault(_intersectNode);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = createEdgePaths;

function createEdgePaths(selection, g, arrows) {
  var svgPaths = selection.selectAll('g.edgePath').data(g.edges(), function (e) {
    return _util2.default.edgeToId(e);
  }).classed('update', true);

  enter(svgPaths, g);
  exit(svgPaths, g);

  _util2.default.applyTransition(svgPaths, g).style('opacity', 1);

  // Save DOM element in the path group, and set ID and class
  svgPaths.each(function (e) {
    var domEdge = _d2.default.select(this);
    var edge = g.edge(e);
    edge.elem = this;

    if (edge.id) {
      domEdge.attr('id', edge.id);
    }

    _util2.default.applyClass(domEdge, edge['class'], (domEdge.classed('update') ? 'update ' : '') + 'edgePath');
  });

  svgPaths.selectAll('path.path').each(function (e) {
    var edge = g.edge(e);
    edge.arrowheadId = _lodash2.default.uniqueId('arrowhead');

    var domEdge = _d2.default.select(this).attr('marker-end', function () {
      return 'url(' + makeFragmentRef(window.location.href, edge.arrowheadId) + ')';
    }).style('fill', 'none');

    _util2.default.applyTransition(domEdge, g).attr('d', function (e) {
      return calcPoints(g, e);
    });

    _util2.default.applyStyle(domEdge, edge.style);
  });

  svgPaths.selectAll('defs *').remove();
  svgPaths.selectAll('defs').each(function (e) {
    var edge = g.edge(e);
    var arrowhead = arrows[edge.arrowhead];
    arrowhead(_d2.default.select(this), edge.arrowheadId, edge, 'arrowhead');
  });

  return svgPaths;
}

function makeFragmentRef(url, fragmentId) {
  var baseUrl = url.split('#')[0];
  return baseUrl + '#' + fragmentId;
}

function calcPoints(g, e) {
  var edge = g.edge(e);
  var tail = g.node(e.v);
  var head = g.node(e.w);
  var points = edge.points.slice(1, edge.points.length - 1);
  points.unshift((0, _intersectNode2.default)(tail, points[0]));
  points.push((0, _intersectNode2.default)(head, points[points.length - 1]));

  return createLine(edge, points);
}

function createLine(edge, points) {
  var line = _d2.default.svg.line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  });

  if (_lodash2.default.has(edge, 'lineInterpolate')) {
    line.interpolate(edge.lineInterpolate);
  }

  if (_lodash2.default.has(edge, 'lineTension')) {
    line.tension(Number(edge.lineTension));
  }

  return line(points);
}

function getCoords(elem) {
  var bbox = elem.getBBox();
  var matrix = elem.ownerSVGElement.getScreenCTM().inverse().multiply(elem.getScreenCTM()).translate(bbox.width / 2, bbox.height / 2);
  return { x: matrix.e, y: matrix.f };
}

function enter(svgPaths, g) {
  var svgPathsEnter = svgPaths.enter().append('g').attr('class', 'edgePath').style('opacity', 0);
  svgPathsEnter.append('path').attr('class', 'path').attr('d', function (e) {
    var edge = g.edge(e);
    var sourceElem = g.node(e.v).elem;
    var points = _lodash2.default.range(edge.points.length).map(function () {
      return getCoords(sourceElem);
    });
    return createLine(edge, points);
  });
  svgPathsEnter.append('defs');
}

function exit(svgPaths, g) {
  var svgPathExit = svgPaths.exit();
  _util2.default.applyTransition(svgPathExit, g).style('opacity', 0).remove();

  _util2.default.applyTransition(svgPathExit.select('path.path'), g).attr('d', function (e) {
    var source = g.node(e.v);

    if (source) {
      var points = _lodash2.default.range(this.getTotalLength()).map(function () {
        return source;
      });
      return createLine({}, points);
    } else {
      return _d2.default.select(this).attr('d');
    }
  });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _intersectRect = __webpack_require__(9);

var _intersectRect2 = _interopRequireDefault(_intersectRect);

var _intersectEllipse = __webpack_require__(3);

var _intersectEllipse2 = _interopRequireDefault(_intersectEllipse);

var _intersectCircle = __webpack_require__(7);

var _intersectCircle2 = _interopRequireDefault(_intersectCircle);

var _intersectPolygon = __webpack_require__(8);

var _intersectPolygon2 = _interopRequireDefault(_intersectPolygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  rect: rect,
  ellipse: ellipse,
  circle: circle,
  diamond: diamond
};

function rect(parent, bbox, node) {
  var shapeSvg = parent.insert('rect', ':first-child').attr('rx', node.rx).attr('ry', node.ry).attr('x', -bbox.width / 2).attr('y', -bbox.height / 2).attr('width', bbox.width).attr('height', bbox.height);

  node.intersect = function (point) {
    return (0, _intersectRect2.default)(node, point);
  };

  return shapeSvg;
}

function ellipse(parent, bbox, node) {
  var rx = bbox.width / 2;
  var ry = bbox.height / 2;
  var shapeSvg = parent.insert('ellipse', ':first-child').attr('x', -bbox.width / 2).attr('y', -bbox.height / 2).attr('rx', rx).attr('ry', ry);

  node.intersect = function (point) {
    return (0, _intersectEllipse2.default)(node, rx, ry, point);
  };

  return shapeSvg;
}

function circle(parent, bbox, node) {
  var r = Math.max(bbox.width, bbox.height) / 2;
  var shapeSvg = parent.insert('circle', ':first-child').attr('x', -bbox.width / 2).attr('y', -bbox.height / 2).attr('r', r);

  node.intersect = function (point) {
    return (0, _intersectCircle2.default)(node, r, point);
  };

  return shapeSvg;
}

// Circumscribe an ellipse for the bounding box with a diamond shape. I derived
// the function to calculate the diamond shape from:
// http://mathforum.org/kb/message.jspa?messageID=3750236
function diamond(parent, bbox, node) {
  var w = bbox.width * Math.SQRT2 / 2;
  var h = bbox.height * Math.SQRT2 / 2;
  var points = [{ x: 0, y: -h }, { x: -w, y: 0 }, { x: 0, y: h }, { x: w, y: 0 }];
  var shapeSvg = parent.insert('polygon', ':first-child').attr('points', points.map(function (p) {
    return p.x + ',' + p.y;
  }).join(' '));

  node.intersect = function (p) {
    return (0, _intersectPolygon2.default)(node, points, p);
  };

  return shapeSvg;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  'default': normal,
  'normal': normal,
  'vee': vee,
  'undirected': undirected
};

function normal(parent, id, edge, type) {
  var marker = parent.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5).attr('markerUnits', 'strokeWidth').attr('markerWidth', 8).attr('markerHeight', 6).attr('orient', 'auto');

  var path = marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').style('stroke-width', 1).style('stroke-dasharray', '1,0');
  _util2.default.applyStyle(path, edge[type + 'Style']);
  if (edge[type + 'Class']) {
    path.attr('class', edge[type + 'Class']);
  }
}

function vee(parent, id, edge, type) {
  var marker = parent.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5).attr('markerUnits', 'strokeWidth').attr('markerWidth', 8).attr('markerHeight', 6).attr('orient', 'auto');

  var path = marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 L 4 5 z').style('stroke-width', 1).style('stroke-dasharray', '1,0');
  _util2.default.applyStyle(path, edge[type + 'Style']);
  if (edge[type + 'Class']) {
    path.attr('class', edge[type + 'Class']);
  }
}

function undirected(parent, id, edge, type) {
  var marker = parent.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5).attr('markerUnits', 'strokeWidth').attr('markerWidth', 8).attr('markerHeight', 6).attr('orient', 'auto');

  var path = marker.append('path').attr('d', 'M 0 5 L 10 5').style('stroke-width', 1).style('stroke-dasharray', '1,0');
  _util2.default.applyStyle(path, edge[type + 'Style']);
  if (edge[type + 'Class']) {
    path.attr('class', edge[type + 'Class']);
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "0.4.19";

/***/ })
/******/ ]);
});