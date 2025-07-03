"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RestClient", {
  enumerable: true,
  get: function get() {
    return _RestClient["default"];
  }
});
Object.defineProperty(exports, "RestClientOptions", {
  enumerable: true,
  get: function get() {
    return _RestClientOptions["default"];
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "shouldRetry", {
  enumerable: true,
  get: function get() {
    return _retryPolicy.shouldRetry;
  }
});
var _RestClient = _interopRequireDefault(require("./rest/RestClient.cjs"));
var _retryPolicy = require("./policies/retry-policy.cjs");
var _RestClientOptions = _interopRequireDefault(require("./rest/RestClientOptions.cjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Main entry point for the Rest Client library.
 *
 * Exports core classes for API interaction, payload handling, and utility functions.
 * 
 * @module lunex-http
 */
var _default = exports["default"] = _RestClient["default"];