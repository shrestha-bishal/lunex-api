"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendQueryParams = appendQueryParams;
exports.buildUrl = buildUrl;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Constructs full URL by appending route to base.
 * @param {string} baseUrl 
 * @param {string|null} routeParam 
 * @returns {string}
 */
function buildUrl(baseUrl, routeParam) {
  if (!routeParam) return baseUrl;
  if (/^https?:\/\//i.test(routeParam)) return routeParam;
  return "".concat(baseUrl, "/").concat(routeParam.replace(/^\/+/, ''));
}

/**
 * Append query parameters to a route string.
 * @param {string|null} routeParam
 * @param {Object} queryParams - Key-value pairs.
 * @returns {string} routeParam with query string
 */
function appendQueryParams() {
  var routeParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var baseRoute = routeParam || '';
  var params = new URLSearchParams();
  for (var _i = 0, _Object$entries = Object.entries(queryParams); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  }
  if (_toConsumableArray(params).length === 0) return baseRoute;

  // Append '?' or '&' depending on if baseRoute already has query params
  var separator = baseRoute.includes('?') ? '&' : '?';
  return "".concat(baseRoute).concat(separator).concat(params.toString());
}