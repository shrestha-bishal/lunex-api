function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
import { shouldRetry as defaultShouldRetry } from "../policies/retryPolicy";
/**
 * Configuration options for the RestClient.
 * 
 * Enables customization of:
 * - Request timeout duration (in milliseconds).
 * - Number of retry attempts on transient errors.
 * - Retry decision logic based on the response.
 * - Lifecycle hooks to tap into request start, completion, and error events.
 */
var RestClientOptions = /*#__PURE__*/_createClass(/** Request timeout in milliseconds before aborting. Default: 10000 (10 seconds) */

/** Maximum retry attempts on transient errors (like HTTP 502, 503, 504). Default: 0 (no retries) */

/**
 * Function that decides if a retry should happen based on the HTTP response.
 * Defaults to retry on status 502, 503, and 504.
 */

/**
 * Optional callback triggered before a request is sent.
 * Receives HTTP method, request URL, and request options.
 */

/**
 * Optional callback triggered after a response is received.
 * Receives the response object.
 */

/**
 * Optional callback triggered if a request error occurs.
 * Receives the error object.
 */

/**
     * Creates an instance of RestClientOptions.
     * 
     * @param {Object} [config={}] Configuration options.
     * @param {number} [config.timeout=10000] Timeout in milliseconds.
     * @param {number} [config.maxRetries=0] Number of retries on transient errors.
     * @param {ShouldRetryFn} [config.shouldRetry] Retry decision function.
     * @param {OnRequestStartFn|null} [config.onRequestStart] Hook before request start.
     * @param {OnRequestEndFn|null} [config.onRequestEnd] Hook after request end.
     * @param {OnRequestErrorFn|null} [config.onRequestError] Hook on request error.
     */
function RestClientOptions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 10000 : _ref$timeout,
    _ref$maxRetries = _ref.maxRetries,
    maxRetries = _ref$maxRetries === void 0 ? 0 : _ref$maxRetries,
    _ref$shouldRetry = _ref.shouldRetry,
    shouldRetry = _ref$shouldRetry === void 0 ? defaultShouldRetry : _ref$shouldRetry,
    _ref$onRequestStart = _ref.onRequestStart,
    onRequestStart = _ref$onRequestStart === void 0 ? null : _ref$onRequestStart,
    _ref$onRequestEnd = _ref.onRequestEnd,
    onRequestEnd = _ref$onRequestEnd === void 0 ? null : _ref$onRequestEnd,
    _ref$onRequestError = _ref.onRequestError,
    onRequestError = _ref$onRequestError === void 0 ? null : _ref$onRequestError;
  _classCallCheck(this, RestClientOptions);
  this.timeout = timeout;
  this.maxRetries = maxRetries;
  this.shouldRetry = shouldRetry;
  this.onRequestStart = onRequestStart;
  this.onRequestEnd = onRequestEnd;
  this.onRequestError = onRequestError;
});
export default RestClientOptions;