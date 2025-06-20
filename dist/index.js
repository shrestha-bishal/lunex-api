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
Object.defineProperty(exports, "shouldRetry", {
  enumerable: true,
  get: function get() {
    return _retryPolicy.shouldRetry;
  }
});
var _retryPolicy = require("./policies/retryPolicy.ts");
var _RestClient = _interopRequireDefault(require("./rest/RestClient.js"));
var _RestClientOptions = _interopRequireDefault(require("./rest/RestClientOptions.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }