"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _retryPolicy = require("../policies/retryPolicy");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
/**
 * Configuration options for the RestClient.
 * 
 * Allows customization of request timeout, retry behavior, and logging hooks.
 */
var RestClientOptions = /*#__PURE__*/_createClass(
/**
 * Creates an instance of RestClientOptions.
 * 
 * @param {Object} [config={}] - Configuration object.
 * @param {number} [config.timeout=10000] - Request timeout in milliseconds.
 * @param {number} [config.maxRetries=0] - Maximum number of retry attempts on transient errors.
 * @param {function} [config.shouldRetry] - Function to determine if a retry should occur based on the response.
 *   Receives the response object and returns a boolean. Defaults to retry on HTTP 502, 503, and 504.
 * @param {function|null} [config.onRequestStart] - Optional hook called before a request is sent.
 *   Receives (method, url, options).
 * @param {function|null} [config.onRequestEnd] - Optional hook called after a response is received.
 *   Receives the response object.
 * @param {function|null} [config.onRequestError] - Optional hook called if a request error occurs.
 *   Receives the error object.
 */
function RestClientOptions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 10000 : _ref$timeout,
    _ref$maxRetries = _ref.maxRetries,
    maxRetries = _ref$maxRetries === void 0 ? 0 : _ref$maxRetries,
    _ref$shouldRetry = _ref.shouldRetry,
    shouldRetry = _ref$shouldRetry === void 0 ? _retryPolicy.shouldRetry : _ref$shouldRetry,
    _ref$onRequestStart = _ref.onRequestStart,
    onRequestStart = _ref$onRequestStart === void 0 ? null : _ref$onRequestStart,
    _ref$onRequestEnd = _ref.onRequestEnd,
    onRequestEnd = _ref$onRequestEnd === void 0 ? null : _ref$onRequestEnd,
    _ref$onRequestError = _ref.onRequestError,
    onRequestError = _ref$onRequestError === void 0 ? null : _ref$onRequestError;
  _classCallCheck(this, RestClientOptions);
  /** @type {number} */
  this.timeout = timeout;
  /** @type {number} */
  this.maxRetries = maxRetries;
  /** @type {function} */
  this.shouldRetry = shouldRetry;
  /** @type {function|null} */
  this.onRequestStart = onRequestStart;
  /** @type {function|null} */
  this.onRequestEnd = onRequestEnd;
  /** @type {function|null} */
  this.onRequestError = onRequestError;
});
var _default = exports["default"] = RestClientOptions;