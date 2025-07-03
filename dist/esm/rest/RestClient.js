function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
import { buildUrl, appendQueryParams } from "../utils/url-utils";
import { exponentialBackoff } from "../utils/delay-utils";
import LunexClientOptions from "./LunexClientOptions";
var _RestClient_brand = /*#__PURE__*/new WeakSet();
/**
 * RestClient provides a clean abstraction to interact with RESTful APIs using HTTP methods.
 * Supports GET, POST, PUT, DELETE, PATCH with JSON and text response handling.
 * Allows custom headers including Authorization and API keys.
 * Supports request timeout and optional retry for transient errors.
 */
export var RestClient = /*#__PURE__*/function () {
  /**
   * Creates an instance of RestClient.
   * 
   * @param baseUrl - The base URL for all API requests (e.g., "https://api.example.com").
   * @param defaultHeaders - Default HTTP headers to include with every request.
   * @param options - Configuration options for request behavior such as timeout, retries, and hooks.
   */
  function RestClient(baseUrl) {
    var _options$timeout, _options$maxRetries, _options$delayFn;
    var defaultHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new LunexClientOptions();
    _classCallCheck(this, RestClient);
    /**
     * Internal request method using fetch API with timeout and retry.
     * @private
     * @param {string} method - HTTP method.
     * @param {string|null} routeParam - Endpoint path or full URL with query.
     * @param {Object|null} data - Optional JSON body data.
     * @param {Object} headers - Additional per-request headers.
     * @param {number} [retryCount=0] - Current retry attempt.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    _classPrivateMethodInitSpec(this, _RestClient_brand);
    if (!baseUrl || typeof baseUrl !== "string") {
      throw new TypeError("Base URL must be a non-empty string");
    }
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.defaultHeaders = _objectSpread({
      "Content-Type": "application/json"
    }, defaultHeaders);
    this.timeout = (_options$timeout = _options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : 10000;
    this.maxRetries = (_options$maxRetries = _options.maxRetries) !== null && _options$maxRetries !== void 0 ? _options$maxRetries : 0;
    this.shouldRetry = _options.shouldRetry || function (res) {
      return [502, 503, 504].includes(res.status);
    };
    this.delayFn = (_options$delayFn = _options.delayFn) !== null && _options$delayFn !== void 0 ? _options$delayFn : function (ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    };

    // Logging hooks
    this.onRequestStart = _options.onRequestStart;
    this.onRequestEnd = _options.onRequestEnd;
    this.onRequestError = _options.onRequestError;
  }

  /**
   * Update default headers (e.g., to set Authorization or API key).
   * @param headers - Headers to merge with existing defaults.
   */
  return _createClass(RestClient, [{
    key: "setHeaders",
    value: function setHeaders(headers) {
      this.defaultHeaders = _objectSpread(_objectSpread({}, this.defaultHeaders), headers);
    }

    /**
     * Send a GET request.
     * @param routeParam - Optional route to append to the base URL.
     * @param {Object} [queryParams={}] - Optional query parameters as key-value pairs.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
  }, {
    key: "getAsync",
    value: (function () {
      var _getAsync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var routeParam,
          queryParams,
          headers,
          controller,
          urlWithQuery,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              routeParam = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
              queryParams = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              headers = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              controller = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
              urlWithQuery = appendQueryParams(routeParam, queryParams);
              _context.n = 1;
              return _assertClassBrand(_RestClient_brand, this, _request).call(this, "GET", urlWithQuery, null, headers, 0, controller);
            case 1:
              return _context.a(2, _context.v);
          }
        }, _callee, this);
      }));
      function getAsync() {
        return _getAsync.apply(this, arguments);
      }
      return getAsync;
    }()
    /**
     * Send a POST request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    )
  }, {
    key: "postAsync",
    value: (function () {
      var _postAsync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var routeParam,
          data,
          headers,
          controller,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              routeParam = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;
              data = _args2.length > 1 ? _args2[1] : undefined;
              headers = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              controller = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : null;
              return _context2.a(2, _assertClassBrand(_RestClient_brand, this, _request).call(this, "POST", routeParam, data, headers, 0, controller));
          }
        }, _callee2, this);
      }));
      function postAsync() {
        return _postAsync.apply(this, arguments);
      }
      return postAsync;
    }()
    /**
     * Send a PUT request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    )
  }, {
    key: "putAsync",
    value: (function () {
      var _putAsync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var routeParam,
          data,
          headers,
          controller,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              routeParam = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
              data = _args3.length > 1 ? _args3[1] : undefined;
              headers = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              controller = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : null;
              return _context3.a(2, _assertClassBrand(_RestClient_brand, this, _request).call(this, "PUT", routeParam, data, headers, 0, controller));
          }
        }, _callee3, this);
      }));
      function putAsync() {
        return _putAsync.apply(this, arguments);
      }
      return putAsync;
    }()
    /**
     * Send a PATCH request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    )
  }, {
    key: "patchAsync",
    value: (function () {
      var _patchAsync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var routeParam,
          data,
          headers,
          controller,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              routeParam = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
              data = _args4.length > 1 ? _args4[1] : undefined;
              headers = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              controller = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : null;
              return _context4.a(2, _assertClassBrand(_RestClient_brand, this, _request).call(this, "PATCH", routeParam, data, headers, 0, controller));
          }
        }, _callee4, this);
      }));
      function patchAsync() {
        return _patchAsync.apply(this, arguments);
      }
      return patchAsync;
    }()
    /**
     * Send a DELETE request.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    )
  }, {
    key: "deleteAsync",
    value: (function () {
      var _deleteAsync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var routeParam,
          headers,
          controller,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              routeParam = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
              headers = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              controller = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : null;
              return _context5.a(2, _assertClassBrand(_RestClient_brand, this, _request).call(this, "DELETE", routeParam, null, headers, 0, controller));
          }
        }, _callee5, this);
      }));
      function deleteAsync() {
        return _deleteAsync.apply(this, arguments);
      }
      return deleteAsync;
    }())
  }]);
}();
function _request(_x, _x2, _x3, _x4) {
  return _request2.apply(this, arguments);
}
function _request2() {
  _request2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(method, routeParam, data, headers) {
    var _this$onRequestStart;
    var retryCount,
      externalController,
      url,
      combinedHeaders,
      contentTypeKey,
      contentType,
      options,
      controller,
      timeoutId,
      _this$onRequestEnd,
      _response,
      waitTime,
      errorText,
      responseContentType,
      errorBody,
      _error,
      _contentType,
      _this$onRequestError,
      _args6 = arguments,
      _t,
      _t2,
      _t3;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          retryCount = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : 0;
          externalController = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : null;
          url = buildUrl(this.baseUrl, routeParam);
          combinedHeaders = _objectSpread(_objectSpread({}, this.defaultHeaders), headers); // Allow overriding Content-Type (default is application/json)
          contentTypeKey = Object.keys(combinedHeaders).find(function (key) {
            return key.toLowerCase() === "content-type";
          });
          contentType = contentTypeKey ? combinedHeaders[contentTypeKey] : "application/json";
          options = {
            method: method,
            headers: combinedHeaders
          }; // Handle request body
          if (data !== null && method !== "GET" && method !== "HEAD") {
            if (contentType.includes("application/json")) {
              options.body = JSON.stringify(data);
            } else if (data instanceof FormData || data instanceof URLSearchParams) {
              options.body = data;
              delete combinedHeaders["Content-Type"];
            } else {
              options.body = data;
            }
          }

          // Setup timeout with AbortController
          controller = externalController || new AbortController();
          timeoutId = setTimeout(function () {
            return controller.abort();
          }, this.timeout);
          options.signal = controller.signal;
          (_this$onRequestStart = this.onRequestStart) === null || _this$onRequestStart === void 0 || _this$onRequestStart.call(this, method, url, options);
          _context6.p = 1;
          _context6.n = 2;
          return fetch(url, options);
        case 2:
          _response = _context6.v;
          // Call onRequestEnd hook after response received
          (_this$onRequestEnd = this.onRequestEnd) === null || _this$onRequestEnd === void 0 || _this$onRequestEnd.call(this, _response);
          if (_response.ok) {
            _context6.n = 9;
            break;
          }
          if (!(this.maxRetries > 0 && retryCount < this.maxRetries && this.shouldRetry(_response))) {
            _context6.n = 4;
            break;
          }
          waitTime = exponentialBackoff(retryCount);
          _context6.n = 3;
          return this.delayFn(waitTime);
        case 3:
          return _context6.a(2, _assertClassBrand(_RestClient_brand, this, _request).call(this, method, routeParam, data, headers, retryCount + 1, externalController));
        case 4:
          errorText = "HTTP ".concat(_response.status, " - ").concat(_response.statusText);
          responseContentType = (_response.headers.get("content-type") || "").toLowerCase();
          if (!responseContentType.includes("application/json")) {
            _context6.n = 6;
            break;
          }
          _context6.n = 5;
          return _response.json();
        case 5:
          _t = _context6.v;
          _context6.n = 8;
          break;
        case 6:
          _context6.n = 7;
          return _response.text();
        case 7:
          _t = _context6.v;
        case 8:
          errorBody = _t;
          _error = new Error(errorText);
          _error.status = _response.status;
          _error.details = errorBody;
          throw _error;
        case 9:
          if (!(_response.status === 204)) {
            _context6.n = 10;
            break;
          }
          return _context6.a(2, null);
        case 10:
          _contentType = (_response.headers.get("content-type") || "").toLowerCase();
          if (!_contentType.includes("application/json")) {
            _context6.n = 12;
            break;
          }
          _context6.n = 11;
          return _response.json();
        case 11:
          _t2 = _context6.v;
          _context6.n = 14;
          break;
        case 12:
          _context6.n = 13;
          return _response.text();
        case 13:
          _t2 = _context6.v;
        case 14:
          return _context6.a(2, _t2);
        case 15:
          _context6.p = 15;
          _t3 = _context6.v;
          (_this$onRequestError = this.onRequestError) === null || _this$onRequestError === void 0 || _this$onRequestError.call(this, _t3);
          if (!(_t3 instanceof Error && _t3.name === "AbortError")) {
            _context6.n = 16;
            break;
          }
          throw new Error("Request to ".concat(url, " timed out after ").concat(this.timeout, " ms"));
        case 16:
          if (!(_t3 instanceof TypeError && _t3.message.includes("fetch"))) {
            _context6.n = 17;
            break;
          }
          throw new Error("Network error while connecting to ".concat(url));
        case 17:
          throw _t3;
        case 18:
          _context6.p = 18;
          clearTimeout(timeoutId);
          return _context6.f(18);
        case 19:
          return _context6.a(2);
      }
    }, _callee6, this, [[1, 15, 18, 19]]);
  }));
  return _request2.apply(this, arguments);
}
export default RestClient;