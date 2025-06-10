// tests/setupTests.js
require('@testing-library/jest-dom');

// Add polyfills for JSDOM
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
