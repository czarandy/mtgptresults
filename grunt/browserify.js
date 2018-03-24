"use strict";

module.exports = {
  all: {
    files: {
      "build/js/app.js": ["src/js/*.js"]
    }
  },
  options: {
    transform: [["babelify", { presets: ["es2015", "react"] }]],
    extensions: ["js"]
  }
};
